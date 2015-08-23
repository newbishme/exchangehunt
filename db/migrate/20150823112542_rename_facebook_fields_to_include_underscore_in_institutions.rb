class RenameFacebookFieldsToIncludeUnderscoreInInstitutions < ActiveRecord::Migration
  def self.up
  	rename_column :institutions, :facebookpid, :facebook_pid
  	rename_column :institutions, :facebookimgurl, :facebook_img_url
  end

  def self.down
  end
end
