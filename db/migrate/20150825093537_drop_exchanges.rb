class DropExchanges < ActiveRecord::Migration
  def change
  	drop_table :exchanges
  end
end
