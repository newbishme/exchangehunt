class Institution < ActiveRecord::Base
  has_many :institution_emails
  has_many :usr_instn_connects
end
