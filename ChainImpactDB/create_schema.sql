
DROP TABLE IF EXISTS Donation;

DROP TABLE IF EXISTS PrivateUser;

DROP TABLE IF EXISTS Transaction;

DROP TABLE IF EXISTS ProjectType;

DROP TABLE IF EXISTS Project;

DROP TABLE IF EXISTS Company;

DROP TABLE IF EXISTS Charity;

DROP TABLE IF EXISTS NftOwner;

DROP TABLE IF EXISTS NFTtype;

DROP TABLE IF EXISTS Type;

DROP TABLE IF EXISTS User;

CREATE TABLE Charity
( 
	Id                   BIGINT  NOT NULL ,
	Wallet               varchar(256)  NOT NULL ,
	Description          varchar(4000)  NULL ,
	Name                 varchar(100)  NOT NULL ,
	Website              varchar(100)  NULL ,
	Facebook             varchar(100)  NULL ,
	Twitter              varchar(100)  NULL ,
	Instagram            varchar(100)  NULL ,
	Discord              varchar(100)  NULL 
);

CREATE UNIQUE INDEX XAK1Charity ON Charity
( 
	Wallet  
);

CREATE TABLE Company
( 
	Id                   varchar(100)  NOT NULL 
);

CREATE TABLE Donation
( 
	Id                   varchar(100)  NOT NULL ,
	ProjectId            BIGINT  NULL ,
	Amount               varchar(100)  NULL ,
	AccountId            varchar(100)  NULL ,
	DonatorId            varchar(100)  NULL 
);

CREATE TABLE NftOwner
( 
	UserId               varchar(100)  NOT NULL ,
	NftId                BIGINT  NOT NULL ,
	Id                   varchar(100)  NOT NULL 
);

CREATE TABLE NFTtype
( 
	Id                   BIGINT  NOT NULL ,
	Tier                 varchar(100)  NULL ,
	UserType             varchar(100)  NULL ,
	PictureLink          varchar(100)  NULL ,
	CauseTypeId          BIGINT  NULL 
);

CREATE TABLE PrivateUser
( 
	Id                   varchar(100)  NOT NULL 
);

CREATE TABLE Project
( 
	Id                   BIGINT  NOT NULL ,
	CharityId            BIGINT  NOT NULL ,
	Name                 varchar(100)  NOT NULL ,
	Description          varchar(4000)  NULL ,
	MilestoneIds         varchar(4000)  NULL ,
	FinancialGoal        decimal(10,3)  NOT NULL ,
	TotalDonated         decimal(10,3)  NOT NULL ,
	ImagePath            varchar(100)  NULL ,
	ImpactorId           varchar(100)  NULL ,
	Website              varchar(100)  NULL ,
	Facebook             varchar(100)  NULL ,
	Twitter              varchar(100)  NULL ,
	Instagram            varchar(100)  NULL ,
	Discord              varchar(100)  NULL 
);

CREATE TABLE ProjectType
( 
	ProjectId            BIGINT  NOT NULL ,
	PrimaryTypeId        BIGINT  NOT NULL ,
	SecondaryTypeId      BIGINT  NOT NULL ,
	Id                   BIGINT  NOT NULL 
);

CREATE TABLE Transaction
( 
	Id                   varchar(100)  NOT NULL ,
	ProjectId            BIGINT  NULL ,
	BlockchainAdr        varchar(100)  NULL ,
	Sender               varchar(100)  NULL ,
	Receiver             varchar(100)  NULL ,
	Amount               varchar(100)  NULL 
);

CREATE TABLE Type
( 
	Id                   BIGINT  NOT NULL ,
	Name                 varchar(20)  NULL 
);

CREATE TABLE User
( 
	Id                   varchar(100)  NOT NULL ,
	Wallet               varchar(100)  NULL ,
	Name                 varchar(100)  NULL ,
	Description          varchar(100)  NULL ,
	Facebook             varchar(100)  NULL ,
	Twitter              varchar(100)  NULL ,
	Instagram            varchar(100)  NULL ,
	Website              varchar(100)  NULL ,
	Discord              varchar(100)  NULL ,
	Role                 varchar(100)  NULL 
);
