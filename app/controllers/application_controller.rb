class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def heartbeat
    render :ok, json: "ok".html_safe
  end

  rescue_from ActiveRecord::RecordNotFound do
    flash[:warning] = 'Resource not found.'
    redirect_back_or root_path
  end

  def redirect_back_or(path)
    redirect_to request.referer || path
  end

  private

  def authorized?(user)
    user_signed_in? && (current_user == user || current_user.admin?)
  end

  def raise_404
    raise ActionController::RoutingError.new('Not Found')
  end

  def raise_400(reason)
    render :status => 400, :json => { reason: reason.to_s }.to_json.html_safe
  end

  def ensure_complete_registration
    if user_signed_in? && current_user.username.nil? && request[:controller] != "pages"
      redirect_to "/welcome/index"
    end
  end

end
