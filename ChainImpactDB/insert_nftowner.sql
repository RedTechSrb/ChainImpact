
-- RedTech

-- general
INSERT INTO public.nftowner(
	nfttypeid,
	impactorid)
	VALUES (
		(select id from nfttype where tier = 0 AND usertype = 0 AND causetypeid = (select id from causetype where name like 'general'))
		,(select id from impactor where name = 'RedTech')	
	);	
	
INSERT INTO public.nftowner(
	nfttypeid,
	impactorid)
	VALUES (
		(select id from nfttype where tier = 1 AND usertype = 0 AND causetypeid = (select id from causetype where name like 'general'))
		,(select id from impactor where name = 'RedTech')	
	);	

INSERT INTO public.nftowner(
	nfttypeid,
	impactorid)
	VALUES (
		(select id from nfttype where tier = 2 AND usertype = 0 AND causetypeid = (select id from causetype where name like 'general'))
		,(select id from impactor where name = 'RedTech')	
	);	


-- health
INSERT INTO public.nftowner(
	nfttypeid,
	impactorid)
	VALUES (
		(select id from nfttype where tier = 0 AND usertype = 0 AND causetypeid = (select id from causetype where name like 'health'))
		,(select id from impactor where name = 'RedTech')	
	);	
	
INSERT INTO public.nftowner(
	nfttypeid,
	impactorid)
	VALUES (
		(select id from nfttype where tier = 1 AND usertype = 0 AND causetypeid = (select id from causetype where name like 'health'))
		,(select id from impactor where name = 'RedTech')	
	);	

INSERT INTO public.nftowner(
	nfttypeid,
	impactorid)
	VALUES (
		(select id from nfttype where tier = 2 AND usertype = 0 AND causetypeid = (select id from causetype where name like 'health'))
		,(select id from impactor where name = 'RedTech')	
	);	
	
-- disaster relief
INSERT INTO public.nftowner(
	nfttypeid,
	impactorid)
	VALUES (
		(select id from nfttype where tier = 0 AND usertype = 0 AND causetypeid = (select id from causetype where name like 'disaster relief'))
		,(select id from impactor where name = 'RedTech')	
	);	
	
INSERT INTO public.nftowner(
	nfttypeid,
	impactorid)
	VALUES (
		(select id from nfttype where tier = 1 AND usertype = 0 AND causetypeid = (select id from causetype where name like 'disaster relief'))
		,(select id from impactor where name = 'RedTech')	
	);	


-- health
INSERT INTO public.nftowner(
	nfttypeid,
	impactorid)
	VALUES (
		(select id from nfttype where tier = 0 AND usertype = 0 AND causetypeid = (select id from causetype where name like 'education'))
		,(select id from impactor where name = 'RedTech')	
	);	
	