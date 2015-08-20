class CallbacksController < Devise::OmniauthCallbacksController

  def facebook
    @user = User.from_omniauth(request.env['omniauth.auth'])
    sign_in @user
    redirect_to user_path(@user.username)
  end

end
