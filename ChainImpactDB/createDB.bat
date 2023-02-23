set PGPASSWORD=matija

psql -U postgres -d chainimpact -f create_schema.sql
psql -U postgres -d chainimpact -f insert_project.sql
