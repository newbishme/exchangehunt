class CallbacksController < Devise::OmniauthCallbacksController

  def facebook
    @user = User.from_omniauth(request.env['omniauth.auth'])
    p request.env['omniauth.auth']['credentials']
    sign_in @user
    @user.save!
    redirect_to (@user.username.nil? ? welcome_index_path : root_path)
  end

end
