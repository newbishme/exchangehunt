class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  private

  def ensure_complete_registration
    if user_signed_in? && current_user.username.nil? && request[:controller] != "pages"
      redirect_to "/welcome/index"
    end
  end

end
