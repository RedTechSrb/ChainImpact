
DROP TABLE IF EXISTS ProjectType;

DROP TABLE IF EXISTS Type;

DROP TABLE IF EXISTS Donation;

DROP TABLE IF EXISTS Project;

DROP TABLE IF EXISTS User;

DROP TABLE IF EXISTS Charity;

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
	AccountId            varchar(256)  NULL ,
	ProjectId            serial  NOT NULL ,
	DonatorId            serial  NOT NULL ,
	CONSTRAINT XPKDonation PRIMARY KEY (Id)
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

CREATE TABLE Type
( 
	Id                   serial  NOT NULL ,
	Name                 varchar(100)  NOT NULL ,
	CONSTRAINT XPKType PRIMARY KEY (Id)
);

CREATE TABLE User
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

ALTER TABLE User
	ADD CONSTRAINT XAK1User UNIQUE (Wallet);


ALTER TABLE Donation
	ADD CONSTRAINT FK_Project_Donation FOREIGN KEY (ProjectId) REFERENCES Project(Id)
		ON UPDATE RESTRICT
		ON DELETE RESTRICT;

ALTER TABLE Donation
	ADD CONSTRAINT FK_User_Donation FOREIGN KEY (DonatorId) REFERENCES User(Id)
		ON UPDATE RESTRICT
		ON DELETE RESTRICT;


ALTER TABLE Project
	ADD CONSTRAINT FK_Charity_Project FOREIGN KEY (CharityId) REFERENCES Charity(Id)
		ON UPDATE RESTRICT
		ON DELETE RESTRICT;

ALTER TABLE Project
	ADD CONSTRAINT FK_User_Project FOREIGN KEY (ImpactorId) REFERENCES User(Id)
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

COMMENT ON COLUMN User.Role IS 'What user can do.
0 - super admin user
1 - simple user';

COMMENT ON COLUMN User.Type IS 'User type:
0 - company
1 - private user';
