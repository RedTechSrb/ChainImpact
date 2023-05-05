-- Turkey Earthquake Relief
--D1
INSERT INTO public.donation(
	amount, projectid, donatorid)
	VALUES (10000, (select id from project where name like 'Turkey Earthquake Relief'), (select id from impactor where name like 'RedTech'));
	
INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type,
	milestoneid)
	VALUES ('bguivuisegfusefuaseuigfeuigf', 'RedTech', 'Chain Impact', 10000, 
		(select id from project where name like 'Turkey Earthquake Relief'), 
		(select id from impactor where name like 'RedTech'), 
		1,
		null);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type,
	milestoneid)
	VALUES ('fuaefuiegfuigeuigfeigfeui', 'Chain Impact', 'OffRamp', 9800, 
		(select id from project where name like 'Turkey Earthquake Relief'), 
		(select id from impactor where name like 'RedTech'), 
		2,
		null);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type,
	milestoneid)
	VALUES ('gfbjsdbjdbjdf', 'OffRamp', 'Turkey DAO', null, 
		(select id from project where name like 'Turkey Earthquake Relief'), 
		(select id from impactor where name like 'RedTech'), 
		3,
		null);

-- D2

INSERT INTO public.donation(
	amount, projectid, donatorid)
	VALUES (8000, (select id from project where name like 'Turkey Earthquake Relief'), (select id from impactor where name like 'Streamflow'));
	
INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type,
	milestoneid)
	VALUES ('fsdfsdfsdfdfsdfsere', 'Streamflow', 'Chain Impact', 8000, 
		(select id from project where name like 'Turkey Earthquake Relief'), 
		(select id from impactor where name like 'Streamflow'), 
		1,
		null);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type,
	milestoneid)
	VALUES ('gsegtsegsegegsegegege', 'Chain Impact', 'OffRamp', 7840, 
		(select id from project where name like 'Turkey Earthquake Relief'), 
		(select id from impactor where name like 'Streamflow'), 
		2,
		null);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type,
	milestoneid)
	VALUES ('gfbjsgrhtrhthtsdbjdbjdf', 'OffRamp', 'Turkey DAO', null, 
		(select id from project where name like 'Turkey Earthquake Relief'), 
		(select id from impactor where name like 'Streamflow'), 
		3,
		null);

	
-- D3


INSERT INTO public.donation(
	amount, projectid, donatorid)
	VALUES (2000, (select id from project where name like 'Turkey Earthquake Relief'), (select id from impactor where name like 'GeorgeRedTech'));
	
INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type,
	milestoneid)
	VALUES ('bguivuisegfussssefuaseuigfeuigf', 'GeorgeRedTech', 'Chain Impact', 2000, 
		(select id from project where name like 'Turkey Earthquake Relief'), 
		(select id from impactor where name like 'GeorgeRedTech'), 
		1,
		null);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type,
	milestoneid)
	VALUES ('fuaefuiegfuiaaaageuigfeigfeui', 'Chain Impact', 'OffRamp', 1960, 
		(select id from project where name like 'Turkey Earthquake Relief'), 
		(select id from impactor where name like 'GeorgeRedTech'), 
		2,
		null);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type,
	milestoneid)
	VALUES ('gfbjsdbjdbjaaaaaaaaaaadf', 'OffRamp', 'Turkey DAO', null, 
		(select id from project where name like 'Turkey Earthquake Relief'), 
		(select id from impactor where name like 'GeorgeRedTech'), 
		3,
		null);


-- Cancer Treatment for Children - St. Jude Children''s Research Hospital
--D4
INSERT INTO public.donation(
	amount, projectid, donatorid)
	VALUES (15000, (select id from project where name like 'Cancer Treatment for Children - St. Jude Children''s Research Hospital'), (select id from impactor where name like 'RedTech'));
	
INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type,
	milestoneid)
	VALUES ('bguivuisegfusefuaseuigfeuigfhfhfh', 'RedTech', 'Novak Djokovic Foundation', 14700, 
		(select id from project where name like 'Cancer Treatment for Children - St. Jude Children''s Research Hospital'), 
		(select id from impactor where name like 'RedTech'), 
		0,
		null);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type,
	milestoneid)
	VALUES ('fuyyyyyyyyaefuiegfuigeuigfeigfeui', 'RedTech', 'Chain Impact', 300, 
		(select id from project where name like 'Cancer Treatment for Children - St. Jude Children''s Research Hospital'), 
		(select id from impactor where name like 'RedTech'), 
		0,
		null);


