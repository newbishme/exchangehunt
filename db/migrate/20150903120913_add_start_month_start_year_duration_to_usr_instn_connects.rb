class AddStartMonthStartYearDurationToUsrInstnConnects < ActiveRecord::Migration
  def change
    add_column :usr_instn_connects, :start_month, :integer
    add_column :usr_instn_connects, :start_year, :integer
    add_column :usr_instn_connects, :duration_in_months, :integer
  end
end
