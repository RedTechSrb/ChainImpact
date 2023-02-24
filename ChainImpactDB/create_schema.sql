
DROP TABLE IF EXISTS Project;

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

CREATE TABLE Project
( 
	Id                   serial  NOT NULL ,
	CharityId            serial  NOT NULL ,
	Name                 varchar(100)  NOT NULL ,
	Description          varchar(4000)  NULL ,
	Milestones           varchar(20)  NULL ,
	FinantialGoal        decimal(10,3)  NOT NULL ,
	TotalDonated         decimal(10,3)  NOT NULL ,
	Website              varchar(100)  NULL ,
	Facebook             varchar(100)  NULL ,
	Discord              varchar(100)  NULL ,
	Twitter              varchar(100)  NULL ,
	Instagram            varchar(100)  NULL ,
	ImageUrl             varchar(100)  NULL ,
	CONSTRAINT XPKProject PRIMARY KEY (Id)
);


ALTER TABLE Project
	ADD CONSTRAINT FK_Charity_Project FOREIGN KEY (CharityId) REFERENCES Charity(Id)
		ON UPDATE RESTRICT
		ON DELETE RESTRICT;
