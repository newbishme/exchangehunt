class AddCompositeIndexKeyToUsrInstnConnects < ActiveRecord::Migration
  def change
    add_index :usr_instn_connects, ["user_id", "institution_id"], :unique => true
  end
end
