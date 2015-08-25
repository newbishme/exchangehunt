class InstitutionsController < ApplicationController

  before_action :set_institution, :only => [:show]

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
