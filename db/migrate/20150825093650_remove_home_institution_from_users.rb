class RemoveHomeInstitutionFromUsers < ActiveRecord::Migration
  def up
    remove_column :users, :home_institution, :string
  end

  def down
    add_column :users, :home_institution, :string
  end
end
