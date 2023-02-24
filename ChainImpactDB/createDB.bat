set PGPASSWORD=matija

psql -U postgres -d chainimpact -f create_schema.sql


psql -U postgres -d chainimpact -f insert_charity.sql
psql -U postgres -d chainimpact -f insert_causetype.sql
psql -U postgres -d chainimpact -f insert_impactor.sql

psql -U postgres -d chainimpact -f insert_nfttype.sql

psql -U postgres -d chainimpact -f insert_project.sql

