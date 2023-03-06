-- Turkey DAO

INSERT INTO public.project(
	charityid, name, 
	wallet,
	description, 
	milestones, 
	financialgoal, totaldonated, totalbackers,
	website, facebook, discord, twitter, instagram,
	imageurl, 
	impactorid, 
	primarycausetypeid, secondarycausetypeid)
	VALUES ((select id from charity where name like 'Turkey DAO'), 'Anka Relief DAO', 
		null,
		'Multi-sig crypto relief fund operated by industry leaders to support the people of Türkiye after the disastrous earthquakes that hit the region.', 
		'1. Phase 1, 2. Phase 2, 3. Phase 3', 
		100000.0, 20000.0, 3,
		null, null, null, null, null, 
		'https://turkiyereliefdao.org/icons/organizations/anka.png', 
		(select id from impactor where name like 'RedTech'), 
		(select id from causetype where name like 'disaster relief'), (select id from causetype where name like 'social'));

INSERT INTO public.project(
	charityid, name, 
	wallet,
	description, 
	milestones, 
	financialgoal, totaldonated, totalbackers,
	website, facebook, discord, twitter, instagram,
	imageurl, 
	impactorid, 
	primarycausetypeid, secondarycausetypeid)
	VALUES ((select id from charity where name like 'Turkey DAO'), 'Support To Life', 
		'GgVMLWkTa2RCfyYAvuWvJKtK4br328hsM9ZTuvYTh39V',
		'Support to Life is an independent humanitarian organization founded with the principle aim of helping disaster affected communities meet their basic needs and rights.', 
		'1. Phase 1, 2. Phase 2, 3. Phase 3', 
		50000.0, 15000.0, 1,
		null, null, null, null, null, 
		'https://turkiyereliefdao.org/icons/organizations/support-to-life.jpg', 
		(select id from impactor where name like 'Facebook'),
		(select id from causetype where name like 'disaster relief'), (select id from causetype where name like 'social'));


-- UNICEF


INSERT INTO public.project(
	charityid, name, 
	wallet,
	description, 
	milestones, 
	financialgoal, totaldonated, totalbackers,
	website, facebook, discord, twitter, instagram,
	imageurl, 
	impactorid, 
	primarycausetypeid, secondarycausetypeid)
	VALUES ((select id from charity where name like 'United Nations Children''s Fund (UNICEF)'), 'HOW ARE YOU? REALLY.', 
		null,
		'A UNICEF campaign aimed at raising awareness of the importance of mental health among young people.',
		'1. Phase 1, 2. Phase 2, 3. Phase 3', 
		100000, 30100, 3,
		'https://donacije.unicef.rs/en/campaign/how-are-you-really', null, null, null, null, 
		'https://www.unicef.org/globalinsight/sites/unicef.org.globalinsight/files/styles/crop_thumbnail/public/UNICEF-Global-Insight-policy-guidance-AI-children-draft-2.0-2021-cover.jpg?itok=eZsDXlWJ',
		(select id from impactor where name like 'Decenter'),
		(select id from causetype where name like 'health'), (select id from causetype where name like 'social'));


INSERT INTO public.project(
	charityid, name, 
	wallet,
	description, 
	milestones, 
	financialgoal, totaldonated, totalbackers,
	website, facebook, discord, twitter, instagram,
	imageurl, 
	impactorid, 
	primarycausetypeid, secondarycausetypeid)
	VALUES ((select id from charity where name like 'United Nations Children''s Fund (UNICEF)'), 'AI for children', 
		null,
		'Exploring how to embed child rights in the governing policies of artificial intelligence',
		'1. Phase 1, 2. Phase 2, 3. Phase 3', 
		100000.0, 0, 0,
		'https://www.unicef.org/globalinsight/featured-projects/ai-children', null, null, null, null, 
		null,
		null,
		(select id from causetype where name like 'social'), (select id from causetype where name like 'education'));



-- UNESCO

INSERT INTO public.project(
	charityid, name, 
	wallet,
	description, 
	milestones, 
	financialgoal, totaldonated, totalbackers,
	website, facebook, discord, twitter, instagram,
	imageurl, 
	impactorid, 
	primarycausetypeid, secondarycausetypeid)
	VALUES ((select id from charity where name like 'United Nations Educational, Scientific and Cultural Organization (UNESCO)'), 'Education for All (EFA)', 
		null,
		'This is a global initiative launched by UNESCO in 1990 to ensure that every child, youth, and adult has access to quality education. The initiative has set six goals, including expanding early childhood care and education, achieving universal primary education, promoting gender equality, and improving the quality of education. UNESCO works with governments, civil society organizations, and other stakeholders to achieve these goals and monitor progress towards them.',
		'1. Phase 1, 2. Phase 2, 3. Phase 3', 
		10000000.0, 1000000.0, 0,
		'https://en.unesco.org/gem-report/report-education-all-efa', null, null, null, null, 
		null,
		null,
		(select id from causetype where name like 'education'), (select id from causetype where name like 'social'));

INSERT INTO public.project(
	charityid, name, 
	wallet,
	description, 
	milestones, 
	financialgoal, totaldonated, totalbackers,
	website, facebook, discord, twitter, instagram,
	imageurl, 
	impactorid, 
	primarycausetypeid, secondarycausetypeid)
	VALUES ((select id from charity where name like 'United Nations Educational, Scientific and Cultural Organization (UNESCO)'), 'Intergovernmental Oceanographic Commission of UNESCO (IOC-UNESCO)', 
		null,
		'The Intergovernmental Oceanographic Commission of UNESCO (IOC) is the United Nations body responsible for supporting global ocean science and services. The IOC enables its 150 Member States to work together to protect the health of our shared ocean by coordinating programmes in areas such as ocean observations, tsunami warnings and marine spatial planning. Since it was established in 1960, the IOC has provided a focus for all other United Nations bodies that are working to understand and improve the management of our oceans, coasts and marine ecosystems. Today, the IOC is supporting all its Member States to build their scientific and institutional capacity in order to achieve the global goals including the UN Agenda 2030 and its Sustainable Development Goals, the Paris Agreement on Climate Change and the Sendai Framework on Disaster Risk Reduction.',
		'1. Phase 1, 2. Phase 2, 3. Phase 3', 
		5000000.0, 1000000.0, 0,
		'https://ioc.unesco.org/node/2', null, null, null, null, 
		'https://oceanexpert.org/uploads/institutes/6860/instituteLogo.jpg',
		null,
		(select id from causetype where name like 'environment'), (select id from causetype where name like 'health'));


