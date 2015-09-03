class RemoveStartDateEndDateFromUsrInstnConnects < ActiveRecord::Migration
  def change
    remove_column :usr_instn_connects, :start_date
    remove_column :usr_instn_connects, :end_date
  end
end
