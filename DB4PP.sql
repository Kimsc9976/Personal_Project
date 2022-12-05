--
-- Table structure for table `author`
--


CREATE TABLE `Person` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `profile` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idx`)
);

--
-- Dumping data for table `author`
--

INSERT INTO `author` VALUES (1,'김수찬','developer');
INSERT INTO `author` VALUES (2,'가나다','들러리');

--
-- Table structure for table `inform`
--

CREATE TABLE `inform` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `ID` varchar(30) NOT NULL,
  `Password` text NOT NULL,
  `Email` text NOT NULL,
  `Phone_Head` TINYINT NOT NULL,
  `Phone_Mid` SMALLINT NOT NULL,
  `Phone_Tail` SMALLINT NOT NULL,
  `created` datetime NOT NULL,
  `Peronsal_idx` int(11) NOT NULL,
  PRIMARY KEY (`idx`)
);

--
-- Dumping data for table `inform`
--

INSERT INTO `inform` VALUES (1,'ksc9595','zxc123asd456','tncks097@naver.com',010,9955,7124,NOW(),1);
INSERT INTO `inform` VALUES (2,'qaws1234','q1w2e3r4','khs5200@knu.ac.kr',010,1234,5678,NOW(),2);
