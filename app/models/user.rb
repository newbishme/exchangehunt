class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable, :omniauth_providers => [:facebook]

  before_update :send_confirmation_email_if_emails_changed?, :downcase_email

  has_one :department
  has_many :exchanges
  has_many :usr_instn_connects

  validates_presence_of :uid
  validates_uniqueness_of :uid, :email, :case_sensitive => false
  validates_uniqueness_of :username, :case_sensitive => false, :allow_nil => true
  validates_format_of :username, :with => /\A\w+$\z/, :allow_blank => true

  acts_as_messageable

  def mailboxer_email(object)
    email
  end

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.email = auth.info.email || ""
      user.first_name = auth.info.first_name
      user.last_name = auth.info.last_name
      user.password = Devise.friendly_token[0, 30]
      user.image_url = auth.info.image
      user.gender = auth.extra.raw_info.gender
      user.admin = false
      user.home_institution_confirmed = false
      user.exchange_institution_confirmed = false
    end
  end

  def full_name
    "#{self.first_name} #{self.last_name}"
  end

  def home_institution
    connect = UsrInstnConnect.find_by user_id: self.id, is_home_institution: true
    Institution.find(connect.institution_id) if connect
  end

  def exchange_institution
    connect = UsrInstnConnect.find_by user_id: self.id, is_home_institution: false
    Institution.find(connect.institution_id) if connect
  end

  def completed_profile?
    self.username?
  end

  def send_confirmation_email_if_emails_changed?
    # refactor this shit
    if self.home_email_changed?
      self.home_institution_confirmation_token = Devise.friendly_token[0, 30]
      self.home_institution_confirmed = false

      domain = Mail::Address.new(self.home_email).domain
      new_instn_id = InstitutionEmail.find_by_instn_domain(domain).institution_id
      connect = UsrInstnConnect.where(user_id: self.id, is_home_institution: true).first_or_create do |c|
        c.user_id = self.id
        c.is_home_institution = true
      end
      connect.institution_id = new_instn_id
      connect.save!

      Thread.new do
        UserEmailConfirmationMailer.confirmation_email(self, :home).deliver_now
        ActiveRecord::Base.connection.close
      end
    end

    if self.exchange_email_changed?
      if self.exchange_email.blank?
        u = UsrInstnConnect.where(user_id: self.id, is_home_institution: false).first
        u.delete if u
        return
      end

      self.exchange_institution_confirmation_token = Devise.friendly_token[0, 30]
      self.exchange_institution_confirmed = false

      domain = Mail::Address.new(self.exchange_email).domain
      new_instn_id = InstitutionEmail.find_by_instn_domain(domain).institution_id
      connect = UsrInstnConnect.where(user_id: self.id, is_home_institution: false).first_or_create do |c|
        c.user_id = self.id
        c.is_home_institution = false
      end
      connect.institution_id = new_instn_id
      connect.save!

      Thread.new do
        UserEmailConfirmationMailer.confirmation_email(self, :exchange).deliver_now
        ActiveRecord::Base.connection.close
      end
    end
  end

  def confirm_home_email!
    self.home_institution_confirmed = true
    self.home_institution_confirmation_token = nil
    self.save!
  end

  def confirm_exchange_email!
    self.exchange_institution_confirmed = true
    self.exchange_institution_confirmation_token = nil
    self.save!
  end

  def downcase_email
    self.email = email.downcase if self.email
  end

end
