class CallbacksController < Devise::OmniauthCallbacksController

  def facebook
    @user = User.from_omniauth(request.env['omniauth.auth'])
    sign_in @user
    redirect_to (@user.username.nil? ? welcome_index_path : root_path)
  end

end
