class UsersController < ApplicationController
  before_action :authenticate_user!, only: [:update]
  before_action :ensure_complete_registration, only: [:show]

  before_action :set_user_by_username, only: [:show, :username]
  before_action :set_user_by_id, only: :update

  # check existence for username
  def username
    respond_to do |format|
      format.json { render :ok, json: @user.username.to_json }
    end
  end

  def show
    respond_to do |format|
      format.html
    end
  end

  def update
    raise_404 unless authorized? @user
    if @user.update_attributes(user_params)
      render status: 200, json: @user.username.to_json
    end
  end

  private

  def set_user_by_username
    @user = User.find_by_username(params[:id].downcase)
    raise_404 unless @user
  end

  def set_user_by_id
    @user = User.find(params[:id])
    raise_404 unless @user
  end

  def user_params
    params.require(:user).permit(:username, :home_institution, :exchange_institution)
  end

end
