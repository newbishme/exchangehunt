class AddCourseAndBioAndCitizenshipToUsers < ActiveRecord::Migration
  def change
    add_column :users, :course, :string
    add_column :users, :bio, :string
    add_column :users, :citizenship, :string
  end
end
