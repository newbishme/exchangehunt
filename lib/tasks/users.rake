namespace :users do

  task seed: :environment do
    User.create!(uid: rand(100000000), first_name: "John", last_name: "Doe", username: "john", email: "john@doe.org", password: "12345678")
    User.create!(uid: rand(100000000), first_name: "Jill", last_name: "Doe", username: "jill", email: "jill@doe.org", password: "12345678")
    User.create!(uid: rand(100000000), first_name: "James", last_name: "Doe", username: "james", email: "james@doe.org", password: "12345678")
  end

  task connect: :environment do
    UsrInstnConnect.create!(user_id: 1, institution_id: 1, is_home_institution: false)
    UsrInstnConnect.create!(user_id: 2, institution_id: 1, is_home_institution: false)
    UsrInstnConnect.create!(user_id: 3, institution_id: 1, is_home_institution: false)
  end

end
