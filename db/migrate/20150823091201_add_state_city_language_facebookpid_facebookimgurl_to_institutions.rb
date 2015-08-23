class AddStateCityLanguageFacebookpidFacebookimgurlToInstitutions < ActiveRecord::Migration
  def change
    add_column :institutions, :state, :string
    add_index :institutions, :state
    add_column :institutions, :city, :string
    add_index :institutions, :city
    add_column :institutions, :language, :string
    add_column :institutions, :facebookpid, :string
    add_column :institutions, :facebookimgurl, :string
  end
end
