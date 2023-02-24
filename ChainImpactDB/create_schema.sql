
DROP TABLE IF EXISTS ProjectType;

DROP TABLE IF EXISTS Donation;

DROP TABLE IF EXISTS Transaction;

DROP TABLE IF EXISTS Project;

DROP TABLE IF EXISTS Charity;

DROP TABLE IF EXISTS NFTOwner;

DROP TABLE IF EXISTS Impactor;

DROP TABLE IF EXISTS NFTType;

DROP TABLE IF EXISTS Type;

CREATE TABLE Charity
( 
	Id                   serial  NOT NULL ,
	Name                 varchar(100)  NOT NULL ,
	Wallet               varchar(100)  NOT NULL ,
	Website              varchar(100)  NULL ,
	Facebook             varchar(100)  NULL ,
	Discord              varchar(100)  NULL ,
	Twitter              varchar(100)  NULL ,
	Instagram            varchar(100)  NULL ,
	ImageUrl             varchar(100)  NULL ,
	Description          varchar(4000)  NULL ,
	CONSTRAINT XPKCharity PRIMARY KEY (Id)
);

ALTER TABLE Charity
	ADD CONSTRAINT XAK1Charity UNIQUE (Wallet);

CREATE TABLE Donation
( 
	Id                   serial  NOT NULL ,
	Amount               decimal(20,9)  NULL ,
	ProjectId            serial  NOT NULL ,
	DonatorId            serial  NOT NULL ,
	CONSTRAINT XPKDonation PRIMARY KEY (Id)
);

CREATE TABLE Impactor
( 
	Id                   serial  NOT NULL ,
	Wallet               varchar(256)  NOT NULL ,
	Name                 varchar(100)  NOT NULL ,
	Description          varchar(4000)  NULL ,
	Facebook             varchar(100)  NULL ,
	Twitter              varchar(100)  NULL ,
	Instagram            varchar(100)  NULL ,
	Website              varchar(100)  NULL ,
	Discord              varchar(100)  NULL ,
	Role                 integer  NULL ,
	Type                 integer  NULL ,
	CONSTRAINT XPKUser PRIMARY KEY (Id)
);

ALTER TABLE Impactor
	ADD CONSTRAINT XAK1User UNIQUE (Wallet);

CREATE TABLE NFTOwner
( 
	Id                   char(18)  NOT NULL ,
	NftTypeId            serial  NOT NULL ,
	ImpactorId           serial  NOT NULL ,
	CONSTRAINT XPKNFTOwner PRIMARY KEY (Id)
);

CREATE TABLE NFTType
( 
	Id                   serial  NOT NULL ,
	Tier                 integer  NULL ,
	UserType             integer  NULL ,
	ImageUrl             varchar(100)  NULL ,
	CauseTypeId          serial  NOT NULL ,
	MinimalDonation      decimal(20,9)  NULL ,
	CONSTRAINT XPKNFTType PRIMARY KEY (Id)
);

CREATE TABLE Project
( 
	Id                   serial  NOT NULL ,
	CharityId            serial  NOT NULL ,
	Name                 varchar(100)  NOT NULL ,
	Description          varchar(4000)  NULL ,
	Milestones           varchar(20)  NULL ,
	FinantialGoal        decimal(20,9)  NOT NULL ,
	TotalDonated         decimal(20,9)  NOT NULL ,
	Website              varchar(100)  NULL ,
	Facebook             varchar(100)  NULL ,
	Discord              varchar(100)  NULL ,
	Twitter              varchar(100)  NULL ,
	Instagram            varchar(100)  NULL ,
	ImageUrl             varchar(100)  NULL ,
	ImpactorId           serial  NOT NULL ,
	CONSTRAINT XPKProject PRIMARY KEY (Id)
);

CREATE TABLE ProjectType
( 
	Id                   char(18)  NOT NULL ,
	PrimaryTypeId        serial  NOT NULL ,
	SecondaryTypeId      serial  NOT NULL ,
	ProjectId            serial  NOT NULL ,
	CONSTRAINT XPKProjectType PRIMARY KEY (Id)
);

CREATE TABLE Transaction
( 
	Id                   serial  NOT NULL ,
	BlockchainAddress    varchar(256)  NOT NULL ,
	Sender               varchar(256)  NOT NULL ,
	Receiver             varchar(256)  NOT NULL ,
	Amount               decimal(20,9)  NULL ,
	ProjectId            serial  NOT NULL ,
	DonatorId            serial  NOT NULL ,
	Type                 integer  NULL ,
	CONSTRAINT XPKTransaction PRIMARY KEY (Id)
);

ALTER TABLE Transaction
	ADD CONSTRAINT XAK1Transaction UNIQUE (BlockchainAddress);

CREATE TABLE Type
( 
	Id                   serial  NOT NULL ,
	Name                 varchar(100)  NOT NULL ,
	CONSTRAINT XPKType PRIMARY KEY (Id)
);


ALTER TABLE Donation
	ADD CONSTRAINT FK_Project_Donation FOREIGN KEY (ProjectId) REFERENCES Project(Id)
		ON UPDATE RESTRICT
		ON DELETE RESTRICT;

ALTER TABLE Donation
	ADD CONSTRAINT FK_User_Donation FOREIGN KEY (DonatorId) REFERENCES Impactor(Id)
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
	ADD CONSTRAINT FK_Type_NFTType FOREIGN KEY (CauseTypeId) REFERENCES Type(Id)
		ON UPDATE RESTRICT
		ON DELETE RESTRICT;


ALTER TABLE Project
	ADD CONSTRAINT FK_Charity_Project FOREIGN KEY (CharityId) REFERENCES Charity(Id)
		ON UPDATE RESTRICT
		ON DELETE RESTRICT;

ALTER TABLE Project
	ADD CONSTRAINT FK_User_Project FOREIGN KEY (ImpactorId) REFERENCES Impactor(Id)
		ON UPDATE RESTRICT
		ON DELETE RESTRICT;


ALTER TABLE ProjectType
	ADD CONSTRAINT FK_Type_ProjectType_Primary FOREIGN KEY (PrimaryTypeId) REFERENCES Type(Id)
		ON UPDATE RESTRICT
		ON DELETE RESTRICT;

ALTER TABLE ProjectType
	ADD CONSTRAINT FK_Type_ProjectType_Secondary FOREIGN KEY (SecondaryTypeId) REFERENCES Type(Id)
		ON UPDATE RESTRICT
		ON DELETE RESTRICT;

ALTER TABLE ProjectType
	ADD CONSTRAINT FK_Project_ProjectType FOREIGN KEY (ProjectId) REFERENCES Project(Id)
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

COMMENT ON COLUMN Impactor.Role IS 'What user can do.
0 - super admin user
1 - simple user';

COMMENT ON COLUMN Impactor.Type IS 'User type:
0 - company
1 - private user';

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

COMMENT ON COLUMN Transaction.Type IS 'Type of transaction (who are Sender and Receiver)
0 - Donator pays directly to Charity (there will be 2 transactions, one between Donator and Charity and the other between Donator and ChainImpact)
1 - Donator pays to ChainImpact
2 - ChainImpact pays to OffRamp service
3 - confirmation of payment from OffRamp service to Charity';
