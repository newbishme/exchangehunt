# ExchangeHunt 

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
