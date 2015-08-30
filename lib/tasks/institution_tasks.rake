require 'uri'
require 'httparty'

namespace :institutions do

  desc "update institutions with their Wikipedia extracts"
  task :update_extracts => :environment do
    endpoint_url = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=" 
    puts "Getting extracts.."
    Institution.all.each do |inst|
      puts "Retrieving for #{inst.name}"
      inst_url = endpoint_url + URI.encode(inst.name)
      resp = HTTParty.get(inst_url, :verify => false).parsed_response
      key = resp["query"]["pages"].keys.first
      extract = resp["query"]["pages"][key]["extract"]
      inst.extract = extract unless extract.nil?
      inst.save
    end
  end

end
