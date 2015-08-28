class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def heartbeat
    render :ok, json: "ok".html_safe
  end

  private

  def authorized?(user)
    user_signed_in? && (current_user == user || current_user.admin?)
  end

  def raise_404
    raise ActionController::RoutingError.new('Not Found')
  end

  def ensure_complete_registration
    if user_signed_in? && current_user.username.nil? && request[:controller] != "pages"
      redirect_to "/welcome/index"
    end
  end

end
