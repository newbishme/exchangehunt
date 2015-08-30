class UserEmailConfirmationMailer < ApplicationMailer

  def confirmation_email(user, type)
    @user = user
    @base_url = case
                when Rails.env.development? then "http://localhost:3000"
                when Rails.env.production? then "https://exchangehunt.io"
                end
    @confirmation_url = "#{@base_url}/confirm?t=#{@user.home_institution_confirmation_token}"
    dest = case type
           when :home then @user.home_email
           when :exchange then @user.exchange_email
           end
    mail(to: dest, subject: "Please confirm your email")
  end

end
