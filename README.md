# exchangehunt
Git for Exchangehunt

## Building

### Database setup

```sql
  # in psql
  CREATE USER exchangehunt WITH PASSWORD 'exchangehunt'; 
  ALTER USER exchangehunt CREATEDB;
```

```
rake db:create
rake db:setup
rails server # => http://localhost:3000
```
