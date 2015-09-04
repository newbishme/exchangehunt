class InstitutionsController < ApplicationController

  before_action :set_institution, :only => [:show]
  before_action :authenticate_user!, :only => [:mapping]

  def mapping
    instn_email = InstitutionEmail.where("lower(instn_domain) = ?", request.params["domain"].downcase).first
    if instn_email
      instn = Institution.find(instn_email.institution_id)
      render :ok, json: instn.to_json.html_safe
    else
      render json: "not_found".to_json.html_safe, status: 404
    end
  end

  def recently_joined
    id = params[:id]
    user_ids = UsrInstnConnect.where("institution_id = #{id}").map { |x| x.user_id }
    users = user_ids
      .map { |id| User.find(id) }
      .compact
      .sort_by(&:created_at)
      .reverse.take(5)
    respond_to do |format|
      format.json { render json: users.to_json.html_safe}
    end
  end

  def home_users
    id = params[:id]
    user_ids = UsrInstnConnect.where("institution_id = #{id}").where("is_home_institution").map { |x| x.user_id }
    users = user_ids.map { |id| User.find(id) }.compact.sort_by(&:created_at).reverse
    users.map! do |user|
      restricted_info = restrict_user_info(user)
    end
    respond_to do |format|
      format.json { render json: users.to_json.html_safe }
    end
  end

  def exchange_users
    id = params[:id]
    user_ids = UsrInstnConnect.where("institution_id = #{id}").where("is_home_institution = false").map { |x| x.user_id }
    users = user_ids.map { |id| User.find(id) }.compact.sort_by(&:created_at).reverse
    users.map! do |user|
      restricted_info = restrict_user_info(user)
    end
    respond_to do |format|
      format.json { render json: users.to_json.html_safe }
    end
  end

  def user_institution_connections
    institution_id = params[:id]
    user_id = params[:userid]
    is_connected = !UsrInstnConnect.where("institution_id = #{institution_id} AND user_id = #{user_id}").blank?
    respond_to do |format|
      format.json { render json: is_connected.to_json.html_safe }
    end
  end

  def show
    @og_description = "ExchangeHunt | #{@institution.name}"
    @title = @institution.name
    @img_url = @institution.facebook_img_url unless @institution.facebook_img_url.to_s.blank?
    respond_to do |format|
      format.html
      format.json { render json: @institution.to_json.html_safe }
    end
  end

  private

  def set_institution
    @institution = Institution.find(params[:id])
  end

  def restrict_user_info(user_hash)
    restricted_hash = {}
    restricted_hash[:id] = user_hash[:id]
    restricted_hash[:first_name] = user_hash[:first_name]
    restricted_hash[:last_name] = user_hash[:last_name]
    restricted_hash[:username] = user_hash[:username]
    restricted_hash[:image_url] = user_hash[:image_url]
    restricted_hash[:home_institution_confirmed] = user_hash[:home_institution_confirmed]
    restricted_hash[:exchange_institution_confirmed] = user_hash[:exchange_institution_confirmed]
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

end
