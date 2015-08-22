class UsersController < ApplicationController
  before_action :set_user_by_username, only: :show
  before_action :set_user_by_id, only: :update
  before_action :authenticate_user!, only: [:update]

  def show
    respond_to do |format|
      format.html
    end
  end

  def update
    if @user.update_attributes(user_params)
      render status: 200, json: @user.username.to_json
    end
  end

  private

  def set_user_by_username
    @user = User.find_by_username(params[:id])
    raise ActionController::RoutingError.new('Not Found') if @user.nil?
  end

  def set_user_by_id
    @user = User.find(params[:id])
    raise ActionController::RoutingError.new('Not Found') if @user.nil?
  end

  def user_params
    params.require(:user).permit(:username)
  end

end
