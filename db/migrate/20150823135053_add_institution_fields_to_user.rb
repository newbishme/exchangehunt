class AddInstitutionFieldsToUser < ActiveRecord::Migration
  def change
    add_column :users, :home_institution, :string
    add_column :users, :exchange_institution, :string
  end
end
