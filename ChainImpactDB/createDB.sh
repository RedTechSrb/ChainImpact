#!/bin/sh
export PGPASSWORD=Cha1nImpact

psql -U postgres -d chainimpactdb -h localhost  -p 5432 -f create_schema.sql

psql -U postgres -d chainimpactdb -h localhost  -p 5432 -f insert_charity.sql
psql -U postgres -d chainimpactdb -h localhost  -p 5432 -f insert_causetype.sql
psql -U postgres -d chainimpactdb -h localhost  -p 5432 -f insert_impactor.sql

psql -U postgres -d chainimpactdb -h localhost  -p 5432 -f insert_nfttype.sql

psql -U postgres -d chainimpactdb -h localhost  -p 5432 -f insert_project.sql
psql -U postgres -d chainimpactdb -h localhost  -p 5432 -f insert_milestone.sql
psql -U postgres -d chainimpactdb -h localhost  -p 5432 -f insert_milestonetransactions.sql

psql -U postgres -d chainimpactdb -h localhost  -p 5432 -f insert_donation.sql

psql -U postgres -d chainimpactdb -h localhost  -p 5432 -f insert_nftowner.sql