# ExchangeHunt 

## Building

#### Database setup

```sql
# in psql
CREATE USER exchangehunt WITH PASSWORD 'exchangehunt'; 
ALTER USER exchangehunt CREATEDB;
```

#### Rails setup 

```sh
rake db:create
rake db:setup
rails server # => http://localhost:3000
```
