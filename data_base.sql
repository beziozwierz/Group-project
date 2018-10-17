drop database if exists baza_danych;
create database baza_danych;
use baza_danych;



drop table if exists `users`;
create table `users` (
`ID` int(11) not null auto_increment,
`Name` char(35) not null default '',
primary key(`ID`)
)engine=InnoDB;

insert into `users` values (1,'Dima');


drop table if exists `projects`;
create table `projects` (
`ID` int(11) not null auto_increment,
`Name` char(35) not null default '',
primary key(`ID`)
)engine=InnoDB;

drop table if exists `users_projects`;
create table`users_projects`(
`Project ID` int(11) not null,
`User ID` int(11) not null
)engine=InnoDB;