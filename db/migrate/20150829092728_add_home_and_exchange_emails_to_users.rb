class AddHomeAndExchangeEmailsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :home_email, :string
    add_column :users, :exchange_email, :string
  end
end
