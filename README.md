# ExchangeHunt

## Members' contributions
Gan Mei Lan, A0102147W (Business)
- Market research on current offerings and users' needs analysis 
- Feedback on UI/UX to improve the frontend and logic flow of app

Tan Sei Yee, A0111697B (Designer)
- Responsible for all the design of the Web, design of logo, UI/UX
- Feedback on UI/UX to improve the frontend and logic flow of app

Ang Ming Yi, A0111840W (Developer)
- (Mostly) Frontend developer
- Responsible for turning design into code
- Responsible for implementing the UI/UX design
- Implemented messages component
- Manage database schema

Chen Jingwen, A0111764L (Developer)
- (Mostly) Backend developer
- Responsible for linking backend components to talk to each other
- Responsible for the rake scripts 
- Responsible for setting up of environment
- Implemented facebook/google api components

## Building

#### Dependencies

- nodejs / npm
- ruby
- postgresql

#### Database setup

```sql
# in psql
CREATE USER exchangehunt WITH PASSWORD 'exchangehunt'; 
ALTER USER exchangehunt CREATEDB;
```

#### Environment setup

```sh
cp .env.sample .env
# fill up .env with the relevant info
```

#### Rails setup 

```sh
bundle install
npm install
rake db:create
rake db:setup
rails server # => http://localhost:3000
```

## Deployment

```sh
# ensure that you are logged into heroku 
brew install heroku-toolbelt
heroku login
heroku git:remote -a exchangehunt

# git push heroku master
```
