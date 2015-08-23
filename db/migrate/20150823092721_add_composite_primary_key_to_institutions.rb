class AddCompositePrimaryKeyToInstitutions < ActiveRecord::Migration
  def change
  	add_index :institutions, ["id", "name", "country"], :unique => true
  end
end
