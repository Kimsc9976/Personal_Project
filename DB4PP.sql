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
-- Dumping data for table `Person`
--

INSERT INTO `Person` VALUES (1,'김수찬','developer');
INSERT INTO `Person` VALUES (2,'가나다','들러리');

--
-- Table structure for table `inform`
--

CREATE TABLE `inform` (
  `uuid` varchar(36) NOT NULL DEFAULT (UUID()), 
  `ID` varchar(30) NOT NULL,
  `Password` text NOT NULL,
  `salt` text NOT NULL,
  `Email` text NOT NULL,
  `Phone_Head` TINYINT NOT NULL,
  `Phone_Mid` SMALLINT NOT NULL,
  `Phone_Tail` SMALLINT NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`uuid`)
);

--
-- Dumping data for table `inform`
--

INSERT INTO `inform` VALUES ('5320a731-be11-4d9f-9c88-8726d79f6f63','ksc9595','E7Qe1XID+SHMvLt7OqZfIgX9R2vsnXmDs++014Xfmxaq6v82tgemZ8alTXVQwj52sh7mU017EXMKxmagriuSwQ==','Xgwvsv5Paae/o7bFa831dY7OqEVLwKtcBJdVoAqJoC3TqMFarsF7Bvk/sBR7zS294QW1nkKt5S18KcDJoKRk9A==','tncks097@naver.com',010,9955,7124,NOW());
INSERT INTO `inform` VALUES ('58821cc2-c01c-409e-9570-78ddfa706c93','tncks097','ez7X0KZ70pjEbRLvS1ATPXRdSq7iP5yLp0AdwlSp+QLpLwVBWhrJgc9jUuWYAZLyWNX49KbqoYZtGCLPDi4iQA==','cqUMvi7C165+Dq798fkwreC9qfnHlUxsfzisL0R81OjVYjVfvhcZoAmMr5l/YS0ZmdFW1TTHogIzbiAsrHLRXw==','khs5200@knu.ac.kr',010,1234,5678,NOW());
