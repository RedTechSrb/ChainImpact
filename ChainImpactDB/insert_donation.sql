-- Turkey Earthquake Relief
--D1
INSERT INTO public.donation(
	amount, projectid, donatorid,
	creationdate)
	VALUES (10000, (select id from project where name like 'Turkey Earthquake Relief'), (select id from impactor where name like 'RedTech')
		, 1674033170);
	
INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type,
	milestoneid, creationdate)
	VALUES ('bguivuisegfusefuaseuigfeuigf', 'RedTech', 'Chain Impact', 10000, 
		(select id from project where name like 'Turkey Earthquake Relief'), 
		(select id from impactor where name like 'RedTech'), 
		1,
		null, 1674033170);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type,
	milestoneid, creationdate)
	VALUES ('fuaefuiegfuigeuigfeigfeui', 'Chain Impact', 'OffRamp', 9800, 
		(select id from project where name like 'Turkey Earthquake Relief'), 
		(select id from impactor where name like 'RedTech'), 
		2,
		null, 1674033170);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type,
	milestoneid, creationdate)
	VALUES ('gfbjsdbjdbjdf', 'OffRamp', 'Turkey DAO', null, 
		(select id from project where name like 'Turkey Earthquake Relief'), 
		(select id from impactor where name like 'RedTech'), 
		3,
		null, 1674033170);

-- D2

INSERT INTO public.donation(
	amount, projectid, donatorid,
	creationdate)
	VALUES (8000, (select id from project where name like 'Turkey Earthquake Relief'), (select id from impactor where name like 'Streamflow')
		, 1676711570);
	
INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type,
	milestoneid, creationdate)
	VALUES ('fsdfsdfsdfdfsdfsere', 'Streamflow', 'Chain Impact', 8000, 
		(select id from project where name like 'Turkey Earthquake Relief'), 
		(select id from impactor where name like 'Streamflow'), 
		1,
		null, 1676711570);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type,
	milestoneid, creationdate)
	VALUES ('gsegtsegsegegsegegege', 'Chain Impact', 'OffRamp', 7840, 
		(select id from project where name like 'Turkey Earthquake Relief'), 
		(select id from impactor where name like 'Streamflow'), 
		2,
		null, 1676711570);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type,
	milestoneid, creationdate)
	VALUES ('gfbjsgrhtrhthtsdbjdbjdf', 'OffRamp', 'Turkey DAO', null, 
		(select id from project where name like 'Turkey Earthquake Relief'), 
		(select id from impactor where name like 'Streamflow'), 
		3,
		null, 1676711570);

	
-- D3


INSERT INTO public.donation(
	amount, projectid, donatorid,
	creationdate)
	VALUES (2000, (select id from project where name like 'Turkey Earthquake Relief'), (select id from impactor where name like 'GeorgeRedTech')
		, 1679130770);
	
INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type,
	milestoneid, creationdate)
	VALUES ('bguivuisegfussssefuaseuigfeuigf', 'GeorgeRedTech', 'Chain Impact', 2000, 
		(select id from project where name like 'Turkey Earthquake Relief'), 
		(select id from impactor where name like 'GeorgeRedTech'), 
		1,
		null, 1679130770);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type,
	milestoneid, creationdate)
	VALUES ('fuaefuiegfuiaaaageuigfeigfeui', 'Chain Impact', 'OffRamp', 1960, 
		(select id from project where name like 'Turkey Earthquake Relief'), 
		(select id from impactor where name like 'GeorgeRedTech'), 
		2,
		null, 1679130770);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type,
	milestoneid, creationdate)
	VALUES ('gfbjsdbjdbjaaaaaaaaaaadf', 'OffRamp', 'Turkey DAO', null, 
		(select id from project where name like 'Turkey Earthquake Relief'), 
		(select id from impactor where name like 'GeorgeRedTech'), 
		3,
		null, 1679130770);


-- Cancer Treatment for Children - St. Jude Children''s Research Hospital
--D4
INSERT INTO public.donation(
	amount, projectid, donatorid,
	creationdate)
	VALUES (15000, (select id from project where name like 'Cancer Treatment for Children - St. Jude Children''s Research Hospital'), (select id from impactor where name like 'RedTech')
		, 1647594770);
	
INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type,
	milestoneid, creationdate)
	VALUES ('bguivuisegfusefuaseuigfeuigfhfhfh', 'RedTech', 'Novak Djokovic Foundation', 14700, 
		(select id from project where name like 'Cancer Treatment for Children - St. Jude Children''s Research Hospital'), 
		(select id from impactor where name like 'RedTech'), 
		0,
		null, 1647594770);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type,
	milestoneid, creationdate)
	VALUES ('fuyyyyyyyyaefuiegfuigeuigfeigfeui', 'RedTech', 'Chain Impact', 300, 
		(select id from project where name like 'Cancer Treatment for Children - St. Jude Children''s Research Hospital'), 
		(select id from impactor where name like 'RedTech'), 
		0,
		null, 1647594770);


