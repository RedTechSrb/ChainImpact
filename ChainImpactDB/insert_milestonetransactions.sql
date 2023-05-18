-- Turkey Earthquake Relief

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	donationid, 
	type,
	milestoneid, 
	creationdate)
	VALUES ('bfuiasfdfidi', 'RedTech', 'Turkey DAO', 10, 
		null, 4,
		(select id from milestone where name like 'Hire professors' and projectid = (select id from project where name like 'Turkey Earthquake Relief'))
		, 1676711570);
		
	