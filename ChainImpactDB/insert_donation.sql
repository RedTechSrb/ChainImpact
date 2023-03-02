-- With off-ramp

--D1

INSERT INTO public.donation(
	amount, projectid, donatorid)
	VALUES (100, (select id from project where name like 'Turkish help'), (select id from impactor where name like 'RedTech'));
	
INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, projectid, donatorid, type)
	VALUES ('bguivuisegfusefuaseuigfeuigf', 'RedTech', 'Chain Impact', 100, (select id from project where name like 'Turkish help'), (select id from impactor where name like 'RedTech'), 1);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, projectid, donatorid, type)
	VALUES ('fuaefuiegfuigeuigfeigfeui', 'Chain Impact', 'OffRamp', 98, (select id from project where name like 'Turkish help'), (select id from impactor where name like 'RedTech'), 2);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, projectid, donatorid, type)
	VALUES ('gfbjsdbjdbjdf', 'OffRamp', 'United Nations', null, (select id from project where name like 'Turkish help'), (select id from impactor where name like 'RedTech'), 3);

-- D2
INSERT INTO public.donation(
	amount, projectid, donatorid)
	VALUES (550, (select id from project where name like 'Turkish help'), (select id from impactor where name like 'Decenter'));
	
INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, projectid, donatorid, type)
	VALUES ('uefuefuefuefhefuefh', 'Decenter', 'Chain Impact', 550, (select id from project where name like 'Turkish help'), (select id from impactor where name like 'Decenter'), 1);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, projectid, donatorid, type)
	VALUES ('fhdefhdhfhefhehfiehf', 'Chain Impact', 'OffRamp', 539, (select id from project where name like 'Turkish help'), (select id from impactor where name like 'Decenter'), 2);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, projectid, donatorid, type)
	VALUES ('aaaaaaaaadiofvndifvodehgfoeh', 'OffRamp', 'United Nations', null, (select id from project where name like 'Turkish help'), (select id from impactor where name like 'Decenter'), 3);
	
-- D3

INSERT INTO public.donation(
	amount, projectid, donatorid)
	VALUES (700, (select id from project where name like 'Siria help'), (select id from impactor where name like 'RedTech'));
	
INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, projectid, donatorid, type)
	VALUES ('fdfdfdfd', 'RedTech', 'Chain Impact', 700, (select id from project where name like 'Siria help'), (select id from impactor where name like 'RedTech'), 1);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, projectid, donatorid, type)
	VALUES ('fdfdfdfdffhefhehfiehf', 'Chain Impact', 'OffRamp', 686, (select id from project where name like 'Siria help'), (select id from impactor where name like 'RedTech'), 2);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, projectid, donatorid, type)
	VALUES ('aaabbbbbbbbbbbbbadiofvndifvodehgfoeh', 'OffRamp', 'United Nations' , null, (select id from project where name like 'Siria help'), (select id from impactor where name like 'RedTech'), 3);
	
-- D4

INSERT INTO public.donation(
	amount, projectid, donatorid)
	VALUES (180, (select id from project where name like 'Earthquake general help'), (select id from impactor where name like 'RedTech'));
	
INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, projectid, donatorid, type)
	VALUES ('fsdfffffffffffffffdfdfd', 'RedTech', 'Chain Impact', 180, (select id from project where name like 'Earthquake general help'), (select id from impactor where name like 'RedTech'), 1);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, projectid, donatorid, type)
	VALUES ('gggggggggggggggger', 'Chain Impact', 'OffRamp', 176.4, (select id from project where name like 'Earthquake general help'), (select id from impactor where name like 'RedTech'), 2);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, projectid, donatorid, type)
	VALUES ('hfgjhuiorhgi', 'OffRamp', 'United Nations', null, (select id from project where name like 'Earthquake general help'), (select id from impactor where name like 'RedTech'), 3);
	
-- No off-ramp
-- D5	
INSERT INTO public.donation(
	amount, projectid, donatorid)
	VALUES (50, (select id from project where name like 'Cultural Heritage'), (select id from impactor where name like 'RedTech'));
	
INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, projectid, donatorid, type)
	VALUES ('fdfdfdf', 'RedTech', 'Unesco', 49, (select id from project where name like 'Cultural Heritage'), (select id from impactor where name like 'RedTech'), 0);

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, projectid, donatorid, type)
	VALUES ('gipjdfioghdfihg', 'RedTech', 'Chain Impact', 1, (select id from project where name like 'Cultural Heritage'), (select id from impactor where name like 'RedTech'), 0);