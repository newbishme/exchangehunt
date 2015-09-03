class AddFacebookOAuthTokenAndOAuthExpiresAtToUsers < ActiveRecord::Migration
  def change
    add_column :users, :oauth_token, :string
    add_column :users, :oauth_expires_at, :date
  end
end
