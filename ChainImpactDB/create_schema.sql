DROP TABLE IF EXISTS public."Project";
DROP TABLE IF EXISTS public."Charity";

CREATE TABLE public."Project"
(
    "Id" serial NOT NULL,
    "Name" varchar(100) NOT NULL,
    PRIMARY KEY ("Id")
);