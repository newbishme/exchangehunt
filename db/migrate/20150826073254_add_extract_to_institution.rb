class AddExtractToInstitution < ActiveRecord::Migration
  def change
    add_column :institutions, :extract, :string
  end
end
