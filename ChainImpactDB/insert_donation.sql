-- Anka Relief DAO
--D1
INSERT INTO public.donation(
	amount, projectid, donatorid)
	VALUES (10000, (select id from project where name like 'Anka Relief DAO'), (select id from impactor where name like 'RedTech'));
	
INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type)
	VALUES ('bguivuisegfusefuaseuigfeuigf', 'RedTech', 'Chain Impact', 10000, 
		(select id from project where name like 'Anka Relief DAO'), 
		(select id from impactor where name like 'RedTech'), 
		1);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type)
	VALUES ('fuaefuiegfuigeuigfeigfeui', 'Chain Impact', 'OffRamp', 9800, 
		(select id from project where name like 'Anka Relief DAO'), 
		(select id from impactor where name like 'RedTech'), 
		2);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type)
	VALUES ('gfbjsdbjdbjdf', 'OffRamp', 'Turkey DAO', null, 
		(select id from project where name like 'Anka Relief DAO'), 
		(select id from impactor where name like 'RedTech'), 
		3);

-- D2

INSERT INTO public.donation(
	amount, projectid, donatorid)
	VALUES (8000, (select id from project where name like 'Anka Relief DAO'), (select id from impactor where name like 'Google'));
	
INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type)
	VALUES ('fsdfsdfsdfdfsdfsere', 'Google', 'Chain Impact', 8000, 
		(select id from project where name like 'Anka Relief DAO'), 
		(select id from impactor where name like 'Google'), 
		1);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type)
	VALUES ('gsegtsegsegegsegegege', 'Google', 'OffRamp', 7840, 
		(select id from project where name like 'Anka Relief DAO'), 
		(select id from impactor where name like 'Google'), 
		2);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type)
	VALUES ('gfbjsgrhtrhthtsdbjdbjdf', 'OffRamp', 'Turkey DAO', null, 
		(select id from project where name like 'Anka Relief DAO'), 
		(select id from impactor where name like 'Google'), 
		3);

	
-- D3


INSERT INTO public.donation(
	amount, projectid, donatorid)
	VALUES (2000, (select id from project where name like 'Anka Relief DAO'), (select id from impactor where name like 'mdodovic'));
	
INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type)
	VALUES ('bguivuisegfussssefuaseuigfeuigf', 'RedTech', 'Chain Impact', 2000, 
		(select id from project where name like 'Anka Relief DAO'), 
		(select id from impactor where name like 'mdodovic'), 
		1);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type)
	VALUES ('fuaefuiegfuiaaaageuigfeigfeui', 'Chain Impact', 'OffRamp', 1960, 
		(select id from project where name like 'Anka Relief DAO'), 
		(select id from impactor where name like 'mdodovic'), 
		2);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type)
	VALUES ('gfbjsdbjdbjaaaaaaaaaaadf', 'OffRamp', 'Turkey DAO', null, 
		(select id from project where name like 'Anka Relief DAO'), 
		(select id from impactor where name like 'mdodovic'), 
		3);


-- Anka Relief DAO
--D4
INSERT INTO public.donation(
	amount, projectid, donatorid)
	VALUES (15000, (select id from project where name like 'Support To Life'), (select id from impactor where name like 'Facebook'));
	
INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type)
	VALUES ('bguivuisegfusefuaseuigfeuigfhfhfh', 'Facebook', 'Chain Impact', 14700, 
		(select id from project where name like 'Support To Life'), 
		(select id from impactor where name like 'RedTech'), 
		0);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type)
	VALUES ('fuyyyyyyyyaefuiegfuigeuigfeigfeui', 'Facebook', 'Turkey DAO', 300, 
		(select id from project where name like 'Support To Life'), 
		(select id from impactor where name like 'RedTech'), 
		0);


-- HOW ARE YOU? REALLY.
--D5
INSERT INTO public.donation(
	amount, projectid, donatorid)
	VALUES (20000, (select id from project where name like 'HOW ARE YOU? REALLY.'), (select id from impactor where name like 'Decenter'));
	
INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type)
	VALUES ('bguivuiwewewsegfusefuaseuigfeuigf', 'Decenter', 'Chain Impact', 20000, 
		(select id from project where name like 'HOW ARE YOU? REALLY.'), 
		(select id from impactor where name like 'Decenter'), 
		1);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type)
	VALUES ('fuwwwwwaefuiegfuigeuigfeigfeui', 'Chain Impact', 'OffRamp', 18600, 
		(select id from project where name like 'HOW ARE YOU? REALLY.'), 
		(select id from impactor where name like 'Decenter'), 
		2);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type)
	VALUES ('gfbewewewewejsdbjdbjdf', 'OffRamp', 'United Nations Children''s Fund (UNICEF)', null, 
		(select id from project where name like 'HOW ARE YOU? REALLY.'), 
		(select id from impactor where name like 'Decenter'), 
		3);


--D6
INSERT INTO public.donation(
	amount, projectid, donatorid)
	VALUES (10000, (select id from project where name like 'HOW ARE YOU? REALLY.'), (select id from impactor where name like 'RedTech'));
	
INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type)
	VALUES ('bguivuiwewewsssegfusefuaseuigfeuigf', 'RedTech', 'Chain Impact', 10000, 
		(select id from project where name like 'HOW ARE YOU? REALLY.'), 
		(select id from impactor where name like 'RedTech'), 
		1);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type)
	VALUES ('fuwwwwwssaefuiegfuigeuigfeigfeui', 'Chain Impact', 'OffRamp', 9800, 
		(select id from project where name like 'HOW ARE YOU? REALLY.'), 
		(select id from impactor where name like 'RedTech'), 
		2);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type)
	VALUES ('gfbewewewefdfdfwejsdbjdbjdf', 'OffRamp', 'United Nations Children''s Fund (UNICEF)', null, 
		(select id from project where name like 'HOW ARE YOU? REALLY.'), 
		(select id from impactor where name like 'RedTech'), 
		3);


--D7
INSERT INTO public.donation(
	amount, projectid, donatorid)
	VALUES (100, (select id from project where name like 'HOW ARE YOU? REALLY.'), (select id from impactor where name like 'limun'));
	
INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type)
	VALUES ('bguasdivuiwewewsssegfusefuaseuigfeuigf', 'limun', 'Chain Impact', 100, 
		(select id from project where name like 'HOW ARE YOU? REALLY.'), 
		(select id from impactor where name like 'limun'), 
		1);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type)
	VALUES ('fuwwwwwssaefuiegrerfuigeuigfeigfeui', 'Chain Impact', 'OffRamp', 2, 
		(select id from project where name like 'HOW ARE YOU? REALLY.'), 
		(select id from impactor where name like 'limun'), 
		2);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type)
	VALUES ('eefdfdfdfdfdfdfdfdf', 'OffRamp', 'United Nations Children''s Fund (UNICEF)', null, 
		(select id from project where name like 'HOW ARE YOU? REALLY.'), 
		(select id from impactor where name like 'limun'), 
		3);


