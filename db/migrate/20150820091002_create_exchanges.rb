class CreateExchanges < ActiveRecord::Migration
  def change
    create_table :exchanges do |t|
      t.integer :user_id
      t.integer :department_id
      t.date :start_date
      t.date :end_date

      t.timestamps null: false
    end
  end
end
