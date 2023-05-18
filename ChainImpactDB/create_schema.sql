
DROP TABLE IF EXISTS Donation;

DROP TABLE IF EXISTS Transaction;

DROP TABLE IF EXISTS Milestone;

DROP TABLE IF EXISTS Project;

DROP TABLE IF EXISTS Charity;

DROP TABLE IF EXISTS NFTOwner;

DROP TABLE IF EXISTS Impactor;

DROP TABLE IF EXISTS NFTType;

DROP TABLE IF EXISTS CauseType;

CREATE TABLE CauseType
( 
	Id                   serial  NOT NULL ,
	Name                 varchar(100)  NOT NULL ,
	CONSTRAINT XPKCauseType PRIMARY KEY (Id)
);

CREATE TABLE Charity
( 
	Id                   serial  NOT NULL ,
	Name                 varchar(100)  NOT NULL ,
	Wallet               varchar(100)  NULL ,
	Website              varchar(100)  NULL ,
	Facebook             varchar(100)  NULL ,
	Discord              varchar(100)  NULL ,
	Twitter              varchar(100)  NULL ,
	Instagram            varchar(100)  NULL ,
	ImageUrl             varchar(1000)  NULL ,
	Description          varchar(4000)  NULL ,
	CONSTRAINT XPKCharity PRIMARY KEY (Id)
);

CREATE TABLE Donation
( 
	Id                   serial  NOT NULL ,
	Amount               decimal(20,9)  NULL ,
	ProjectId            bigint  NOT NULL ,
	DonatorId            bigint  NOT NULL ,
	CreationDate           bigint  NOT NULL ,
	CONSTRAINT XPKDonation PRIMARY KEY (Id)
);

CREATE TABLE Impactor
( 
	Id                   serial  NOT NULL ,
	Wallet               varchar(256)  NOT NULL ,
	Name                 varchar(100)  NULL ,
	Description          varchar(4000)  NULL ,
	Facebook             varchar(100)  NULL ,
	Twitter              varchar(100)  NULL ,
	Instagram            varchar(100)  NULL ,
	Website              varchar(100)  NULL ,
	Discord              varchar(100)  NULL ,
	Role                 integer  NULL ,
	Type                 integer  NULL ,
	ImageUrl             varchar(10000)  NULL ,
	CONSTRAINT XPKUser PRIMARY KEY (Id)
);

ALTER TABLE Impactor
	ADD CONSTRAINT XAK1User UNIQUE (Wallet);

CREATE TABLE Milestone
( 
	Id                   serial  NOT NULL ,
	Name                 varchar(256)  NOT NULL ,
	Description          varchar(4000)  NULL ,
	Complete             bigint  NULL ,
	ProjectId            bigint  NOT NULL ,
	OrderNumber          integer  NOT NULL ,
	CONSTRAINT XPKMilestone PRIMARY KEY (Id)
);

CREATE TABLE NFTOwner
( 
	Id                   serial  NOT NULL ,
	NftTypeId            bigint  NOT NULL ,
	ImpactorId           bigint  NOT NULL ,
	CONSTRAINT XPKNFTOwner PRIMARY KEY (Id)
);

CREATE TABLE NFTType
( 
	Id                   serial  NOT NULL ,
	Tier                 integer  NULL ,
	UserType             integer  NULL ,
	ImageUrl             varchar(1000)  NULL ,
	CauseTypeId          bigint  NOT NULL ,
	MinimalDonation      decimal(20,9)  NULL ,
	Symbol               varchar(100)  NULL ,
	Description          varchar(4000)  NULL ,
	CONSTRAINT XPKNFTType PRIMARY KEY (Id)
);

CREATE TABLE Project
( 
	Id                   serial  NOT NULL ,
	CharityId            bigint  NOT NULL ,
	Name                 varchar(100)  NOT NULL ,
	Description          varchar(4000)  NULL ,
	FinancialGoal        decimal(20,9)  NOT NULL ,
	TotalDonated         decimal(20,9)  NOT NULL ,
	Website              varchar(100)  NULL ,
	Facebook             varchar(100)  NULL ,
	Discord              varchar(100)  NULL ,
	Twitter              varchar(100)  NULL ,
	Instagram            varchar(100)  NULL ,
	ImageUrl             varchar(1000)  NULL ,
	ImpactorId           bigint  NULL ,
	PrimaryCauseTypeId   bigint  NOT NULL ,
	SecondaryCauseTypeId bigint  NOT NULL ,
	Wallet               varchar(256)  NULL ,
	TotalBackers         integer  NOT NULL ,
	CONSTRAINT XPKProject PRIMARY KEY (Id)
);

