require 'rails_helper'

RSpec.describe User, type: :model do

  context 'names' do
    let(:user) { User.new(:email => "foo@bar.com", :password => "apples") }
    it 'should be able to derive the full name from first and last name' do
      user.first_name = "foo"
      user.last_name = "bar"
      expect(user.full_name).to eq "foo bar"
    end
  end

  context 'emails' do
    let(:user) { User.new(:email => "FoO@BaR.com", :password => "12345678", :uid => "987654321") }
    
    it 'should downcase the email before saving' do
      user.save
      expect(User.first.email).to eq "foo@bar.com" # case sensitive matching
    end

  end

  context 'validations' do

    let(:user) { User.new(:email => "foo@bar.com", :password => "12345678", :uid => "987654321") }
    let(:user2) { User.new(:email => "FOO@bar.com", :password => "12345678", :uid => "987654321") }

    it 'should be able to save the user with email, password and facebook uid' do
      expect(user.save!).to be true
    end

    it 'should not be able to save the user without an uid' do
      user.uid = nil
      expect(user.save).to be false
    end

    it 'should not be able to save the user without an email' do
      user.email = nil
      expect(user.save).to be false
    end

    it 'should not be able to save the user without a password' do
      user.password = nil 
      expect(user.save).to be false
    end

    it 'should not be able to save the user if the password is less than 8 characters long' do
      user.password = "1234567"
      expect(user.save).to be false
    end

    it 'should not be able to save a user if the email already exists' do
      user.save
      expect(user2.save).to be false
    end

    it 'should not be able to save a user if the username already exists' do
      user.username = "foo"
      user.save
      user2.username = "FOO"
      expect(user2.save).to be false
    end

  end

end
