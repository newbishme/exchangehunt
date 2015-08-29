class UserEmailConfirmationMailer < ApplicationMailer

  def confirmation_email(user)
    @user = user
    @confirmation_url = "https://exchangehunt.io/users/confirm?t=#{@user.home_institution_confirmation_token}"
    mail(to: @user.email, subject: "Please confirm your email")
  end

end