-- Education for All (EFA)
--D5
INSERT INTO public.donation(
	amount, projectid, donatorid)
	VALUES (20000, (select id from project where name like 'Education for All (EFA)'), (select id from impactor where name like 'SolanaU'));
	
INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type,
	milestoneid)
	VALUES ('bguivuiwewewsegfusefuaseuigfeuigf', 'SolanaU', 'Chain Impact', 20000, 
		(select id from project where name like 'Education for All (EFA)'), 
		(select id from impactor where name like 'SolanaU'), 
		1,
		null);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type,
	milestoneid)
	VALUES ('fuwwwwwaefuiegfuigeuigfeigfeui', 'Chain Impact', 'OffRamp', 18600, 
		(select id from project where name like 'Education for All (EFA)'), 
		(select id from impactor where name like 'SolanaU'), 
		2,
		null);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type,
	milestoneid)
	VALUES ('gfbewewewewejsdbjdbjdf', 'OffRamp', 'UNESCO', null, 
		(select id from project where name like 'Education for All (EFA)'), 
		(select id from impactor where name like 'SolanaU'), 
		3,
		null);


--D6
INSERT INTO public.donation(
	amount, projectid, donatorid)
	VALUES (10000, (select id from project where name like 'Education for All (EFA)'), (select id from impactor where name like 'UniqueVCS'));
	
INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type,
	milestoneid)
	VALUES ('bguivuiwewewsssegfusefuaseuigfeuigf', 'UniqueVCS', 'Chain Impact', 10000, 
		(select id from project where name like 'Education for All (EFA)'), 
		(select id from impactor where name like 'UniqueVCS'), 
		1,
		null);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type,
	milestoneid)
	VALUES ('fuwwwwwssaefuiegfuigeuigfeigfeui', 'Chain Impact', 'OffRamp', 9800, 
		(select id from project where name like 'Education for All (EFA)'), 
		(select id from impactor where name like 'UniqueVCS'), 
		2,
		null);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type,
	milestoneid)
	VALUES ('gfbewewewefdfdfwejsdbjdbjdf', 'OffRamp', 'UNESCO', null, 
		(select id from project where name like 'Education for All (EFA)'), 
		(select id from impactor where name like 'UniqueVCS'), 
		3,
		null);


--D7
INSERT INTO public.donation(
	amount, projectid, donatorid)
	VALUES (500, (select id from project where name like 'Education for All (EFA)'), (select id from impactor where name like 'RedTech'));
	
INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type,
	milestoneid)
	VALUES ('bguasdivusaiwewewsssegfusefuaseuigfeuigf', 'RedTech', 'Chain Impact', 500, 
		(select id from project where name like 'Education for All (EFA)'), 
		(select id from impactor where name like 'RedTech'), 
		1,
		null);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type,
	milestoneid)
	VALUES ('fuwwwwaawssaefuiegrerfuigeuigfeigfeui', 'Chain Impact', 'OffRamp', 10, 
		(select id from project where name like 'Education for All (EFA)'), 
		(select id from impactor where name like 'RedTech'), 
		2,
		null);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type,
	milestoneid)
	VALUES ('eefdfdsdfdfdfdfdfdfdf', 'OffRamp', 'UNESCO', null, 
		(select id from project where name like 'Education for All (EFA)'), 
		(select id from impactor where name like 'RedTech'), 
		3,
		null);

-- D8
INSERT INTO public.donation(
	amount, projectid, donatorid)
	VALUES (500, (select id from project where name like 'Education for All (EFA)'), (select id from impactor where name like 'RedTech'));
	
INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type,
	milestoneid)
	VALUES ('bguasdivdduiwewewsssegfusefuaseuigfeuigf', 'RedTech', 'Chain Impact', 500, 
		(select id from project where name like 'Education for All (EFA)'), 
		(select id from impactor where name like 'RedTech'), 
		1,
		null);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type,
	milestoneid)
	VALUES ('fuwwwwwssaefuiegrerfuigeuigfeigfeui', 'Chain Impact', 'OffRamp', 10, 
		(select id from project where name like 'Education for All (EFA)'), 
		(select id from impactor where name like 'RedTech'), 
		2,
		null);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type,
	milestoneid)
	VALUES ('eefdfdfdfdfdfdfdfdf', 'OffRamp', 'UNESCO', null, 
		(select id from project where name like 'Education for All (EFA)'), 
		(select id from impactor where name like 'RedTech'), 
		3,
		null);

