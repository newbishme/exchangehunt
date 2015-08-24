class PagesController < ApplicationController

  before_action :ensure_complete_registration

  def index
  end

  def home
  end

  def help
  end

  def about
  end

end
