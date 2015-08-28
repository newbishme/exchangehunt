class CreateUsrInstnConnects < ActiveRecord::Migration
  def change
    create_table :usr_instn_connects do |t|
      t.references :user, index: true, foreign_key: true
      t.references :institution, index: true, foreign_key: true
      t.date :start_date
      t.date :end_date
      t.boolean :is_home_institution, :null => false

      t.timestamps null: false
    end
  end
end

