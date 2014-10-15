-- MySQL dump 10.13  Distrib 5.5.38, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: thesis_database
-- ------------------------------------------------------
-- Server version	5.5.38-0ubuntu0.14.04.1

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
-- Table structure for table `demographics`
--

DROP TABLE IF EXISTS `demographics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `demographics` (
  `user_id` char(36) NOT NULL,
  `summoner_name` varchar(500) DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  `birth_year` int(11) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `region` varchar(10) DEFAULT NULL,
  `position` varchar(10) DEFAULT NULL,
  `role` varchar(10) DEFAULT NULL,
  `plays_ai` char(10) DEFAULT NULL,
  `plays_normal_pvp` char(10) DEFAULT NULL,
  `plays_non_team` char(10) DEFAULT NULL,
  `plays_3v3` char(10) DEFAULT NULL,
  `plays_5v5` char(10) DEFAULT NULL,
  `non_team_queue` varchar(10) DEFAULT NULL,
  `non_team_division` int(11) DEFAULT NULL,
  `non_team_tier` int(11) DEFAULT NULL,
  `team_3v3` varchar(500) DEFAULT NULL,
  `division_3v3` int(11) DEFAULT NULL,
  `tier_3v3` int(11) DEFAULT NULL,
  `team_5v5` varchar(500) DEFAULT NULL,
  `division_5v5` int(11) DEFAULT NULL,
  `tier_5v5` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `fk_demographics_1` FOREIGN KEY (`user_id`) REFERENCES `participants` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `demographics`
--

LOCK TABLES `demographics` WRITE;
/*!40000 ALTER TABLE `demographics` DISABLE KEYS */;
/*!40000 ALTER TABLE `demographics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `finish`
--

