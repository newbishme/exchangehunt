class RemoveExchangeInstitutionFromUsers < ActiveRecord::Migration
  def up
    remove_column :users, :exchange_institution, :string
  end

  def down
    add_column :users, :exchange_institution, :string
  end
end
