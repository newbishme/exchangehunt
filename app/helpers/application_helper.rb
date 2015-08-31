module ApplicationHelper
  def image_for(user, size = 30, title = user.username)
    image_tag user.image_url, :title => title
  end
end
