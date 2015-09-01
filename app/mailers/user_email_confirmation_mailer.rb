class UserEmailConfirmationMailer < ApplicationMailer

  def confirmation_email(user, type)
    @user = user
    @base_url = case
                when Rails.env.development? then "http://localhost:3000"
                when Rails.env.production? then "https://exchangehunt.io"
                end
    dest, token = case type
                  when :home then [@user.home_email, @user.home_institution_confirmation_token]
                  when :exchange then [@user.exchange_email, @user.exchange_institution_confirmation_token]
                  end
    @confirmation_url = "#{@base_url}/confirm?t=#{token}"
    mail(to: dest, subject: "Please confirm your email")
  end

end
