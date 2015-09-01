class AddExchangeInstitutionConfirmedAndExchangeInstitutionConfirmationCodeToUser < ActiveRecord::Migration

  def change
    add_column :users, :exchange_institution_confirmed, :boolean
    add_column :users, :exchange_institution_confirmation_token, :string
  end

end