-- Education for All (EFA)
--D5
INSERT INTO public.donation(
	amount, projectid, donatorid,
	creationdate)
	VALUES (20000, (select id from project where name like 'Education for All (EFA)'), (select id from impactor where name like 'SolanaU')
		, 1679130770);
	
INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type,
	milestoneid, creationdate)
	VALUES ('bguivuiwewewsegfusefuaseuigfeuigf', 'SolanaU', 'Chain Impact', 20000, 
		(select id from project where name like 'Education for All (EFA)'), 
		(select id from impactor where name like 'SolanaU'), 
		1,
		null, 1679130770);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type,
	milestoneid, creationdate)
	VALUES ('fuwwwwwaefuiegfuigeuigfeigfeui', 'Chain Impact', 'OffRamp', 18600, 
		(select id from project where name like 'Education for All (EFA)'), 
		(select id from impactor where name like 'SolanaU'), 
		2,
		null, 1679130770);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type,
	milestoneid, creationdate)
	VALUES ('gfbewewewewejsdbjdbjdf', 'OffRamp', 'UNESCO', null, 
		(select id from project where name like 'Education for All (EFA)'), 
		(select id from impactor where name like 'SolanaU'), 
		3,
		null, 1679130770);


--D6
INSERT INTO public.donation(
	amount, projectid, donatorid,
	creationdate)
	VALUES (10000, (select id from project where name like 'Education for All (EFA)'), (select id from impactor where name like 'UniqueVCS')
		, 1681809170);
	
INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type,
	milestoneid, creationdate)
	VALUES ('bguivuiwewewsssegfusefuaseuigfeuigf', 'UniqueVCS', 'Chain Impact', 10000, 
		(select id from project where name like 'Education for All (EFA)'), 
		(select id from impactor where name like 'UniqueVCS'), 
		1,
		null, 1681809170);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type,
	milestoneid, creationdate)
	VALUES ('fuwwwwwssaefuiegfuigeuigfeigfeui', 'Chain Impact', 'OffRamp', 9800, 
		(select id from project where name like 'Education for All (EFA)'), 
		(select id from impactor where name like 'UniqueVCS'), 
		2,
		null, 1681809170);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type,
	milestoneid, creationdate)
	VALUES ('gfbewewewefdfdfwejsdbjdbjdf', 'OffRamp', 'UNESCO', null, 
		(select id from project where name like 'Education for All (EFA)'), 
		(select id from impactor where name like 'UniqueVCS'), 
		3,
		null, 1681809170);


--D7
INSERT INTO public.donation(
	amount, projectid, donatorid,
	creationdate)
	VALUES (500, (select id from project where name like 'Education for All (EFA)'), (select id from impactor where name like 'RedTech')
		, 1684401170);
	
INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type,
	milestoneid, creationdate)
	VALUES ('bguasdivusaiwewewsssegfusefuaseuigfeuigf', 'RedTech', 'Chain Impact', 500, 
		(select id from project where name like 'Education for All (EFA)'), 
		(select id from impactor where name like 'RedTech'), 
		1,
		null, 1684401170);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type,
	milestoneid, creationdate)
	VALUES ('fuwwwwaawssaefuiegrerfuigeuigfeigfeui', 'Chain Impact', 'OffRamp', 10, 
		(select id from project where name like 'Education for All (EFA)'), 
		(select id from impactor where name like 'RedTech'), 
		2,
		null, 1684401170);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type,
	milestoneid, creationdate)
	VALUES ('eefdfdsdfdfdfdfdfdfdf', 'OffRamp', 'UNESCO', null, 
		(select id from project where name like 'Education for All (EFA)'), 
		(select id from impactor where name like 'RedTech'), 
		3,
		null, 1684401170);

-- D8
INSERT INTO public.donation(
	amount, projectid, donatorid,
	creationdate)
	VALUES (500, (select id from project where name like 'Education for All (EFA)'), (select id from impactor where name like 'RedTech')
		, 1676711570);
	
INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type,
	milestoneid, creationdate)
	VALUES ('bguasdivdduiwewewsssegfusefuaseuigfeuigf', 'RedTech', 'Chain Impact', 500, 
		(select id from project where name like 'Education for All (EFA)'), 
		(select id from impactor where name like 'RedTech'), 
		1,
		null, 1676711570);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type,
	milestoneid, creationdate)
	VALUES ('fuwwwwwssaefuiegrerfuigeuigfeigfeui', 'Chain Impact', 'OffRamp', 10, 
		(select id from project where name like 'Education for All (EFA)'), 
		(select id from impactor where name like 'RedTech'), 
		2,
		null, 1676711570);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type,
	milestoneid, creationdate)
	VALUES ('eefdfdfdfdfdfdfdfdf', 'OffRamp', 'UNESCO', null, 
		(select id from project where name like 'Education for All (EFA)'), 
		(select id from impactor where name like 'RedTech'), 
		3,
		null, 1676711570);

