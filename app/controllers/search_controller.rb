class SearchController < ApplicationController

  def search
    @instn_results = []
    @instn_results += Institution.where("name LIKE ?", "%#{params[:q]}%")
    @instn_results += Institution.where("state LIKE ?", "%#{params[:q]}%")
    @instn_results += Institution.where("country LIKE ?", "%#{params[:q]}%")
    if @instn_results.count == 1
      redirect_to institution_path(@instn_results.first)
    else
      respond_to do |format|
        format.html
      end
    end
  end

end
