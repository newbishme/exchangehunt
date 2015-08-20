class Department < ActiveRecord::Base
  belongs_to :user, :class_name => 'User', :foreign_key => 'admin_id'
  belongs_to :institution
  belongs_to :exchange

  validates_presence_of :name

  def admin_id
    self.user_id
  end
end
