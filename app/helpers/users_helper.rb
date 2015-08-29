module UsersHelper
  def is_users_profile?
    @user == current_user
  end
end
