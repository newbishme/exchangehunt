class AddHomeInstitutionConfirmedAndHomeInstitutionConfirmationCodeToUser < ActiveRecord::Migration

  def change
    add_column :users, :home_institution_confirmed, :boolean
    add_column :users, :home_institution_confirmation_token, :string
  end

end
