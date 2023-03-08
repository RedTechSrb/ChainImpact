-- Turkey Earthquake Relief
--D1
INSERT INTO public.donation(
	amount, projectid, donatorid)
	VALUES (10000, (select id from project where name like 'Turkey Earthquake Relief'), (select id from impactor where name like 'RedTech'));
	
INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type)
	VALUES ('bguivuisegfusefuaseuigfeuigf', 'RedTech', 'Chain Impact', 10000, 
		(select id from project where name like 'Turkey Earthquake Relief'), 
		(select id from impactor where name like 'RedTech'), 
		1);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type)
	VALUES ('fuaefuiegfuigeuigfeigfeui', 'Chain Impact', 'OffRamp', 9800, 
		(select id from project where name like 'Turkey Earthquake Relief'), 
		(select id from impactor where name like 'RedTech'), 
		2);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type)
	VALUES ('gfbjsdbjdbjdf', 'OffRamp', 'Turkey DAO', null, 
		(select id from project where name like 'Turkey Earthquake Relief'), 
		(select id from impactor where name like 'RedTech'), 
		3);

-- D2

INSERT INTO public.donation(
	amount, projectid, donatorid)
	VALUES (8000, (select id from project where name like 'Turkey Earthquake Relief'), (select id from impactor where name like 'Streamflow'));
	
INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type)
	VALUES ('fsdfsdfsdfdfsdfsere', 'Streamflow', 'Chain Impact', 8000, 
		(select id from project where name like 'Turkey Earthquake Relief'), 
		(select id from impactor where name like 'Streamflow'), 
		1);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type)
	VALUES ('gsegtsegsegegsegegege', 'Chain Impact', 'OffRamp', 7840, 
		(select id from project where name like 'Turkey Earthquake Relief'), 
		(select id from impactor where name like 'Streamflow'), 
		2);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type)
	VALUES ('gfbjsgrhtrhthtsdbjdbjdf', 'OffRamp', 'Turkey DAO', null, 
		(select id from project where name like 'Turkey Earthquake Relief'), 
		(select id from impactor where name like 'Streamflow'), 
		3);

	
-- D3


INSERT INTO public.donation(
	amount, projectid, donatorid)
	VALUES (2000, (select id from project where name like 'Turkey Earthquake Relief'), (select id from impactor where name like 'GeorgeRedTech'));
	
INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type)
	VALUES ('bguivuisegfussssefuaseuigfeuigf', 'GeorgeRedTech', 'Chain Impact', 2000, 
		(select id from project where name like 'Turkey Earthquake Relief'), 
		(select id from impactor where name like 'GeorgeRedTech'), 
		1);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type)
	VALUES ('fuaefuiegfuiaaaageuigfeigfeui', 'Chain Impact', 'OffRamp', 1960, 
		(select id from project where name like 'Turkey Earthquake Relief'), 
		(select id from impactor where name like 'GeorgeRedTech'), 
		2);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type)
	VALUES ('gfbjsdbjdbjaaaaaaaaaaadf', 'OffRamp', 'Turkey DAO', null, 
		(select id from project where name like 'Turkey Earthquake Relief'), 
		(select id from impactor where name like 'GeorgeRedTech'), 
		3);


-- Cancer Treatment for Children - St. Jude Children''s Research Hospital
--D4
INSERT INTO public.donation(
	amount, projectid, donatorid)
	VALUES (15000, (select id from project where name like 'Cancer Treatment for Children - St. Jude Children''s Research Hospital'), (select id from impactor where name like 'RedTech'));
	
INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type)
	VALUES ('bguivuisegfusefuaseuigfeuigfhfhfh', 'RedTech', 'Novak Djokovic Foundation', 14700, 
		(select id from project where name like 'Cancer Treatment for Children - St. Jude Children''s Research Hospital'), 
		(select id from impactor where name like 'RedTech'), 
		0);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type)
	VALUES ('fuyyyyyyyyaefuiegfuigeuigfeigfeui', 'RedTech', 'Chain Impact', 300, 
		(select id from project where name like 'Cancer Treatment for Children - St. Jude Children''s Research Hospital'), 
		(select id from impactor where name like 'RedTech'), 
		0);


-- Education for All (EFA)
--D5
INSERT INTO public.donation(
	amount, projectid, donatorid)
	VALUES (20000, (select id from project where name like 'Education for All (EFA)'), (select id from impactor where name like 'SolanaU'));
	
INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type)
	VALUES ('bguivuiwewewsegfusefuaseuigfeuigf', 'SolanaU', 'Chain Impact', 20000, 
		(select id from project where name like 'Education for All (EFA)'), 
		(select id from impactor where name like 'SolanaU'), 
		1);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type)
	VALUES ('fuwwwwwaefuiegfuigeuigfeigfeui', 'Chain Impact', 'OffRamp', 18600, 
		(select id from project where name like 'Education for All (EFA)'), 
		(select id from impactor where name like 'SolanaU'), 
		2);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type)
	VALUES ('gfbewewewewejsdbjdbjdf', 'OffRamp', 'UNESCO', null, 
		(select id from project where name like 'Education for All (EFA)'), 
		(select id from impactor where name like 'SolanaU'), 
		3);


--D6
INSERT INTO public.donation(
	amount, projectid, donatorid)
	VALUES (10000, (select id from project where name like 'Education for All (EFA)'), (select id from impactor where name like 'UniqueVCS'));
	
INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type)
	VALUES ('bguivuiwewewsssegfusefuaseuigfeuigf', 'UniqueVCS', 'Chain Impact', 10000, 
		(select id from project where name like 'Education for All (EFA)'), 
		(select id from impactor where name like 'UniqueVCS'), 
		1);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type)
	VALUES ('fuwwwwwssaefuiegfuigeuigfeigfeui', 'Chain Impact', 'OffRamp', 9800, 
		(select id from project where name like 'Education for All (EFA)'), 
		(select id from impactor where name like 'UniqueVCS'), 
		2);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type)
	VALUES ('gfbewewewefdfdfwejsdbjdbjdf', 'OffRamp', 'UNESCO', null, 
		(select id from project where name like 'Education for All (EFA)'), 
		(select id from impactor where name like 'UniqueVCS'), 
		3);


--D7
INSERT INTO public.donation(
	amount, projectid, donatorid)
	VALUES (1000, (select id from project where name like 'Education for All (EFA)'), (select id from impactor where name like 'RedTech'));
	
INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type)
	VALUES ('bguasdivuiwewewsssegfusefuaseuigfeuigf', 'RedTech', 'Chain Impact', 1000, 
		(select id from project where name like 'Education for All (EFA)'), 
		(select id from impactor where name like 'RedTech'), 
		1);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type)
	VALUES ('fuwwwwwssaefuiegrerfuigeuigfeigfeui', 'Chain Impact', 'OffRamp', 20, 
		(select id from project where name like 'Education for All (EFA)'), 
		(select id from impactor where name like 'RedTech'), 
		2);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type)
	VALUES ('eefdfdfdfdfdfdfdfdf', 'OffRamp', 'UNESCO', null, 
		(select id from project where name like 'Education for All (EFA)'), 
		(select id from impactor where name like 'RedTech'), 
		3);


