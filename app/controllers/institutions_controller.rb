class InstitutionsController < ApplicationController

  before_action :set_institution, :only => [:show]
  before_action :authenticate_user!, :only => [:mapping]

  def mapping
    instn_email = InstitutionEmail.find_by_instn_domain request.params["domain"]
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
    users = user_ids.map { |id| User.find(id) }.compact.sort_by(&:created_at).reverse.take(5)
    respond_to do |format|
      format.json { render json: users.to_json.html_safe}
    end
  end

  def show
    respond_to do |format|
      format.html
      format.json { render json: @institution.to_json.html_safe }
    end
  end

  private

  def set_institution
    @institution = Institution.find(params[:id])
  end

end
