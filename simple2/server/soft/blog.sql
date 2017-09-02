/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : blog

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2017-09-02 10:01:50
*/

SET FOREIGN_KEY_CHECKS=0;

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
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'aa', 'QSS8CpM1wn8IbyS6IHpJEg==');
