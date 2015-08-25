class AddCompositePrimaryKeyToInstitutionEmails < ActiveRecord::Migration
  def change
  	add_index :institution_emails, ["institution_id", "instn_domain"], :unique => true
  end
end
