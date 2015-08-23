class SetNameCountryStateLanguageNotNull < ActiveRecord::Migration
  def change
  	change_column :institutions, :name, :string, :null => false
  	change_column :institutions, :country, :string, :null => false
  	change_column :institutions, :state, :string, :null => false
  	change_column :institutions, :language, :string, :null => false
  end
end
