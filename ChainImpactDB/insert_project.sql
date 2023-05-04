-- Turkey DAO

INSERT INTO public.project(
	charityid, name, 
	wallet,
	description, 
	financialgoal, totaldonated, totalbackers,
	website, facebook, discord, twitter, instagram,
	imageurl, 
	impactorid, 
	primarycausetypeid, secondarycausetypeid)
	VALUES ((select id from charity where name like 'Turkey DAO'), 'Turkey Earthquake Relief', 
		'qM1bJMbdwqtJGz8R5hQmw86xooCvfkjpnzUXqbJxbTT',
		'Multi-sig crypto relief fund operated by industry leaders to support the people of Türkiye after the disastrous earthquakes that hit the region.', 
		100000.0, 40540.0, 11,
		null, null, null, null, null, 
		'https://www.redcross.org/content/dam/redcross/uncategorized/1/1428x820-earthquake-relief-conduct-search-rescue-efforts.jpg.transform/1288/q82/feature/image.jpeg', 
		(select id from impactor where name like 'RedTech'), 
		(select id from causetype where name like 'disaster relief'), (select id from causetype where name like 'social'));

--TMP CHANGE MonkeDAO->RedTech

-- UNESCO

INSERT INTO public.project(
	charityid, name, 
	wallet,
	description, 
	financialgoal, totaldonated, totalbackers,
	website, facebook, discord, twitter, instagram,
	imageurl, 
	impactorid, 
	primarycausetypeid, secondarycausetypeid)
	VALUES ((select id from charity where name like 'UNESCO'), 'Education for All (EFA)', 
		null,
		'This is a global initiative launched by UNESCO in 1990 to ensure that every child, youth, and adult has access to quality education. The initiative has set six goals, including expanding early childhood care and education, achieving universal primary education, promoting gender equality, and improving the quality of education. UNESCO works with governments, civil society organizations, and other stakeholders to achieve these goals and monitor progress towards them.',
		10000000.0, 2540002.0, 256,
		null, null, null, null, null, 
		'https://assets.weforum.org/article/image/large_QzWxty3lUv2ITHZBG5TEyu0QTafPdnTFu1Nwq8f3M7A.jpg',
		(select id from impactor where name like 'SolanaU'),
		(select id from causetype where name like 'education'), (select id from causetype where name like 'social'));


-- -- NOT DONATED
INSERT INTO public.project(
	charityid, name, 
	wallet,
	description, 
	financialgoal, totaldonated, totalbackers,
	website, facebook, discord, twitter, instagram,
	imageurl, 
	impactorid, 
	primarycausetypeid, secondarycausetypeid)
	VALUES ((select id from charity where name like 'UNESCO'), 'Innovative Sustainable Environment Education', 
		null,
		'Environmental education requires a close cooperation of all segments of society. Based on this belief, the ISEE project team is building cooperation among students, teachers and families around carbon footprint awareness.',
		500000.0, 0, 0,
		'https://ioc.unesco.org/node/2', null, null, null, null, 
		'https://cdn.pixabay.com/photo/2014/04/17/23/26/environmental-protection-326923_1280.jpg',
		null,
		(select id from causetype where name like 'environment'), (select id from causetype where name like 'education'));



-- Novak Djokovic Foundation

INSERT INTO public.project(
	charityid, name, 
	wallet,
	description, 
	financialgoal, totaldonated, totalbackers,
	website, facebook, discord, twitter, instagram,
	imageurl, 
	impactorid, 
	primarycausetypeid, secondarycausetypeid)
	VALUES ((select id from charity where name like 'Novak Djokovic Foundation'), 'Cancer Treatment for Children - St. Jude Children''s Research Hospital', 
		null,
		'Turn todays patients into tomorrows survivors.When you donate to St. Jude, youre joining thousands of other supporters in giving to a cause that making extraordinary impacts in the lives of kids everywhere.',
		100000.0, 70000.0, 1,
		null, null, null, null, null, 
		'https://www.stjude.org/content/sites/www/en_US/home/promotion/hello/charitable-gifts-for-kids/jcr:content/par-2/cnt_row_copy_copy_co/par-1/cnt_column_109669490/par-1/cnt_image.img.1200.high.jpg/1673634254523.jpg',
		(select id from impactor where name like 'UniqueVCS'),
		(select id from causetype where name like 'health'), (select id from causetype where name like 'education'));




-- INSERT INTO public.project(
-- 	charityid, name, 
-- 	wallet,
-- 	description, 
-- 	financialgoal, totaldonated, totalbackers,
-- 	website, facebook, discord, twitter, instagram,
-- 	imageurl, 
-- 	impactorid, 
-- 	primarycausetypeid, secondarycausetypeid)
-- 	VALUES ((select id from charity where name like 'United Nations Children''s Fund (UNICEF)'), 'HOW ARE YOU? REALLY.', 
-- 		null,
-- 		'A UNICEF campaign aimed at raising awareness of the importance of mental health among young people.',
-- 		100000, 30100, 3,
-- 		'https://donacije.unicef.rs/en/campaign/how-are-you-really', null, null, null, null, 
-- 		'https://www.unicef.org/globalinsight/sites/unicef.org.globalinsight/files/styles/crop_thumbnail/public/UNICEF-Global-Insight-policy-guidance-AI-children-draft-2.0-2021-cover.jpg?itok=eZsDXlWJ',
-- 		(select id from impactor where name like 'Decenter'),
-- 		(select id from causetype where name like 'health'), (select id from causetype where name like 'social'));

-- INSERT INTO public.project(
-- 	charityid, name, 
-- 	wallet,
-- 	description, 
-- 	financialgoal, totaldonated, totalbackers,
-- 	website, facebook, discord, twitter, instagram,
-- 	imageurl, 
-- 	impactorid, 
-- 	primarycausetypeid, secondarycausetypeid)
-- 	VALUES ((select id from charity where name like 'Turkey DAO'), 'Support To Life', 
-- 		'GgVMLWkTa2RCfyYAvuWvJKtK4br328hsM9ZTuvYTh39V',
-- 		'Support to Life is an independent humanitarian organization founded with the principle aim of helping disaster affected communities meet their basic needs and rights.', 
-- 		50000.0, 15000.0, 1,
-- 		null, null, null, null, null, 
-- 		'https://turkiyereliefdao.org/icons/organizations/support-to-life.jpg', 
-- 		(select id from impactor where name like 'Facebook'),
-- 		(select id from causetype where name like 'disaster relief'), (select id from causetype where name like 'social'));
