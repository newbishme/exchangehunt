class InstitutionEmail < ActiveRecord::Base
	belongs_to :institution

  def self.valid_domain? email
    return false if email.nil?
    domain = Mail::Address.new(email).domain
    !InstitutionEmail.find_by_instn_domain(domain).nil?
  end
end
