class AddIndexToInstitutionNameInstitutionCountry < ActiveRecord::Migration
  def change
  	add_index :institutions, :name
  	add_index :institutions, :country
  end
end
