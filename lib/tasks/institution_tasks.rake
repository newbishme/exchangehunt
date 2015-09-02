require 'uri'
require 'json'
require 'httparty'
require 'mechanize'

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

  desc 'seed from json'
  task seed: :environment do
    file = File.read "#{Rails.root}/db/unis.json"
    json = JSON.parse(file)

    json.each_with_index do |x, idx|
      web, country, domain, name = x["web_page"], x["country"], x["domain"], x["name"]
      puts "#{idx} - Seeding institution: #{name}"
      instn = Institution.where(name: name).first_or_create do |i| 
        i.name = name
        i.country = country
        i.state = ""
        i.language = "English"
      end
      instn.institution_emails.where(instn_domain: domain).first_or_create do |e|
        e.instn_domain = domain
      end
      instn.save
    end
  end

  task crawl_facebook: :environment do
    a = Mechanize.new { |agent| agent.user_agent_alias = 'Mac Safari' }
    file = File.read "#{Rails.root}/db/unis.json"
    json = JSON.parse(file)
    json.each_with_index do |x, idx|
      web, name = x["web_page"], x["name"]
      puts "#{idx} - Crawling home page for institution: #{name} - #{web}"
      begin
        a.get(web) do |page|
          page.links.each do |link|
            if link.href =~ /facebook\.com/
              puts "FOUND: FB page for #{name}: #{link.href}"
              i = Institution.find_by_name(name)
              i.facebook_pid = link.href
              i.save
              break
            end
          end
        end
      rescue
      end
    end
  end

  task extract_cover: :environment do
    @graph = Koala::Facebook::API.new(ENV["FACEBOOK_GRAPH_TOKEN"])
    Institution.all.each do |i|
      if i.facebook_pid && !i.facebook_img_url
        splat = i.facebook_pid.split("/")
        next if splat[-2] != "www.facebook.com" || splat.last =~ /sharer\.php/
        begin
          obj = @graph.get_object(splat.last, {fields: "cover"})
          i.facebook_img_url = obj["cover"]["source"]
          i.save
          puts "FOUND: Cover image for #{i.name}"
        rescue
        end
      end
    end
  end
end
