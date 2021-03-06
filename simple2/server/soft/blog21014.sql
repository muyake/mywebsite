/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : blog2

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2017-10-14 20:27:25
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `inventory`
-- ----------------------------
DROP TABLE IF EXISTS `inventory`;
CREATE TABLE `inventory` (
  `id` int(36) NOT NULL AUTO_INCREMENT,
  `userid` int(36) NOT NULL,
  `addDate` varchar(100) DEFAULT NULL,
  `destination` varchar(255) DEFAULT NULL,
  `Consignee` varchar(255) DEFAULT NULL,
  `telephone` varchar(50) DEFAULT NULL,
  `interchange` varchar(255) DEFAULT NULL,
  `interchangeTel` varchar(50) DEFAULT NULL,
  `freight` double(100,2) DEFAULT NULL,
  `transit` double(100,2) DEFAULT NULL,
  `product` varchar(25) DEFAULT NULL,
  `count` int(100) DEFAULT NULL,
  `pack` varchar(255) DEFAULT NULL,
  `weight` double(100,2) DEFAULT NULL,
  `consignor` varchar(100) DEFAULT NULL,
  `consignorphone` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userid` (`userid`),
  CONSTRAINT `inventory_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of inventory
-- ----------------------------
INSERT INTO `inventory` VALUES ('1', '2', '2017-09-07', '1', '1', '1', '1', '1', '1.00', null, null, null, null, null, null, null);
INSERT INTO `inventory` VALUES ('2', '2', '2017-09-08', '2', '2', '2', '2', '2', '2.00', null, null, null, null, null, null, null);
INSERT INTO `inventory` VALUES ('3', '2', '2017-09-08', '3', '3', '3', '3', '3', '3.00', null, null, null, null, null, null, null);
INSERT INTO `inventory` VALUES ('4', '3', '2017-09-01', '人人', '耕恺', '1234567789', '前台', '112114', '5000.00', null, null, null, null, null, null, null);
INSERT INTO `inventory` VALUES ('5', '7', '2017-09-09', '北京', '高曼', '1', '1', '1', '1.00', null, null, null, null, null, null, null);
INSERT INTO `inventory` VALUES ('6', '9', '2017-09-11', '乌鲁木齐', '王小明', '15801285467', '石家庄第二物流', '15756526651', '35.00', null, null, null, null, null, null, null);
INSERT INTO `inventory` VALUES ('8', '9', '2017-09-01', '兰州', '魏总', '15200049012', '重要', '13633126199', '200.00', null, null, null, null, null, null, null);
INSERT INTO `inventory` VALUES ('9', '1', '2017-09-12', '1', '1', '1', '1', '1', '1.00', null, null, null, null, null, null, null);
INSERT INTO `inventory` VALUES ('10', '1', '2017-09-13', '1', '2', '3', '4', '5', '7.00', '1.00', '2', '3', '4', '5.00', null, null);
INSERT INTO `inventory` VALUES ('13', '1', '2017-09-21', 'a3', 'sd3', '15801282719', '23', '15801282719', '23.00', '23.00', '23', null, null, null, null, null);
INSERT INTO `inventory` VALUES ('14', '1', '2017-09-22', '中国石家庄', '穆亚克从', '15801282791', '辛集', '15801282791', '15.00', '10.00', '食品', null, null, null, null, null);
INSERT INTO `inventory` VALUES ('16', '1', '2017-09-22', '电饭锅', '阿斯蒂芬', '15801282791', '123', '15801282791', '123.00', '123.00', '123', '13', '13', '13.00', null, null);
INSERT INTO `inventory` VALUES ('17', '1', '2017-09-22', 'df', 'asdf', '15801282791', 'sadf', '15801282791', '12.50', '12.50', 'sdf', '212', 'er', '12.50', null, null);
INSERT INTO `inventory` VALUES ('18', '1', '2017-10-11', '1', '2', '15801282791', '7', '15801282791', '8.00', '9.00', '3', '4', '5', '6.00', null, null);
INSERT INTO `inventory` VALUES ('19', '1', '2017-10-11', '3', '4', '83407316', '11', '83407316', '13.00', '14.00', '6', '7', '8', '9.00', null, null);
INSERT INTO `inventory` VALUES ('20', '1', '2017-10-11', '1', '1', '15801282791', '1', '15801282791', '1.00', '1.00', '1', '1', '1', '1.00', null, null);
INSERT INTO `inventory` VALUES ('21', '1', '2017-10-10', '1', '1', '1', '1', '1', '1.00', '1.00', '1', '1', '1', '1.00', null, null);
INSERT INTO `inventory` VALUES ('22', '1', '2017-10-11', '3', '3', '3', '3', '3', '3.00', '3.00', '3', '3', '3', '3.00', '3', '3');
INSERT INTO `inventory` VALUES ('23', '1', '2017-10-03', '斯蒂芬1', '斯蒂芬1', '15801282791', '斯蒂芬1', '158012827911', '121.00', '21.00', '斯蒂芬1', '121', '斯蒂芬1', '121.00', '阿凡达1', '15801282791');
INSERT INTO `inventory` VALUES ('24', '1', '2017-10-04', 'sdfs', 'dfsdf', '158012827911', 'l', '158012827911', '12.00', '12.00', 'kl', '12', 'k', '12.00', 'sfd', '158012827911');

-- ----------------------------
-- Table structure for `post`
-- ----------------------------
DROP TABLE IF EXISTS `post`;
CREATE TABLE `post` (
  `id` varchar(36) NOT NULL,
  `user` varchar(30) NOT NULL,
  `post` varchar(200) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of post
-- ----------------------------
INSERT INTO `post` VALUES ('e47510c5-e8e1-463e-a8e9-a3c4f628830d', 'JakyKing', 'fsfwefwfe', '2013-09-17 01:02:55');
INSERT INTO `post` VALUES ('e6144656-e0c6-40c4-bbc3-d5254b25053c', 'JakyKing', 'bedgergeg', '2013-09-17 01:03:53');
INSERT INTO `post` VALUES ('3b12b586-2fd1-4b4a-a464-2f79fa0ec658', 'tom', 'fwsffwf', '2013-09-17 01:04:30');
INSERT INTO `post` VALUES ('677f0984-ce58-4878-b953-8f3d07bd6564', 'tom', 'gregergerg', '2013-09-17 01:04:36');
INSERT INTO `post` VALUES ('9f3a75bc-dc5f-4041-930c-b15ba8f3a656', 'tom', 'gegerggergerg', '2013-09-17 01:05:33');

-- ----------------------------
-- Table structure for `text`
-- ----------------------------
DROP TABLE IF EXISTS `text`;
CREATE TABLE `text` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(255) NOT NULL,
  `text` text NOT NULL,
  `ctime` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of text
-- ----------------------------
INSERT INTO `text` VALUES ('1', 'aa', ' asdfasd', '2017-09-02');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(36) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `password` varchar(60) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'aa', 'QSS8CpM1wn8IbyS6IHpJEg==');
INSERT INTO `user` VALUES ('2', '1', 'xMpCOKC5I4INzFCab3WEmw==');
INSERT INTO `user` VALUES ('3', 'zgk', 'ICy5YqxZB1uWSwcVLSNLcA==');
INSERT INTO `user` VALUES ('4', 'kunkunwang', 'U1VZin1hZCLfCOPRaV6mDQ==');
INSERT INTO `user` VALUES ('5', 'gm', 'ICy5YqxZB1uWSwcVLSNLcA==');
INSERT INTO `user` VALUES ('6', '12', 'xMpCOKC5I4INzFCab3WEmw==');
INSERT INTO `user` VALUES ('7', 'zgy', 'ICy5YqxZB1uWSwcVLSNLcA==');
INSERT INTO `user` VALUES ('8', 'e', '4WcXl8UuFfdjOAtF6EHsMg==');
INSERT INTO `user` VALUES ('9', 'ee', 'CKRBXp1ZT/lgAwuSHUK5Hg==');
INSERT INTO `user` VALUES ('10', 'cc', '4DI6kDmt0peL9bSVUFcsfA==');
INSERT INTO `user` VALUES ('11', 'd', 'gnfgkQ11AZW0SHl2FuCRrQ==');