DROP TABLE IF EXISTS `finish`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `finish` (
  `user_id` char(36) NOT NULL,
  `mail` varchar(100) DEFAULT NULL,
  `message` text,
  `wants_results` varchar(4) DEFAULT NULL,
  `thank_you` varchar(4) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  CONSTRAINT `fk_finish_1` FOREIGN KEY (`user_id`) REFERENCES `participants` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `finish`
--

LOCK TABLES `finish` WRITE;
/*!40000 ALTER TABLE `finish` DISABLE KEYS */;
/*!40000 ALTER TABLE `finish` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flanker`
--

DROP TABLE IF EXISTS `flanker`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `flanker` (
  `user_id` char(36) NOT NULL,
  `trial_index` int(11) NOT NULL,
  `rt` int(11) DEFAULT NULL,
  `type` varchar(20) DEFAULT NULL,
  `direction` varchar(20) DEFAULT NULL,
  `correct` tinyint(4) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_flanker_1_idx` (`user_id`),
  CONSTRAINT `participantUserId` FOREIGN KEY (`user_id`) REFERENCES `participants` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flanker`
--

LOCK TABLES `flanker` WRITE;
/*!40000 ALTER TABLE `flanker` DISABLE KEYS */;
/*!40000 ALTER TABLE `flanker` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `london_tower`
--

DROP TABLE IF EXISTS `london_tower`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `london_tower` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` char(36) NOT NULL,
  `trial_index` int(11) NOT NULL,
  `rt` int(11) DEFAULT NULL,
  `moves` int(11) DEFAULT NULL,
  `missed_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_london_tower_1_idx` (`user_id`),
  CONSTRAINT `fk_london_tower_1` FOREIGN KEY (`user_id`) REFERENCES `participants` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `london_tower`
--

LOCK TABLES `london_tower` WRITE;
/*!40000 ALTER TABLE `london_tower` DISABLE KEYS */;
/*!40000 ALTER TABLE `london_tower` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mental_rotation`
--

DROP TABLE IF EXISTS `mental_rotation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mental_rotation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` char(36) NOT NULL,
  `trial_index` int(11) NOT NULL,
  `rt` int(11) DEFAULT NULL,
  `item` char(1) DEFAULT NULL,
  `type` char(1) DEFAULT NULL,
  `rotation` int(11) DEFAULT NULL,
  `correct` tinyint(4) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ID_UNIQUE` (`id`),
  KEY `fk_mental_rotation_1_idx` (`user_id`),
  CONSTRAINT `fk_mental_rotation_1` FOREIGN KEY (`user_id`) REFERENCES `participants` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mental_rotation`
--

LOCK TABLES `mental_rotation` WRITE;
/*!40000 ALTER TABLE `mental_rotation` DISABLE KEYS */;
/*!40000 ALTER TABLE `mental_rotation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `participants`
--

DROP TABLE IF EXISTS `participants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `participants` (
  `user_id` char(36) NOT NULL,
  `user_agent` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `userId_UNIQUE` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participants`
--

LOCK TABLES `participants` WRITE;
/*!40000 ALTER TABLE `participants` DISABLE KEYS */;
INSERT INTO `participants` VALUES ('034afce1-5913-4de6-85d4-7f0551f0c666','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36'),('0a1b6683-b0f7-444d-b06f-148d0a8f201f','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36'),('3371530f-7d15-4a76-bfec-ca766b4cad73','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36'),('43e07eee-3dc3-4185-b3b2-4df52c2c9ec6','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36'),('6a06c99f-5e14-4615-ae6c-5e14b743f6bf','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36'),('7861deee-ea11-4742-94fe-95bebe1d4161','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36'),('7e6a20d2-0bd5-4c3c-b6bf-eb48ca0cfd26','Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:32.0) Gecko/20100101 Firefox/32.0'),('85f7f233-a99d-4426-923d-0f2f0406591d','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36'),('9d895f13-c2bf-454f-8fe0-27b2df80d581','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36'),('a42d1115-3217-4479-9b34-3b1ab00b8538','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36'),('b1af1560-2cd4-49b2-8491-cd54c80c310d','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36'),('b1bd2e91-ec1f-42f3-8f8b-df27b2fe4b3b','Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:32.0) Gecko/20100101 Firefox/32.0'),('b9520a4f-cfc9-47b1-a5ab-367ea505689c','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36'),('d24df7fb-ce8e-4f05-9e46-34792f5701ee','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36'),('df04132b-516f-4bc6-85f7-2cb4d743f19f','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36'),('df08a0fc-3ca3-4ad0-a98d-71654143411f','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36'),('dfa71c3b-8dcb-4dd4-9500-b1f14dad1e75','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36'),('dfacd057-1411-46a0-a8f0-2eb20e0bdc0d','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36'),('e09b390d-26c3-48df-981a-427a3dee5b03','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36'),('e27175de-d926-40cd-9367-c7fe07b23bb8','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36'),('ee0b7039-35f0-4d50-973a-bd75958cbfba','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36'),('ef283f94-dc40-4060-8a5c-b4865f744058','Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:32.0) Gecko/20100101 Firefox/32.0'),('f49742e7-9a7b-4e15-87f7-13bea7354e4b','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36'),('fac73997-db4f-4de1-9614-66d92b8a0332','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36'),('fd6987b6-ae45-4670-b1a8-a1cf911f0301','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36');
/*!40000 ALTER TABLE `participants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `spatial_span`
--

DROP TABLE IF EXISTS `spatial_span`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spatial_span` (
  `user_id` char(36) NOT NULL,
  `max_correct` int(11) DEFAULT NULL,
  `trials_run` int(11) DEFAULT NULL,
  `max_length` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  CONSTRAINT `fk_spatial_span_1` FOREIGN KEY (`user_id`) REFERENCES `participants` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `spatial_span`
--

LOCK TABLES `spatial_span` WRITE;
/*!40000 ALTER TABLE `spatial_span` DISABLE KEYS */;
/*!40000 ALTER TABLE `spatial_span` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `surveys`
--

DROP TABLE IF EXISTS `surveys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `surveys` (
  `user_id` char(36) NOT NULL,
  `GEQ_rt1` int(11) DEFAULT NULL,
  `GEQ_rt2` int(11) DEFAULT NULL,
  `GEQ1` int(11) DEFAULT NULL,
  `GEQ2` int(11) DEFAULT NULL,
  `GEQ3` int(11) DEFAULT NULL,
  `GEQ4` int(11) DEFAULT NULL,
  `GEQ5` int(11) DEFAULT NULL,
  `GEQ6` int(11) DEFAULT NULL,
  `GEQ7` int(11) DEFAULT NULL,
  `GEQ8` int(11) DEFAULT NULL,
  `GEQ9` int(11) DEFAULT NULL,
  `GEQ10` int(11) DEFAULT NULL,
  `GEQ11` int(11) DEFAULT NULL,
  `GEQ12` int(11) DEFAULT NULL,
  `GEQ13` int(11) DEFAULT NULL,
  `GEQ14` int(11) DEFAULT NULL,
  `GEQ15` int(11) DEFAULT NULL,
  `GEQ16` int(11) DEFAULT NULL,
  `GEQ17` int(11) DEFAULT NULL,
  `GEQ18` int(11) DEFAULT NULL,
  `TLX_rt` int(11) DEFAULT NULL,
  `mental_demand` int(11) DEFAULT NULL,
  `physical_demand` int(11) DEFAULT NULL,
  `temporal_demand` int(11) DEFAULT NULL,
  `performance` int(11) DEFAULT NULL,
  `effort` int(11) DEFAULT NULL,
  `frustration` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  CONSTRAINT `fk_surveys_1` FOREIGN KEY (`user_id`) REFERENCES `participants` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `surveys`
--

LOCK TABLES `surveys` WRITE;
/*!40000 ALTER TABLE `surveys` DISABLE KEYS */;
/*!40000 ALTER TABLE `surveys` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-10-15 14:51:11
