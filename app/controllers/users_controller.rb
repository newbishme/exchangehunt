class UsersController < ApplicationController
  before_action :set_user, only: :show

  def show
    raise ActionController::RoutingError.new('Not Found') if @user.nil?

    respond_to do |format|
      format.html
    end
  end

  private

  def set_user
    @user = User.find_by_username(params[:id])
  end

end
