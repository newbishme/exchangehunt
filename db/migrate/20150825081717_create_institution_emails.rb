class CreateInstitutionEmails < ActiveRecord::Migration
  def change
    create_table :institution_emails do |t|
    	t.references :institution, index: true, foreign_key: true
    	t.string :instn_domain, :null => false

    	t.timestamps null: false
   	end
  end
end
