CREATE DATABASE  IF NOT EXISTS `snapsell` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `snapsell`;
-- MySQL dump 10.13  Distrib 8.0.18, for macos10.14 (x86_64)
--
-- Host: localhost    Database: snapsell
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `dislike`
--

DROP TABLE IF EXISTS `dislike`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dislike` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_disliker_id` int(11) NOT NULL,
  `fk_listing_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_listing_id_dislike_idx` (`fk_listing_id`),
  KEY `fk_disliker_id_idx` (`fk_disliker_id`),
  CONSTRAINT `fk_disliker_id` FOREIGN KEY (`fk_disliker_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_listing_id_dislike` FOREIGN KEY (`fk_listing_id`) REFERENCES `listings` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dislike`
--

LOCK TABLES `dislike` WRITE;
/*!40000 ALTER TABLE `dislike` DISABLE KEYS */;
INSERT INTO `dislike` VALUES (1,1,2,'2020-01-04 07:12:59'),(2,2,2,'2020-01-04 07:12:59'),(3,3,1,'2020-01-04 07:12:59');
/*!40000 ALTER TABLE `dislike` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_liker_id` int(11) NOT NULL,
  `fk_listing_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `liker_id_idx` (`fk_liker_id`),
  KEY `liker_list_idx` (`fk_listing_id`),
  CONSTRAINT `liker_id` FOREIGN KEY (`fk_liker_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `liker_list` FOREIGN KEY (`fk_listing_id`) REFERENCES `listings` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (1,1,4,'2019-12-28 03:49:57'),(2,2,1,'2019-12-28 03:49:57'),(3,3,2,'2019-12-28 03:49:57'),(8,5,6,'2020-01-04 05:43:18'),(9,3,6,'2020-01-04 06:01:44');
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `listings`
--

DROP TABLE IF EXISTS `listings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `listings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `description` varchar(45) NOT NULL,
  `price` int(11) NOT NULL,
  `fk_user_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_user_id_idx` (`fk_user_id`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`fk_user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listings`
--

LOCK TABLES `listings` WRITE;
/*!40000 ALTER TABLE `listings` DISABLE KEYS */;
INSERT INTO `listings` VALUES (1,'Math Texbook','In good condition',10,1,'2019-12-19 04:21:51'),(2,'Programming book','In very good conditio, used once',30,2,'2019-12-19 05:52:07'),(4,'HTML book','In good condition',15,1,'2019-12-23 11:56:33'),(6,'Computing Book','Used once',40,13,'2019-12-30 03:20:52'),(7,'Javascript Textbook','In very good condition, rarely use it',60,13,'2020-01-04 03:03:34'),(10,'Accounting Book','Used it once',35,14,'2020-02-07 03:08:57'),(11,'Peach','Used it once',30,13,'2020-02-07 07:24:19'),(12,'SP Shirt','shirt drifit',7,13,'2020-02-07 07:26:00'),(13,'chinese','used once',10,13,'2020-02-07 10:06:16'),(14,'chinese','used once',10,13,'2020-02-07 13:24:23'),(28,'testt','used once',12,13,'2020-02-08 04:46:35'),(29,'8','8',8,13,'2020-02-08 04:49:25'),(30,'Testing','Resting',10,13,'2020-02-08 10:07:43'),(33,'TESTING 4','ONCE',5,15,'2020-02-09 04:52:42'),(36,'testing','testing',5,13,'2020-02-09 13:13:22'),(37,'testing5','Used it once',55,15,'2020-02-09 13:37:34');
/*!40000 ALTER TABLE `listings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `offer`
--

DROP TABLE IF EXISTS `offer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `offer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `offer` int(11) NOT NULL,
  `fk_listing_id` int(11) NOT NULL,
  `fk_offeror_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `offer_fk_listing_id_idx` (`fk_listing_id`),
  KEY `offer_fk_user_id_idx` (`fk_offeror_id`),
  CONSTRAINT `offer_fk_listing_id` FOREIGN KEY (`fk_listing_id`) REFERENCES `listings` (`id`) ON DELETE CASCADE,
  CONSTRAINT `offer_fk_offeror_id` FOREIGN KEY (`fk_offeror_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `offer`
--

LOCK TABLES `offer` WRITE;
/*!40000 ALTER TABLE `offer` DISABLE KEYS */;
INSERT INTO `offer` VALUES (1,5,1,2,'2019-12-19 07:44:39'),(2,25,2,1,'2019-12-19 07:44:55'),(3,50,1,1,'2019-12-28 03:27:30'),(4,50,1,1,'2019-12-28 03:31:15'),(5,20,2,2,'2019-12-30 02:37:56'),(6,100,1,2,'2020-01-03 15:02:14'),(7,28,1,2,'2020-01-03 15:04:08'),(8,55,7,3,'2020-01-04 04:42:20'),(9,55,7,13,'2020-01-04 04:42:57'),(17,52,7,1,'2020-01-04 15:51:30'),(18,30,10,1,'2020-02-08 05:19:15'),(19,25,10,13,'2020-02-08 08:56:49'),(20,5,1,13,'2020-02-08 09:01:28'),(21,10,10,13,'2020-02-09 02:22:46'),(22,20,7,14,'2020-02-09 03:42:48'),(23,10,1,13,'2020-02-09 06:52:58'),(24,10,1,13,'2020-02-09 06:53:07'),(25,6,1,13,'2020-02-09 12:21:00'),(26,15,14,13,'2020-02-09 12:31:58'),(27,8,14,14,'2020-02-09 12:33:57'),(33,100,1,13,'2020-02-09 12:45:47'),(34,12,1,14,'2020-02-09 12:46:19'),(35,25,14,16,'2020-02-09 12:47:31'),(40,30,14,16,'2020-02-09 12:48:49'),(42,6,1,13,'2020-02-09 12:51:19'),(45,20,14,13,'2020-02-09 12:54:20'),(48,5,1,15,'2020-02-09 13:00:28');
/*!40000 ALTER TABLE `offer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phonenum` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `phonenum_UNIQUE` (`phonenum`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'sg','sg@gmail.com','288',123456789,'2019-12-18 13:30:33'),(2,'kc','kc@gmail.com','789',55558888,'2019-12-18 14:15:49'),(3,'zijie','zijie@gmail.com','123',91234567,'2019-12-19 03:19:30'),(4,'ysh','ysh@gmail.com','888',99995555,'2019-12-19 05:54:29'),(5,'sgysh','sgysh@gmail.com','111',22224444,'2019-12-19 08:43:15'),(11,'wenkai','wenkai@gmail.com','668',22228888,'2020-01-04 02:53:32'),(12,'testing1','test1@test.com','t1',1111,'2020-02-01 06:53:16'),(13,'test1','t1@gmail.com','$2b$10$kTsGesAi6mKgK42OCn/Heu9f1DyLuxcEDl7hAk130/lwfWTtwAYJq',0,'2020-02-03 10:13:00'),(14,'test2','t2@gmail.com','$2b$10$dfK5D6KluHS8RdikNxoMtuKs811nM.OACcjLIi98OrldQwcZ35lTu',98552241,'2020-02-06 14:01:07'),(15,'test3','t3@gmail.com','$2b$10$pQfUTfWhL6Uu0zaLihoo.OD2v.2CdstdDmejNmW8aa2IG6UIOLm0m',10001000,'2020-02-09 05:15:35'),(16,'test4','t4@gmail.com','$2b$10$hq.35PIb4IfjjDzfZVh.6emxaxzW3fheDHveGu8rf48kI2UqJNd/G',20002000,'2020-02-09 12:43:35');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-02-09 23:17:19
