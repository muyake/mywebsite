/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50051
Source Host           : localhost:3306
Source Database       : microblog

Target Server Type    : MYSQL
Target Server Version : 50051
File Encoding         : 65001

Date: 2013-09-17 01:37:13
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `post`
-- ----------------------------
DROP TABLE IF EXISTS `post`;
CREATE TABLE `post` (
  `id` varchar(36) NOT NULL,
  `user` varchar(30) NOT NULL,
  `post` varchar(200) default NULL,
  `time` datetime default NULL,
  PRIMARY KEY  (`id`)
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
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` varchar(36) NOT NULL,
  `name` varchar(30) NOT NULL,
  `password` varchar(60) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('f822edbe-47aa-4ebf-b9c4-169fda471987', 'JakyKing', 'ICy5YqxZB1uWSwcVLSNLcA==');
INSERT INTO `user` VALUES ('8bdf32ae-4ae3-4ea8-bd15-871e9d9c7565', 'tom', 'ICy5YqxZB1uWSwcVLSNLcA==');
