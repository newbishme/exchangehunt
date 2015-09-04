class UsersController < ApplicationController
  before_action :authenticate_user!, only: [:update, :edit, :show, :resend_confirmation]
  before_action :ensure_complete_registration, only: [:show]

  before_action :set_user_by_username, only: [:show, :username, :edit]
  before_action :set_user_by_id, only: :update

  skip_before_filter :verify_authenticity_token, only: [:confirm, :deauthorize]

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

    if params[:usr_instn_connect_exchange]
      user_exchange_info = params[:usr_instn_connect_exchange]

      if user_exchange_info[:exchange_email] != ""

        user_id = user_exchange_info[:user_id]
        domain = Mail::Address.new(user_exchange_info[:exchange_email]).domain
        exchange_instn_id = InstitutionEmail.find_by_instn_domain(domain).institution_id

        connect = UsrInstnConnect.where(user_id: user_id, is_home_institution: false).first_or_create do |c|
          c.user_id = user_id.to_i
          c.institution_id = exchange_instn_id.to_i
          c.is_home_institution = false
        end

        connect.start_month = user_exchange_info[:start_month].to_i
        connect.start_year = user_exchange_info[:start_year].to_i
        connect.duration_in_months = user_exchange_info[:duration_in_months].to_i
        connect.save!

      end
    end
  end

  def confirm
    token = params[:t]
    if user = User.find_by_home_institution_confirmation_token(token)
      user.confirm_home_email!
      @oauth_token = user.oauth_token
      @instn = user.home_institution.name
      respond_to do |format|
        format.html
      end
    elsif user = User.find_by_exchange_institution_confirmation_token(token)
      user.confirm_exchange_email!
      @oauth_token = user.oauth_token
      @instn = user.exchange_institution.name
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

  def deauthorize
    if request["signed_request"]
      signed_request = request["signed_request"]
      @oauth = Koala::Facebook::OAuth.new(ENV["FACEBOOK_APP_ID"], ENV["FACEBOOK_APP_SECRET"]) # example secret is 'secret', app ID doesn't matter
      parsed = @oauth.parse_signed_request(signed_request)
      p signed_request
      p @oauth
      p parsed
    end

    render :nothing => true
  end

  private

  def set_user_by_username
    @user = User.where('lower(username) = ?', params[:id].downcase).first
    raise_404 unless @user
  end

  def set_user_by_id
    @user = User.find(params[:id])
    raise_404 unless @user
  end

  def user_params
    params.require(:user).permit(:username,
                                  :home_email,
                                  :exchange_email,
                                  :bio,
                                  :citizenship,
                                  :course,
                                  :start_month,
                                  :start_year,
                                  :duration_in_months)
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
    restrictedExchangeRecord = getExchangeDuration(user_hash[:id])
    restricted_hash[:start_month] = restrictedExchangeRecord[:start_month]
    restricted_hash[:start_year] = restrictedExchangeRecord[:start_year]
    restricted_hash[:duration_in_months] = restrictedExchangeRecord[:duration_in_months]
    restricted_hash
  end

  def getExchangeDuration(user_id)
    restrictedExchangeRecord = {}
    userExchangeRecord = UsrInstnConnect.where(user_id: user_id, is_home_institution: false).first_or_initialize
    restrictedExchangeRecord[:start_month] = userExchangeRecord[:start_month]
    restrictedExchangeRecord[:start_year] = userExchangeRecord[:start_year]
    restrictedExchangeRecord[:duration_in_months] = userExchangeRecord[:duration_in_months]
    restrictedExchangeRecord
  end

  def verify_uninstall_signature
    signature = ''
    keys = params.keys.sort
    keys.each do |key|
      next if key == 'fb_sig'
      next unless key.include?('fb_sig')
      key_name = key.gsub('fb_sig_', '')
      signature += key_name
      signature += '='
      signature += params[key]
    end

    signature += ENV['FACEBOOK_APP_SECRET']
    calculated_sig = Digest::MD5.hexdigest(signature)

    if calculated_sig != params[:fb_sig]
      #check to see if ip variables are nil
      if not request.env['HTTP_X_FORWARDED_FOR'].nil? and not request.env['HTTP_X_REAL_IP'].nil?
        ip = request.env['HTTP_X_FORWARDED_FOR'] || request.env['HTTP_X_REAL_IP']
      else
        ip = request.remote_ip
      end

      logger.info "\nRemote IP :: #{ip}"
      return false
    else
      #logger.warn "\n\nSUCCESS!! Signatures matched.\n"
    end
    return true
  end

end
