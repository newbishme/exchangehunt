class CallbacksController < Devise::OmniauthCallbacksController

  def facebook
    @user = User.from_omniauth(request.env['omniauth.auth'])
    if @user
      sign_in @user
      @user.save!
      redirect_to (@user.username.nil? ? welcome_index_path : root_path)
    else
      flash[:error] = "Sorry, we failed to obtain authorization from Facebook. Please fill up the support form below and we'll look into this for you."
      redirect_to support_path
    end

  end

end