CREATE TABLE Transaction
( 
	Id                   serial  NOT NULL ,
	BlockchainAddress    varchar(256)  NOT NULL ,
	Sender               varchar(256)  NOT NULL ,
	Receiver             varchar(256)  NOT NULL ,
	Amount               decimal(20,9)  NULL ,
	ProjectId            bigint  NOT NULL ,
	DonatorId            bigint  NOT NULL ,
	Type                 integer  NOT NULL ,
	MilestoneId          bigint  NULL ,
	CreationDate         bigint  NOT NULL ,
	CONSTRAINT XPKTransaction PRIMARY KEY (Id)
);


ALTER TABLE Donation
	ADD CONSTRAINT FK_Project_Donation FOREIGN KEY (ProjectId) REFERENCES Project(Id)
		ON UPDATE RESTRICT
		ON DELETE RESTRICT;

ALTER TABLE Donation
	ADD CONSTRAINT FK_User_Donation FOREIGN KEY (DonatorId) REFERENCES Impactor(Id)
		ON UPDATE RESTRICT
		ON DELETE RESTRICT;


ALTER TABLE Milestone
	ADD CONSTRAINT FK_Project_Milestone FOREIGN KEY (ProjectId) REFERENCES Project(Id)
		ON UPDATE RESTRICT
		ON DELETE RESTRICT;


ALTER TABLE NFTOwner
	ADD CONSTRAINT FK_NFTType_NFTOwner FOREIGN KEY (NftTypeId) REFERENCES NFTType(Id)
		ON UPDATE RESTRICT
		ON DELETE RESTRICT;

ALTER TABLE NFTOwner
	ADD CONSTRAINT FK_Impactor_NFTOwner FOREIGN KEY (ImpactorId) REFERENCES Impactor(Id)
		ON UPDATE RESTRICT
		ON DELETE RESTRICT;


ALTER TABLE NFTType
	ADD CONSTRAINT FK_Type_NFTType FOREIGN KEY (CauseTypeId) REFERENCES CauseType(Id)
		ON UPDATE RESTRICT
		ON DELETE RESTRICT;


ALTER TABLE Project
	ADD CONSTRAINT FK_Charity_Project FOREIGN KEY (CharityId) REFERENCES Charity(Id)
		ON UPDATE RESTRICT
		ON DELETE RESTRICT;

ALTER TABLE Project
	ADD CONSTRAINT FK_User_Project FOREIGN KEY (ImpactorId) REFERENCES Impactor(Id)
		ON UPDATE SET NULL
		ON DELETE SET NULL;

ALTER TABLE Project
	ADD CONSTRAINT FK_CauseType_Project_Primary FOREIGN KEY (PrimaryCauseTypeId) REFERENCES CauseType(Id)
		ON UPDATE RESTRICT
		ON DELETE RESTRICT;

ALTER TABLE Project
	ADD CONSTRAINT FK_CauseType_Project_Secondary FOREIGN KEY (SecondaryCauseTypeId) REFERENCES CauseType(Id)
		ON UPDATE RESTRICT
		ON DELETE RESTRICT;


ALTER TABLE Transaction
	ADD CONSTRAINT FK_Project_Transaction FOREIGN KEY (ProjectId) REFERENCES Project(Id)
		ON UPDATE RESTRICT
		ON DELETE RESTRICT;

ALTER TABLE Transaction
	ADD CONSTRAINT FK_Impactor_Transaction FOREIGN KEY (DonatorId) REFERENCES Impactor(Id)
		ON UPDATE RESTRICT
		ON DELETE RESTRICT;

ALTER TABLE Transaction
	ADD CONSTRAINT FK_Milestone_Transaction FOREIGN KEY (MilestoneId) REFERENCES Milestone(Id)
		ON UPDATE SET NULL
		ON DELETE SET NULL;

COMMENT ON COLUMN Impactor.Role IS 'What user can do.
0 - super admin user
1 - simple user';

COMMENT ON COLUMN Impactor.Type IS 'User type:
0 - company
1 - private user';

COMMENT ON COLUMN Milestone.Complete IS 'Timestamp (from 1.1.1970.) of milestone realization';

COMMENT ON TABLE NFTType IS 'There are fixed number of NFTTypes
approximatelly 6 for all differen number of tiers for Tier
size of Type (5) table for CauseTypeId
2 for different impactor types for UserType

There will be approximatelly 6 * 5 * 2 = 60 NFTTypes
 ';

COMMENT ON COLUMN NFTType.Tier IS 'Depends on amonut of donation
0 - maximal tier
...';

COMMENT ON COLUMN NFTType.UserType IS 'Impactor type
0 - company
1 - private user';

COMMENT ON COLUMN NFTType.MinimalDonation IS 'Depends on (tier, usertype) tuple';

COMMENT ON COLUMN Transaction.Type IS 'Type of transaction (who are Sender and Receiver)
0 - Donator pays directly to Charity (there will be 2 transactions, one between Donator and Charity and the other between Donator and ChainImpact)
1 - Donator pays to ChainImpact
2 - ChainImpact pays to OffRamp service
3 - Confirmation of payment from OffRamp service to Charity
4 - Milestone transaction';
