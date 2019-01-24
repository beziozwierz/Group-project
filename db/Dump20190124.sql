-- MySQL dump 10.13  Distrib 5.7.24, for Linux (x86_64)
--
-- Host: localhost    Database: groupproject
-- ------------------------------------------------------
-- Server version	5.7.24-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `html`
--

DROP TABLE IF EXISTS `html`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `html` (
  `html` text,
  `project_id` int(11) NOT NULL,
  PRIMARY KEY (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `html`
--

LOCK TABLES `html` WRITE;
/*!40000 ALTER TABLE `html` DISABLE KEYS */;
INSERT INTO `html` VALUES ('{\"inner\":[{\"inner\":[{\"inner\":[],\"id\":[],\"class\":[],\"style\":[],\"name\":\"div\",\"height\":\"50px\",\"width\":90,\"float\":null,\"type\":\"container\"}],\"id\":[],\"class\":[],\"style\":[],\"name\":\"MainModel\",\"height\":\"DEFAULT\",\"width\":\"100\",\"float\":null,\"type\":\"container\"}],\"id\":[],\"class\":[],\"style\":[],\"name\":\"root\",\"height\":0,\"width\":0,\"float\":null,\"type\":\"container\"}',1),('{\"inner\":[{\"inner\":[{\"inner\":[{\"inner\":[{\"inner\":[],\"id\":[],\"class\":[],\"style\":[],\"name\":\"table\",\"height\":\"50px\",\"width\":90,\"float\":null,\"type\":\"container\"}],\"id\":[],\"class\":[],\"style\":[],\"name\":\"span\",\"height\":\"DEFAULT\",\"width\":90,\"float\":null,\"type\":\"text\"}],\"id\":[],\"class\":[],\"style\":[],\"name\":\"div\",\"height\":\"DEFAULT\",\"width\":90,\"float\":null,\"type\":\"container\"},{\"inner\":[{\"inner\":[],\"id\":[],\"class\":[],\"style\":[],\"name\":\"ol\",\"height\":\"50px\",\"width\":90,\"float\":null,\"type\":\"container\"}],\"id\":[],\"class\":[],\"style\":[],\"name\":\"span\",\"height\":\"DEFAULT\",\"width\":90,\"float\":null,\"type\":\"text\"},{\"inner\":[],\"id\":[],\"class\":[],\"style\":[],\"name\":\"td\",\"height\":\"50px\",\"width\":90,\"float\":null,\"type\":\"container\"}],\"id\":[],\"class\":[],\"style\":[],\"name\":\"MainModel\",\"height\":\"DEFAULT\",\"width\":\"100\",\"float\":null,\"type\":\"container\"}],\"id\":[],\"class\":[],\"style\":[],\"name\":\"root\",\"height\":0,\"width\":0,\"float\":null,\"type\":\"container\"}',2),('{\"inner\":[{\"inner\":[{\"inner\":[{\"inner\":[{\"inner\":[],\"id\":[],\"class\":[],\"style\":[],\"name\":\"table\",\"height\":\"50px\",\"width\":90,\"float\":null,\"type\":\"container\"}],\"id\":[],\"class\":[],\"style\":[],\"name\":\"span\",\"height\":\"DEFAULT\",\"width\":90,\"float\":null,\"type\":\"text\"}],\"id\":[],\"class\":[],\"style\":[],\"name\":\"div\",\"height\":\"DEFAULT\",\"width\":90,\"float\":null,\"type\":\"container\"},{\"inner\":[{\"inner\":[],\"id\":[],\"class\":[],\"style\":[],\"name\":\"ol\",\"height\":\"50px\",\"width\":90,\"float\":null,\"type\":\"container\"}],\"id\":[],\"class\":[],\"style\":[],\"name\":\"span\",\"height\":\"DEFAULT\",\"width\":90,\"float\":null,\"type\":\"text\"},{\"inner\":[{\"inner\":[],\"id\":[],\"class\":[],\"style\":[],\"name\":\"img\",\"height\":\"50px\",\"width\":90,\"float\":null,\"type\":\"container\"}],\"id\":[],\"class\":[],\"style\":[],\"name\":\"td\",\"height\":\"DEFAULT\",\"width\":90,\"float\":null,\"type\":\"container\"}],\"id\":[],\"class\":[],\"style\":[],\"name\":\"MainModel\",\"height\":\"DEFAULT\",\"width\":\"100\",\"float\":null,\"type\":\"container\"}],\"id\":[],\"class\":[],\"style\":[],\"name\":\"root\",\"height\":0,\"width\":0,\"float\":null,\"type\":\"container\"}',3),('{\"inner\":[{\"inner\":[{\"inner\":[{\"inner\":[{\"inner\":[],\"id\":[],\"class\":[],\"style\":[],\"name\":\"table\",\"height\":\"50px\",\"width\":90,\"float\":null,\"type\":\"container\"},{\"inner\":[],\"id\":[],\"class\":[],\"style\":[],\"name\":\"table\",\"height\":\"50px\",\"width\":90,\"float\":null,\"type\":\"container\"}],\"id\":[],\"class\":[],\"style\":[],\"name\":\"span\",\"height\":\"DEFAULT\",\"width\":90,\"float\":null,\"type\":\"text\"}],\"id\":[],\"class\":[],\"style\":[],\"name\":\"div\",\"height\":\"DEFAULT\",\"width\":90,\"float\":null,\"type\":\"container\"},{\"inner\":[{\"inner\":[{\"inner\":[],\"id\":[],\"class\":[],\"style\":[],\"name\":\"span\",\"height\":\"50px\",\"width\":90,\"float\":null,\"type\":\"text\"}],\"id\":[],\"class\":[],\"style\":[],\"name\":\"ol\",\"height\":\"DEFAULT\",\"width\":90,\"float\":null,\"type\":\"container\"}],\"id\":[],\"class\":[],\"style\":[],\"name\":\"span\",\"height\":\"DEFAULT\",\"width\":90,\"float\":null,\"type\":\"text\"},{\"inner\":[{\"inner\":[],\"id\":[],\"class\":[],\"style\":[],\"name\":\"img\",\"height\":\"50px\",\"width\":90,\"float\":null,\"type\":\"container\"}],\"id\":[],\"class\":[],\"style\":[],\"name\":\"td\",\"height\":\"DEFAULT\",\"width\":90,\"float\":null,\"type\":\"container\"}],\"id\":[],\"class\":[],\"style\":[],\"name\":\"MainModel\",\"height\":\"DEFAULT\",\"width\":\"100\",\"float\":null,\"type\":\"container\"}],\"id\":[],\"class\":[],\"style\":[],\"name\":\"root\",\"height\":0,\"width\":0,\"float\":null,\"type\":\"container\"}',4);
/*!40000 ALTER TABLE `html` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_projects`
--

DROP TABLE IF EXISTS `user_projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_projects` (
  `login` varchar(45) DEFAULT NULL,
  `project_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`project_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_projects`
--

LOCK TABLES `user_projects` WRITE;
/*!40000 ALTER TABLE `user_projects` DISABLE KEYS */;
INSERT INTO `user_projects` VALUES ('root',1,'sadasdasdasd'),('root',2,'Malymon'),('root',3,'Malymon 2'),('root',4,'malymon 3');
/*!40000 ALTER TABLE `user_projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `login` varchar(45) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'root','root','root@root.pl','root','63a9f0ea7bb98050796b649e85481845'),(3,'Dima','Malymon','dima.malymon@mail.com','dima','cc0df31953178b65d0fe6b40360d0e0e'),(4,'Dima','Malymon','asdasdasd@fsdfs.pl','dima1','cc0df31953178b65d0fe6b40360d0e0e'),(5,'dimasta','dimasta','dimasta@dimasta.com','dimasta','aa324847708e030205efb8632b08e96b'),(6,'asd','asdas','dimasta@asd.sasd','aaaa','74b87337454200d4d33f80c4663dc5e5'),(7,'sdfss','sdf','dimasta@dimasta.com','sdfsdf','b59c67bf196a4758191e42f76670ceba'),(8,'aaa','aaa','aa@aaa.aa','aaa','47bce5c74f589f4867dbd57e9ca9f808');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-01-24  1:52:54
