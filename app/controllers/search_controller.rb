class SearchController < ApplicationController

  def search
    @instn_results = []
    @instn_results += Institution.where("name ILIKE ?", "%#{params[:q]}%")
    @instn_results += Institution.where("state ILIKE ?", "%#{params[:q]}%")
    @instn_results += Institution.where("country ILIKE ?", "%#{params[:q]}%")
    @instn_results = @instn_results.uniq.take(30)
    if @instn_results.count == 1
      redirect_to institution_path(@instn_results.first)
    else
      respond_to do |format|
        format.html
      end
    end
  end

end
