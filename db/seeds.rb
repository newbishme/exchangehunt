# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require 'csv'

def seed_institutions
  csv_text = File.read("db/institutions.csv")
  csv = CSV.parse(csv_text, :headers => true)
  csv.each do |row|
    Institution.create!(row.to_hash)
  end

end

def seed_institution_emails
  csv_text = File.read("db/institutions_email.csv")
  csv = CSV.parse(csv_text, :headers => true)
  csv.each do |row|
    row_value = row.to_hash
    id = row_value["institution_id"]
    i = Institution.find(id)
    i.institution_emails.create(instn_domain: row_value["instn_domain"])
    i.save
  end
end

seed_institutions
seed_institution_emails
