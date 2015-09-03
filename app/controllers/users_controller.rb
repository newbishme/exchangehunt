class UsersController < ApplicationController
  before_action :authenticate_user!, only: [:update, :edit, :show, :resend_confirmation]
  before_action :ensure_complete_registration, only: [:show]

  before_action :set_user_by_username, only: [:show, :username, :edit]
  before_action :set_user_by_id, only: :update

  skip_before_filter :verify_authenticity_token, only: [:confirm]

  # check existence for username
  def username
    respond_to do |format|
      format.json { render :ok, json: @user.username.to_json }
    end
  end

  def show
    respond_to do |format|
      format.html
      format.json { render json: restrict_user_info(@user).to_json.html_safe }
    end
  end

  def update
    raise_400 and return unless authorized?(@user)

    if (!user_params[:home_email].to_s.blank? &&
        !InstitutionEmail.valid_domain?(user_params[:home_email])) ||
       (!user_params[:exchange_email].to_s.blank? &&
        !InstitutionEmail.valid_domain?(user_params[:exchange_email]))
      raise_400("Sorry, your institution is not one of the participating institutions.") and return
    end

    if @user.update_attributes(user_params)
      render status: 200, json: @user.username.to_json.html_safe
    end
  end

  def confirm
    token = params[:t]
    if user = User.find_by_home_institution_confirmation_token(token)
      user.confirm_home_email!
      respond_to do |format|
        format.html
      end
    elsif user = User.find_by_exchange_institution_confirmation_token(token)
      user.confirm_exchange_email!
      respond_to do |format|
        format.html
      end
    else
      raise_404
    end
  end

  def edit
  end

  def resend_confirmation
    @user = current_user
    case params["type"]
    when "home" then @user.resend_home_confirmation_mail
    when "exchange" then @user.resend_exchange_confirmation_mail
    end
    redirect_to edit_user_path(@user.username)
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
    params.require(:user).permit(:username, :home_email, :exchange_email, :bio, :citizenship, :course)
  end

  def restrict_user_info(user_hash)
    restricted_hash = {}
    restricted_hash[:id] = user_hash[:id]
    restricted_hash[:first_name] = user_hash[:first_name]
    restricted_hash[:last_name] = user_hash[:last_name]
    restricted_hash[:image_url] = user_hash[:image_url]
    restricted_hash[:home_email] = user_hash[:home_email]
    restricted_hash[:exchange_email] = user_hash[:exchange_email]
    restricted_hash[:home_institution] = user_hash.home_institution || Institution.new
    restricted_hash[:home_institution_confirmed] = user_hash[:home_institution_confirmed]
    restricted_hash[:exchange_institution] = user_hash.exchange_institution || Institution.new
    restricted_hash[:exchange_institution_confirmed] = user_hash[:exchange_institution_confirmed]
    restricted_hash[:citizenship] = user_hash[:citizenship]
    restricted_hash[:bio] = user_hash[:bio]
    restricted_hash[:course] = user_hash[:course]
    restricted_hash
  end

end
