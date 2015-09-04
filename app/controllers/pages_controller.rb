class PagesController < ApplicationController

  before_action :ensure_complete_registration

  def index
    if user_signed_in? && current_user.oauth_token?
      @facebook_friends = current_user.facebook_friends.map { |f| User.find_by_uid(f["id"]) }.compact
    end
  end

  def home
  end

  def help
  end

  def about
  end

  def privacy_policy
  end

  def support
  end

end
