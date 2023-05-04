-- Turkey Earthquake Relief

INSERT INTO public.transaction(
	blockchainaddress, sender, receiver, amount, 
	projectid, 
	donatorid, 
	type,
	milestoneid)
	VALUES ('bfuiasfdfidi', 'RedTech', 'Turkey DAO', 10, 
		(select id from project where name like 'Turkey Earthquake Relief'), 
		(select id from impactor where name like 'RedTech'), 
		4,
		(select id from milestone where name like 'Hire professors' and projectid = (select id from project where name like 'Turkey Earthquake Relief'))
		);
		
		