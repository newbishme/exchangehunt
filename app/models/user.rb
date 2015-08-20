class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable, :omniauth_providers => [:facebook]

  before_save do
    self.email = email.downcase if self.email
  end

  has_one :department
  has_many :exchanges

  validates_presence_of :uid
  validates_uniqueness_of :username, :uid, :email, :case_sensitive => false

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.email = auth.info.email || ""
      user.first_name = auth.info.first_name
      user.last_name = auth.info.last_name
      user.password = Devise.friendly_token[0, 20]
      user.image_url = auth.info.image
      user.gender = auth.extra.raw_info.gender
      user.admin = false
    end
  end

  def full_name
    "#{self.first_name} #{self.last_name}"
  end

end
