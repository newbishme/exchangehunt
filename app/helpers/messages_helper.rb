module MessagesHelper
  def recipients_options
    s = ''
    User.all.each do |user|
      s << "<option value='#{user.id}'>#{user.username}</option>"
    end
    s.html_safe
  end

  def recipients_options(chosen_recipient = nil)
    s = ''
    User.all.each do |user|
      s << "<option value='#{user.id}' #{'selected' if user == chosen_recipient}>#{user.first_name} #{user.last_name}</option>"
    end
    s.html_safe
  end
end
