class RemoveCityFromInstitutions < ActiveRecord::Migration
  def change
  	remove_column :institutions, :city
  end
end
