class SetFacebookpidFacebookimgurlNullable < ActiveRecord::Migration
  def change
  	change_column :institutions, :facebookpid, :string, :null => true
  	change_column :institutions, :facebookimgurl, :string, :null => true
  end
end
