/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50610
Source Host           : localhost:3306
Source Database       : mybatis

Target Server Type    : MYSQL
Target Server Version : 50610
File Encoding         : 65001

Date: 2016-08-15 23:13:27
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `items`
-- ----------------------------
DROP TABLE IF EXISTS `items`;
CREATE TABLE `items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL COMMENT '商品名称',
  `price` float(10,1) NOT NULL COMMENT '商品定价',
  `detail` text COMMENT '商品描述',
  `pic` varchar(64) DEFAULT NULL COMMENT '商品图片',
  `createtime` datetime NOT NULL COMMENT '生产日期',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of items
-- ----------------------------
INSERT INTO `items` VALUES ('1', 'aaaa1', '8800.0', '笔记本性能好，质量好！！！！！', 'eb694879-7d35-4d5e-8e00-a947cf104ce9.jpg', '2015-01-03 10:20:30');
INSERT INTO `items` VALUES ('2', '笔记本', '6000.0', '笔记本性能好，质量好！！！！！', null, '2015-02-09 13:22:57');
INSERT INTO `items` VALUES ('3', '背包', '200.0', '名牌背包，容量大质量好！！！！', null, '2015-02-06 13:23:02');

-- ----------------------------
-- Table structure for `orderdetail`
-- ----------------------------
DROP TABLE IF EXISTS `orderdetail`;
CREATE TABLE `orderdetail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orders_id` int(11) NOT NULL COMMENT '订单id',
  `items_id` int(11) NOT NULL COMMENT '商品id',
  `items_num` int(11) DEFAULT NULL COMMENT '商品购买数量',
  PRIMARY KEY (`id`),
  KEY `FK_orderdetail_1` (`orders_id`),
  KEY `FK_orderdetail_2` (`items_id`),
  CONSTRAINT `FK_orderdetail_1` FOREIGN KEY (`orders_id`) REFERENCES `orders` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_orderdetail_2` FOREIGN KEY (`items_id`) REFERENCES `items` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of orderdetail
-- ----------------------------
INSERT INTO `orderdetail` VALUES ('1', '3', '1', '1');
INSERT INTO `orderdetail` VALUES ('2', '3', '2', '3');
INSERT INTO `orderdetail` VALUES ('3', '4', '3', '4');
INSERT INTO `orderdetail` VALUES ('4', '4', '2', '3');

-- ----------------------------
-- Table structure for `orders`
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '下单用户id',
  `number` varchar(32) NOT NULL COMMENT '订单号',
  `createtime` datetime NOT NULL COMMENT '创建订单时间',
  `note` varchar(100) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`),
  KEY `FK_orders_1` (`user_id`),
  CONSTRAINT `FK_orders_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES ('3', '1', '1000010', '2015-02-04 13:22:35', 'n1');
INSERT INTO `orders` VALUES ('4', '1', '1000011', '2015-02-03 13:22:41', 'n2');
INSERT INTO `orders` VALUES ('5', '10', '1000012', '2015-02-12 16:13:23', 'n3');

-- ----------------------------
-- Table structure for `t_student`
-- ----------------------------
DROP TABLE IF EXISTS `t_student`;
CREATE TABLE `t_student` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `stu_name` varchar(16) NOT NULL,
  `gender` int(11) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `address` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_student
-- ----------------------------
INSERT INTO `t_student` VALUES ('1', '王小军', '1', '17', '北京市东城区');
INSERT INTO `t_student` VALUES ('2', '李雷雷', '1', '16', '北京市朝阳区');
INSERT INTO `t_student` VALUES ('3', '张静', '2', '16', '北京市昌平区');
INSERT INTO `t_student` VALUES ('4', '王晓萌', '2', '17', '北京市顺义区');
INSERT INTO `t_student` VALUES ('5', '韩梅梅', '2', '16', '北京市朝阳区');
INSERT INTO `t_student` VALUES ('6', '李小军', '1', '17', '北京市海淀区');
INSERT INTO `t_student` VALUES ('7', '成龙', '1', '16', '北京市石景山区');
INSERT INTO `t_student` VALUES ('8', '李海飞', '2', '16', '北京市海淀区');
INSERT INTO `t_student` VALUES ('9', '罗红', '2', '16', '北京市朝阳区');
INSERT INTO `t_student` VALUES ('10', '孙海杰', '1', '16', '北京市石景山区');
INSERT INTO `t_student` VALUES ('11', '王海龙', '1', '16', '北京市东城区');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(32) DEFAULT NULL,
  `birthday` date DEFAULT NULL COMMENT '生日',
  `sex` char(1) DEFAULT NULL COMMENT '性别',
  `address` varchar(256) DEFAULT NULL COMMENT '地址',
  `testid` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '王五', '2014-07-10', '2', '北京市', null);
INSERT INTO `user` VALUES ('10', '张三', '2014-07-10', '1', '上海市', null);
INSERT INTO `user` VALUES ('16', '张小明', '2014-07-10', '1', '郑州', null);
INSERT INTO `user` VALUES ('22', '陈小明', '2014-07-10', '1', '济宁', null);
INSERT INTO `user` VALUES ('24', '张三丰', '2014-07-10', '2', '邹城', null);
INSERT INTO `user` VALUES ('25', '李明', '2014-07-10', '1', '上海', null);
INSERT INTO `user` VALUES ('26', '赵三', '2014-07-10', null, '吉林', null);
INSERT INTO `user` VALUES ('27', '小米', '2016-05-30', '1', '辽宁', null);

-- ----------------------------
-- Table structure for `watermark`
-- ----------------------------
DROP TABLE IF EXISTS `watermark`;
CREATE TABLE `watermark` (
  `id` varchar(36) NOT NULL,
  `pic` varchar(64) DEFAULT NULL,
  `createtime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of watermark
-- ----------------------------
INSERT INTO `watermark` VALUES ('05443726-3f79-47c9-b8b8-4012fbe5822d', '71e7c3df-4cf5-4627-888c-624b6bb2cf5f.png', '2016-08-10 23:48:27');

