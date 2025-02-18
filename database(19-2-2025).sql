/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `staff_id` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  `username` varchar(50) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'username',
  `password` varchar(1000) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'password',
  `name_en` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `name_cn` varchar(100) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Name',
  `phone_number` varchar(8) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'phoneNumber',
  `email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `address_cn` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `address_en` varchar(1000) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='管理員';

DELETE FROM `admin`;
INSERT INTO `admin` (`id`, `staff_id`, `username`, `password`, `name_en`, `name_cn`, `phone_number`, `email`, `address_cn`, `address_en`) VALUES
	(1, '12345678', 'admin', '$2a$10$CmL8d8kv2y2pMgpgTZThE.xeaCZx1nzD5epgyWWVaodS8Gak6WBou', 'Admin_01', '管理員_1號', '28935767', 'admin01@gmail.com', '香港快活谷路123號，快活谷', '123 Happy Valley Road, Happy Valley, Hong Kong'),
	(2, '10010001', 'admin', '$2a$10$CmL8d8kv2y2pMgpgTZThE.xeaCZx1nzD5epgyWWVaodS8Gak6WBou', 'Admin_02', '管理員_2號', '28995761', 'admin02@gmail.com', '香港中環皇后大道100號', '100 Queen’s Road, Central, Hong Kong'),
    (3, '10010002', 'admin', '$2a$10$XyZpQmL8d8kv2y2pMgpgTZThEaCZx1nzD5epgyWWVaodS8Gak6WBou', 'Admin_03', '管理員_3號', '29876542', 'admin03@gmail.com', '香港灣仔告士打道88號', '88 Gloucester Road, Wan Chai, Hong Kong'),
    (4, '10010003', 'admin', '$2a$10$AbL8d8kv2y2pMgpgTZThEaCZx1nzD5epgyWWVaodS8Gak6WBou', 'Admin_04', '管理員_4號', '28765439', 'admin04@gmail.com', '香港九龍尖沙咀彌敦道300號', '300 Nathan Road, Tsim Sha Tsui, Kowloon, Hong Kong'),
    (5, '10010004', 'admin', '$2a$10$LmN8d8kv2y2pMgpgTZThEaCZx1nzD5epgyWWVaodS8Gak6WBou', 'Admin_05', '管理員_5號', '27654328', 'admin05@gmail.com', '香港新界沙田正街50號', '50 Cheng Street, Sha Tin, New Territories, Hong Kong'),
    (6, '10010005', 'admin', '$2a$10$OpL8d8kv2y2pMgpgTZThEaCZx1nzD5epgyWWVaodS8Gak6WBou', 'Admin_06', '管理員_6號', '26543219', 'admin06@gmail.com', '香港銅鑼灣時代廣場1號', '1 Times Square, Causeway Bay, Hong Kong'),
    (7, '10010006', 'admin', '$2a$10$PqL8d8kv2y2pMgpgTZThEaCZx1nzD5epgyWWVaodS8Gak6WBou', 'Admin_07', '管理員_7號', '25432167', 'admin07@gmail.com', '香港元朗青山公路200號', '200 Castle Peak Road, Yuen Long, New Territories, Hong Kong'),
    (8, '10010007', 'admin', '$2a$10$QrL8d8kv2y2pMgpgTZThEaCZx1nzD5epgyWWVaodS8Gak6WBou', 'Admin_08', '管理員_8號', '24321678', 'admin08@gmail.com', '香港深水埗長沙灣道88號', '88 Cheung Sha Wan Road, Sham Shui Po, Kowloon, Hong Kong'),
    (9, '10010008', 'admin', '$2a$10$RsL8d8kv2y2pMgpgTZThEaCZx1nzD5epgyWWVaodS8Gak6WBou', 'Admin_09', '管理員_9號', '23216789', 'admin09@gmail.com', '香港荃灣青山道150號', '150 Castle Peak Road, Tsuen Wan, New Territories, Hong Kong'),
    (10, '10010009', 'admin', '$2a$10$StL8d8kv2y2pMgpgTZThEaCZx1nzD5epgyWWVaodS8Gak6WBou', 'Admin_10', '管理員_10號', '22167890', 'admin10@gmail.com', '香港北角英皇道60號', '60 King’s Road, North Point, Hong Kong'),
    (11, '10010010', 'admin', '$2a$10$TuL8d8kv2y2pMgpgTZThEaCZx1nzD5epgyWWVaodS8Gak6WBou', 'Admin_11', '管理員_11號', '21234567', 'admin11@gmail.com', '香港將軍澳唐賢街18號', '18 Tong Yin Street, Tseung Kwan O, Hong Kong');


DROP TABLE IF EXISTS `dishes_type`;
CREATE TABLE IF NOT EXISTS `dishes_type` (
  `id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `name_Zh_HK` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  `name_Zh_CN` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  `name_Us_EN` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DELETE FROM `dishes_type`;
INSERT INTO `dishes_type` (`id`, `name_Zh_HK`, `name_Zh_CN`, `name_Us_EN`) VALUES
	('capsicum_annuum', '泡椒', '泡椒', 'Capsicum Annuum'),
	('cold_food', '冷盤', '冷盘', 'Cold Food'),
	('drink', '飲品', '饮料', 'Drink'),
	('side_dish', '配菜', '配菜', 'Side Dish'),
	('signature_dish', '招牌菜', '招牌', 'Signature Dish'),
	('staple_food', '主食', '主食', 'Staple Food'),
	('stir_fry', '精美小炒', '精美小炒', 'Stir Fry');

DROP TABLE IF EXISTS `menu`;
CREATE TABLE IF NOT EXISTS `menu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Name_zh_HK` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `Name_zh_CN` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `Name_en_US` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  `price` int NOT NULL,
  `onSale` varchar(1) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Y' COMMENT 'Y= onsale, N= non -sale',
  `path` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `type` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `menu_dishes_type_FK` (`type`),
  CONSTRAINT `menu_dishes_type_FK` FOREIGN KEY (`type`) REFERENCES `dishes_type` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DELETE FROM `menu`;
INSERT INTO `menu` (`id`, `Name_zh_HK`, `Name_zh_CN`, `Name_en_US`, `price`, `onSale`, `path`, `type`) VALUES
	(1, '泡椒肥腸（份）', '泡椒肥肠（份）', 'Pork Intestines stri fried with Pickled Peppers(A Serving)', 168, 'Y', '泡椒肥腸.jpg', 'capsicum_annuum'),
	(2, '泡椒黃喉（份）', '泡椒黄喉（份）', 'Stir Fried Yellow Throat with Pickled Peppers(A Serving)', 168, 'Y', '泡椒黃喉.jpg', 'capsicum_annuum'),
	(3, '泡椒耗兒魚（份）', '泡椒耗儿鱼（份）', 'Stir Fried Smelt Fish with Pickled Peppers(A Serving)', 168, 'Y', '泡椒耗兒魚.jpg', 'capsicum_annuum'),
	(4, '泡椒脆腸（份）', '泡椒脆肠（份）', 'Stir Fried Crispy Intestines with Pickled Peppers(A Serving)', 168, 'Y', '泡椒脆腸.jpg', 'capsicum_annuum'),
	(5, '泡椒魔芋（份）', '泡椒魔芋（份）', 'Stir Fried Konjac with Pickled Peppers(A Serving)', 78, 'Y', '泡椒魔芋.jpg', 'capsicum_annuum'),
	(6, '泡椒腰花（份）', '泡椒腰花（份）', 'Stir Fried Pork Kidneys with Pickled Peppers(A Serving)', 88, 'Y', '泡椒腰花.jpg', 'capsicum_annuum'),
	(7, '泡椒魚卜（份）', '泡椒鱼卜（份）', 'Stir Fried Fish Maw with Pickled Peppers(A Serving)', 98, 'Y', '泡椒魚卜.jpg', 'capsicum_annuum'),
	(8, '泡椒雞腎（份）', '泡椒鸡肾（份）', 'Stir Fried Chicken Kidneys with Pickled Peppers(A Serving)', 78, 'Y', '泡椒雞腎.jpg', 'capsicum_annuum'),
	(9, '泡椒田雞（份）', '泡椒田鸡（份）', 'Stir Fried Frog with Pickled Peppers(A Serving)', 168, 'Y', '泡椒田雞.jpg', 'capsicum_annuum'),
	(10, '泡椒豬潤（份）', '泡椒猪润（份）', 'Stir Fried Pork Intestines with Pickled Peppers(A Serving)', 88, 'Y', '泡椒豬潤.jpg', 'capsicum_annuum'),
	(11, '涼拌青瓜（份）', '凉拌青瓜（份）', 'Shredded Cucumber with Sauce(A Serving)', 38, 'Y', '涼拌青瓜.jpg', 'cold_food'),
	(12, '涼拌秋葵（份）', '凉拌秋葵（份）', 'Shredded Orka with Sauce(A Serving)', 38, 'Y', '涼拌秋葵.jpg', 'cold_food'),
	(13, '涼拌豆干（份）', '凉拌豆干（份）', 'Cold Dried Tofu(A Serving)', 48, 'Y', '涼拌豆干.jpg', 'cold_food'),
	(14, '涼拌藕片（份）', '凉拌藕片（份）', 'Cold-Spiced Lotus Root Slices(A Serving)', 48, 'Y', '涼拌藕片.jpg', 'cold_food'),
	(15, '尖椒皮蛋（份）', '尖椒皮蛋（份）', 'Spicy Pepper Preserved Egg(A Serving)', 48, 'Y', '尖椒皮蛋.jpg', 'cold_food'),
	(16, '口水雞（份）', '口水鸡（份）', 'Saliva Chicken(A Serving)', 58, 'Y', '口水雞.jpg', 'cold_food'),
	(17, '夫妻肺片（份）', '夫妻肺片（份）', 'Sliced Beef and Ox Tongue in Chili Sauce(A Serving)', 58, 'Y', '夫妻肺片.jpg', 'cold_food'),
	(18, '四川臘腸（條）', '四川腊肠（条）', 'Sichuan Sausage(A Piece)', 88, 'Y', '四川臘腸.jpg', 'cold_food'),
	(19, '藤椒魚皮（份）', '藤椒鱼皮（份）', 'Rattan Pepper Fish Skin(A Serving)', 68, 'Y', '藤椒魚皮.jpg', 'cold_food'),
	(20, '麻辣牛腱（份）', '麻辣牛腱（份）', 'Spicy Beef Shank(A Serving)', 68, 'Y', '麻辣牛腱.jpg', 'cold_food'),
	(21, '涼拌蕨根粉（碗）', '凉拌蕨根粉（碗）', 'Shredded fern root noodles(A Serving)', 68, 'Y', '涼拌蕨根粉.jpg', 'cold_food'),
	(22, '香辣酥肉（份）', '香辣酥肉（份）', 'Spicy Deep-Fired Crispy Pork(A Serving)', 88, 'Y', '香辣酥肉.jpg', 'cold_food'),
	(23, '黑糖糍粑（份）', '黑糖糍粑（份）', 'Rice Cakes with Brown Sugar(A Serving)', 68, 'Y', '黑糖糍粑.jpg', 'cold_food'),
	(24, '涼拌萵筍絲（份）', '凉拌莴笋丝（份）', 'Stem Lettuce Salad(A Serving)', 48, 'Y', '涼拌萵筍絲.jpg', 'cold_food'),
	(25, '涼拌土豆絲（份）', '凉拌土豆丝（份）', 'Chinese Potato Salad(A Serving)', 48, 'Y', '涼拌土豆絲.jpg', 'cold_food'),
	(26, '涼拌豬肚絲（份）', '凉拌猪肚丝（份）', 'Cold shredded pork belly(A Serving)', 58, 'Y', '涼拌豬肚絲.jpg', 'cold_food'),
	(27, '紅油豬耳（份）', '红油猪耳（份）', 'Pig Ear in in Hot and Spicy Sauce(A Serving)', 58, 'Y', '紅油豬耳.jpg', 'cold_food'),
	(28, '泡椒雞腳（份）', '泡椒鸡脚（份）', 'Chicken Feet with Pickled Pepper(A Serving)', 58, 'Y', '泡椒雞腳.jpg', 'cold_food'),
	(29, '川北涼粉（碗）', '川北凉粉（碗）', 'Tossed Clear Noodles with Chili Sauce(A Serving)', 48, 'Y', '川北涼粉.jpg', 'cold_food'),
	(30, '涼拌長豆角（份）', '凉拌长豆角（份）', 'Shredded Chinese Long Bean with Sauce(A Serving)', 48, 'Y', '涼拌長豆角.jpg', 'cold_food'),
	(31, '豆花（份）', '豆花（份）', 'Tofu Pudding(A Serving)', 58, 'Y', '豆花.jpg', 'cold_food'),
	(32, '烏龍茶（支）', '乌龙茶（支）', 'Oolong(Bottle)', 15, 'Y', '烏龍茶.jpg', 'drink'),
	(33, '菊花茶（支）', '菊花茶（支）', 'Chrysanthemum Tea(Bottle)', 15, 'Y', '菊花茶.jpg', 'drink'),
	(34, '竹蔗水（支）', '竹蔗水（支）', 'Bamboo cane Water(Bottle)', 15, 'Y', '竹蔗水.jpg', 'drink'),
	(35, '天地壹號（罐裝）', '天地壹号（罐装）', 'Tian Di No.1(Canned)', 20, 'Y', '天地壹號（罐裝）.jpg', 'drink'),
	(36, '加多寶（罐裝）', '加多宝（罐装）', 'Jia Duo Bao(Canned)', 15, 'Y', '加多寶（罐裝）.jpg', 'drink'),
	(37, '可樂（罐裝）', '可乐（罐装）', 'Coke(Canned)', 15, 'Y', '可樂（罐裝）.jpg', 'drink'),
	(38, '七喜（罐裝）', '七喜（罐裝）', '7-Up (Canned)', 15, 'Y', '七喜（罐裝）.jpg', 'drink'),
	(39, '雪碧（罐裝）', '雪碧（罐装）', 'Sprite (Canned)', 15, 'Y', '雪碧（罐裝）.jpg', 'drink'),
	(40, '玉泉忌廉（罐裝）', '玉泉忌廉（罐装）', 'Schweppes Cream Soda(Canned)', 15, 'Y', '玉泉忌廉（罐裝）.jpg', 'drink'),
	(41, '無糖可樂（罐裝）', '无糖可乐（罐装）', 'Coca-Cola No Sugar(Canned)', 15, 'Y', '無糖可樂（罐裝）.jpg', 'drink'),
	(42, '芬達橙味（罐裝）', '芬达橙味（罐装）', 'Fanta Orange(Canned)', 15, 'Y', '芬達橙味（罐裝）.jpg', 'drink'),
	(43, '礦泉水（支）', '矿泉水（支）', 'Mineral Water(Bottle)', 10, 'Y', '礦泉水.jpg', 'drink'),
	(44, '維他檸檬茶（支）', '维他柠檬茶（支）', 'Vita Lemon Tea(Bottle)', 12, 'Y', '維他檸檬茶.jpg', 'drink'),
	(45, '青島（大樽）', '青岛（大瓶）', 'Tsingtao Beer(Large)', 28, 'Y', '（大樽）青島.jpg', 'drink'),
	(46, '藍妹（大樽）', '蓝妹（大瓶）', 'Blue Girl Beer(Large)', 28, 'Y', '（大樽）藍妹.jpg', 'drink'),
	(47, '江小白（支）', '江小白（支）', 'Jiang Xiaobai(Bottle)', 58, 'Y', '江小白.jpg', 'drink'),
	(48, 'Hoegaarden（支）', '豪格登（支）', 'Hoegaarden(Bottle)', 42, 'Y', 'Hoegaarden.jpg', 'drink'),
	(49, '雪花啤酒（支）', '雪花啤酒（支）', 'Snow Beer(Bottle)', 20, 'Y', '雪花啤酒.jpg', 'drink'),
	(50, '哈爾濱啤酒（支）', '哈尔滨啤酒（支）', 'Harbin Beer(Bottle)', 25, 'Y', '哈爾濱啤酒.jpg', 'drink'),
	(51, '生力黑啤（大樽）', '生力黑啤（大瓶）', 'San Miguel Cerveza Negra(Large)', 38, 'Y', '（大樽）生力黑啤.jpg', 'drink'),
	(52, '真露燒酒（支）', '真露烧酒（支）', 'Jinro-Clhamisul Soju(Bottle)', 40, 'Y', '真露燒酒.jpg', 'drink'),
	(53, '萵筍（份）', '莴笋（份）', 'Celtuce(A Serving)', 38, 'Y', '萵筍.jpg', 'side_dish'),
	(54, '淮山（份）', '山药（份）', 'Common Yam Rhizome(A Serving)', 38, 'Y', '淮山.jpg', 'side_dish'),
	(55, '鮮木耳（份）', '鲜木耳（份）', 'Wood Ear(A Serving)', 28, 'Y', '鮮木耳.jpg', 'side_dish'),
	(56, '油麥菜（份）', '油麦菜（份）', 'Indian Lettuce(A Serving)', 28, 'Y', '油麥菜.jpg', 'side_dish'),
	(57, '娃娃菜（份）', '娃娃菜（份）', 'Baby Cabbage(A Serving)', 28, 'Y', '娃娃菜.jpg', 'side_dish'),
	(58, '豆卜（份）', '豆卜（份）', 'Tofu Puff(A Serving)', 38, 'Y', '豆卜.jpg', 'side_dish'),
	(59, '幼薯粉（份）', '幼薯粉（份）', 'Potato Starch Noodles(A Serving)', 28, 'Y', '幼薯粉.jpg', 'side_dish'),
	(60, '豬紅（份）', '猪红（份）', 'Curdled Pig''s Blood(A Serving)', 28, 'Y', '豬紅.jpg', 'side_dish'),
	(61, '黑椒牛丸（份）', '黑椒牛丸（份）', 'Black Pepper Beef(A Serving)', 45, 'Y', '黑椒牛丸.jpg', 'side_dish'),
	(62, '牛肉丸（份）', '牛肉丸（份）', 'Beef Ball(A Serving)', 45, 'Y', '牛肉丸.jpg', 'side_dish'),
	(63, '豬肉丸（份）', '猪肉丸（份）', 'Pork Ball(A Serving)', 45, 'Y', '豬肉丸.jpg', 'side_dish'),
	(64, '牛筋丸（份）', '牛筋丸（份）', 'Beef Tendon Ball(A Serving)', 45, 'Y', '牛筋丸.jpg', 'side_dish'),
	(65, '芝士丸（份）', '芝士丸（份）', 'Fish Ball with Cheese Stuffing(A Serving)', 45, 'Y', '芝士丸.jpg', 'side_dish'),
	(66, '墨魚丸（份）', '墨鱼丸（份）', 'Cuttlefish Flavour Fish Ball(A Serving)', 45, 'Y', '墨魚丸.jpg', 'side_dish'),
	(67, '花枝丸（份）', '花枝丸（份）', 'Cuttlefish Flavour Fish Ball in Taiwanese Style(A Serving)', 45, 'Y', '花枝丸.jpg', 'side_dish'),
	(68, '芝士腸（份）', '芝士肠（份）', 'Cheese Cocktail Sausage(A Serving)', 42, 'Y', '芝士腸.jpg', 'side_dish'),
	(69, '肥牛（份）', '肥牛（份）', 'Sliced Beef(A Serving)', 58, 'Y', '肥牛.jpg', 'side_dish'),
	(70, '午餐肉（份）', '午餐肉（份）', 'Luncheon(A Serving)', 42, 'Y', '午餐肉.jpg', 'side_dish'),
	(71, '酸豆角（份）', '酸豆角（份）', 'Sour Chinese Long Bean(A Serving)', 38, 'Y', '酸豆角.jpg', 'side_dish'),
	(72, '魚卜（份）', '鱼卜（份）', 'Fish Maw(A Serving)', 68, 'Y', '魚卜.jpg', 'side_dish'),
	(73, '肥腸（份）', '肥肠（份）', 'Pig Intestine(A Serving)', 88, 'Y', '肥腸.jpg', 'side_dish'),
	(74, '土豆片（份）', '土豆片（份）', 'Potato Chips(A Serving)', 28, 'Y', '土豆片.jpg', 'side_dish'),
	(75, '藕片（份）', '藕片（份）', 'Lotus Root Slices(A Serving)', 38, 'Y', '藕片.jpg', 'side_dish'),
	(76, '腐竹（份）', '腐竹（份）', 'Dried Beancurd Sticks(A Serving)', 38, 'Y', '腐竹.jpg', 'side_dish'),
	(77, '海帶（份）', '海带（份）', 'Kelp(A Serving)', 28, 'Y', '海帶.jpg', 'side_dish'),
	(78, '生菜（份）', '生菜（份）', 'Lettuce(A Serving)', 28, 'Y', '生菜.jpg', 'side_dish'),
	(79, '洋蔥（份）', '洋葱（份）', 'Onion(A Serving)', 38, 'Y', '洋蔥.jpg', 'side_dish'),
	(80, '豆腐（份）', '豆腐（份）', 'Tofu(A Serving)', 28, 'Y', '豆腐.jpg', 'side_dish'),
	(81, '寬粉（份）', '宽粉（份）', 'Wide Rice Noodles(A Serving)', 28, 'Y', '寬粉.jpg', 'side_dish'),
	(82, '魔芋（份）', '魔芋（份）', 'Konjac(A Serving)', 38, 'Y', '魔芋.jpg', 'side_dish'),
	(83, '貢丸（份）', '贡丸（份）', 'Gongwan Meatballs(A Serving)', 45, 'Y', '貢丸.jpg', 'side_dish'),
	(84, '手切牛肉（份）', '手切牛肉（份）', 'Hand-Sliced Beef(A Serving)', 168, 'Y', '手切牛肉.jpg', 'side_dish'),
	(85, '豆皮（份）', '豆皮（份）', 'Tofu Skin(A Serving)', 38, 'Y', '豆皮.jpg', 'side_dish'),
	(86, '腰花（份）', '腰花（份）', 'Pork Kidney(A Serving)', 58, 'Y', '腰花.jpg', 'side_dish'),
	(87, '兒菜（份）', '儿菜（份）', 'B. j. var. Gemminfera(A Serving)', 38, 'Y', '兒菜.jpg', 'side_dish'),
	(88, '豬潤（份）', '猪润（份）', 'Pork Liver(A Serving)', 48, 'Y', '豬潤.jpg', 'side_dish'),
	(89, '牛百葉（份）', '牛百叶（份）', 'Beef Omasum(A Serving)', 58, 'Y', '牛百葉.jpg', 'side_dish'),
	(90, '雞腎（份）', '鸡肾（份）', 'Chicken Gizzard(A Serving)', 48, 'Y', '雞腎.jpg', 'side_dish'),
	(91, '清江魚（例）', '清江鱼（例）', 'Steamed Mandarin Fish(Portion)', 378, 'Y', '清江魚.jpg', 'signature_dish'),
	(92, '紙包魚（大）', '纸包鱼（大）', 'Steamed Fish in Paper (Large)', 238, 'Y', '紙包魚(大).jpg', 'signature_dish'),
	(93, '紙包魚（小）', '纸包鱼（小）', 'Steamed Fish in Paper (Small)', 218, 'Y', '紙包魚(小).jpg', 'signature_dish'),
	(94, '紙包魚（整條）', '纸包鱼（整条）', 'Steamed Fish in Paper (1 piece)', 408, 'Y', '紙包魚(整條).jpg', 'signature_dish'),
	(95, '紙包海鱸魚（整條）', '纸包海鲈鱼（整条）', 'Steamed Sea Bass in Paper (1 piece)', 378, 'Y', '紙包海鱸魚(整條).jpg', 'signature_dish'),
	(96, '酸菜魚（半條）', '酸菜鱼（半条）', 'Sour and Spicy Fish (Half fish)', 268, 'Y', '酸菜魚(半條).jpg', 'signature_dish'),
	(97, '金湯魚片（份）', '金汤鱼片（份）', 'Fish Fillet in Golden Soup', 268, 'Y', '金湯魚片.jpg', 'signature_dish'),
	(98, '水煮魚（整條）', '水煮鱼（整条）', 'Boiled Fish (Whole fish)', 468, 'Y', '水煮魚(整條).jpg', 'signature_dish'),
	(99, '水煮魚（半條）', '水煮鱼（半条）', 'Boiled Fish (Half fish)', 268, 'Y', '水煮魚(半條).jpg', 'signature_dish'),
	(100, '酸菜魚（整條）', '酸菜鱼（整条）', 'Sour and Spicy Fish (Whole fish)', 468, 'Y', '酸菜魚(整條).jpg', 'signature_dish'),
	(101, '酸菜魚（半條）', '酸菜鱼（半条）', 'Sour and Spicy Fish (Half fish)', 268, 'Y', '酸菜魚(半條).jpg', 'signature_dish'),
	(102, '酸菜海鱸魚（整條）', '酸菜海鲈鱼（整条）', 'Sour and Spicy Sea Bass (Whole fish)', 468, 'Y', '酸菜海鱸魚(整條).jpg', 'signature_dish'),
	(103, '酸菜海鱸魚（半條）', '酸菜海鲈鱼（半条）', 'Sour and Spicy Sea Bass (Half fish)', 268, 'Y', '酸菜海鱸魚(半條).jpg', 'signature_dish'),
	(104, '金湯海鱸魚（例）', '金汤海鲈鱼（例）', 'Sea Bass in Golden Soup (Portion)', 238, 'Y', '金湯海鱸魚(例).jpg', 'signature_dish'),
	(105, '水煮海鱸魚（整條）', '水煮海鲈鱼（整条）', 'Boiled Sea Bass (Whole fish)', 468, 'Y', '水煮海鱸魚(整條).jpg', 'signature_dish'),
	(106, '水煮海鱸魚（半條）', '水煮海鲈鱼（半条）', 'Boiled Sea Bass (Half fish)', 238, 'Y', '水煮海鱸魚(半條).jpg', 'signature_dish'),
	(107, '毛血旺（例）', '毛血旺（例）', 'Spicy Hot Pot with Blood Curd(Portion)', 158, 'Y', '毛血旺.jpg', 'signature_dish'),
	(108, '麻辣蝦（例）', '麻辣虾（例）', 'Spicy Sichuan Shrimp(Portion)', 188, 'Y', '麻辣蝦.jpg', 'signature_dish'),
	(109, '水煮牛肉（例）', '水煮牛肉（例）', 'Boiled Beef Slices(Portion)', 198, 'Y', '水煮牛肉.jpg', 'signature_dish'),
	(110, '水煮肥牛（例）', '水煮肥牛（例）', 'Boiled Sliced Beef Brisket(Portion)', 158, 'Y', '水煮肥牛.jpg', 'signature_dish'),
	(111, '水煮田雞（例）', '水煮田鸡（例）', 'Boiled Frog(Portion)', 168, 'Y', '水煮田雞.jpg', 'signature_dish'),
	(112, '水煮肉片（例）', '水煮肉片（例）', 'Boiled Pork Slices(Portion)', 198, 'Y', '水煮肉片.jpg', 'signature_dish'),
	(113, '啤酒鴨（整隻）', '啤酒鸭（整只）', 'Beer Duck (Whole duck)', 318, 'Y', '啤酒鴨(整隻).jpg', 'signature_dish'),
	(114, '啤酒鴨（半隻）', '啤酒鸭（半只）', 'Beer Duck (Half duck)', 188, 'Y', '啤酒鴨(半隻).jpg', 'signature_dish'),
	(115, '奇味雞煲（整隻）', '奇味鸡煲（整只）', 'Flavorful Chicken Hot Pot (Whole Chicken)', 268, 'Y', '奇味雞煲(整隻).jpg', 'signature_dish'),
	(116, '奇味雞煲（半隻）', '奇味鸡煲（半只）', 'Flavorful Chicken Hot Pot (Half Chicken)', 158, 'Y', '奇味雞煲(半隻).jpg', 'signature_dish'),
	(117, '麻辣雞煲（整隻）', '麻辣鸡煲（整只）', 'Spicy Chicken Hot Pot (Whole Chicken)', 268, 'Y', '麻辣雞煲(整隻).jpg', 'signature_dish'),
	(118, '麻辣雞煲（半隻）', '麻辣鸡煲（半只）', 'Spicy Chicken Hot Pot (Half Chicken)', 158, 'Y', '麻辣雞煲(半隻).jpg', 'signature_dish'),
	(119, '紅油抄手（份）', '红油抄手（份）', 'Wonton Soup in Hot and Spicy Sauce(A Serving)', 35, 'Y', '紅油抄手.jpg', 'staple_food'),
	(120, '重慶酸辣粉（碗）', '重庆酸辣粉（碗）', 'Chongqing Hot and Sour Rice Noodles(Bowl)', 26, 'Y', '重慶酸辣粉.jpg', 'staple_food'),
	(121, '重慶酸辣麵（碗）', '重庆酸辣面（碗）', 'Chongqing Hot and Sour Noodles(Bowl)', 26, 'Y', '重慶酸辣麵.jpg', 'staple_food'),
	(122, '白飯（碗）', '白饭（碗）', 'Rice(Bowl)', 10, 'Y', '白飯.jpg', 'staple_food'),
	(123, '蛋炒飯（份）', '蛋炒饭（份）', 'Egg Fried Rice(A Serving)', 26, 'Y', '蛋炒飯.jpg', 'staple_food'),
	(124, '螞蟻上樹（份）', '蚂蚁上树（份）', 'spicy vermicelli stir-fry(A Serving)', 58, 'Y', '螞蟻上樹.jpg', 'stir_fry'),
	(125, '辣子雞（例）', '辣子鸡（例）', 'Spicy Chicken(Portion)', 158, 'Y', '辣子雞.jpg', 'stir_fry'),
	(126, '尖椒雞（半隻）', '尖椒鸡（半只）', 'Half Spicy Chicken with Bell Peppers(Whole Chicken)', 178, 'Y', '尖椒雞(半隻).jpg', 'stir_fry'),
	(127, '尖椒雞（整隻）', '尖椒鸡（整只）', 'Whole Spicy Chicken with Bell Peppers(Half Chicken)', 318, 'Y', '尖椒雞(整隻).jpg', 'stir_fry'),
	(128, '梅菜扣肉（份）', '梅菜扣肉（份）', 'Braised Pork Belly with Preserved Mustard Greens(A Serving)', 88, 'Y', '梅菜扣肉.jpg', 'stir_fry'),
	(129, '西芹炒豆干（份）', '西芹炒豆干（份）', 'Stir Fried Celery with Tofu(A Serving)', 78, 'Y', '西芹炒豆干.jpg', 'stir_fry'),
	(130, '酸豆角炒豆干（份）', '酸豆角炒豆干（份）', 'Stir Fried Green Beans with Tofu and Pickled Green Beans(A Serving)', 78, 'Y', '酸豆角炒豆干.jpg', 'stir_fry'),
	(131, '粉蒸肉（份）', '粉蒸肉（份）', 'Steamed Pork with Rice Flour(A Serving)', 88, 'Y', '粉蒸肉.jpg', 'stir_fry'),
	(132, '尖椒豬肚（份）', '尖椒猪肚（份）', 'Stir Fried Pork Stomach with Bell Peppers(A Serving)', 88, 'Y', '尖椒豬肚.jpg', 'stir_fry'),
	(133, '白油肚條（份）', '白油肚条（份）', 'Stir Fried Pork Tripe in White Sauce(A Serving)', 88, 'Y', '白油肚條.jpg', 'stir_fry'),
	(134, '辣子雞軟骨（份）', '辣子鸡软骨（份）', 'Spicy Chicken Cartilage(A Serving)', 168, 'Y', '辣子雞軟骨.jpg', 'stir_fry'),
	(135, '干煸肥腸（份）', '干煸肥肠（份）', 'Stir Fried Pig Intestine(A Serving)', 168, 'Y', '干煸肥腸.jpg', 'stir_fry'),
	(136, '大碗花菜（份）', '大碗花菜（份）', 'Stir Fried Cauliflower(A Serving)', 78, 'Y', '大碗花菜.jpg', 'stir_fry'),
	(137, '干煸耗兒魚（份）', '干煸耗儿鱼（份）', 'Stir Fried Dried Fish(A Serving)', 168, 'Y', '干煸耗兒魚.jpg', 'stir_fry'),
	(138, '鹹蛋黃土豆絲（份）', '咸蛋黄土豆丝（份）', 'Salted Egg Yolk Shredded Potatoes(A Serving)', 78, 'Y', '鹹蛋黃土豆絲.jpg', 'stir_fry'),
	(139, '鹹蛋黃炒蝦（份）', '咸蛋黄炒虾（份）', 'Salted Egg Yolk Stir Fried Shrimp(A Serving)', 188, 'Y', '鹹蛋黃炒蝦.jpg', 'stir_fry'),
	(140, '家常豆腐（份）', '家常豆腐（份）', 'Home-style Tofu(A Serving)', 78, 'Y', '家常豆腐.jpg', 'stir_fry'),
	(141, '清炒兒菜（份）', '清炒儿菜（份）', 'Stir Fried Baby Vegetables(A Serving)', 78, 'Y', '清炒兒菜.jpg', 'stir_fry'),
	(142, '清炒土豆絲（份）', '清炒土豆丝（份）', 'Stir Fried Shredded Potatoes(A Serving)', 68, 'Y', '清炒土豆絲.jpg', 'stir_fry'),
	(143, '熗炒土豆絲（份）', '炝炒土豆丝（份）', 'Stir Fried Shredded Potatoes(A Serving)', 68, 'Y', '熗炒土豆絲.jpg', 'stir_fry'),
	(144, '清炒娃娃菜（份）', '清炒娃娃菜（份）', 'Stir Fried Baby Bok Choy(A Serving)', 68, 'Y', '清炒娃娃菜.jpg', 'stir_fry'),
	(145, '熗炒娃娃菜（份）', '炝炒娃娃菜（份）', 'Stir Fried Baby Bok Choy(A Serving)', 68, 'Y', '熗炒娃娃菜.jpg', 'stir_fry'),
	(146, '手撕包菜（份）', '手撕包菜（份）', 'Hand-Torn Cabbage(A Serving)', 68, 'Y', '手撕包菜.jpg', 'stir_fry'),
	(147, '蒜苗炒臘肉（份）', '蒜苗炒腊肉（份）', 'Stir Fried Garlic Sprouts with Bacon(A Serving)', 98, 'Y', '蒜苗炒臘肉.jpg', 'stir_fry'),
	(148, '番茄炒蛋（份）', '番茄炒蛋（份）', 'Stir Fried Tomatoes with Eggs(A Serving)', 68, 'Y', '番茄炒蛋.jpg', 'stir_fry'),
	(149, '麻婆豆腐（份）', '麻婆豆腐（份）', 'Mapo Tofu(A Serving)', 68, 'Y', '麻婆豆腐.jpg', 'stir_fry'),
	(150, '干煸四季豆（份）', '干煸四季豆（份）', 'Dry-Fried Green Beans(A Serving)', 78, 'Y', '干煸四季豆.jpg', 'stir_fry'),
	(151, '川式回鍋肉（份）', '川式回锅肉（份）', 'Sichuan Twice-Cooked Pork(A Serving)', 88, 'Y', '川式回鍋肉.jpg', 'stir_fry'),
	(152, '豆豉鯪魚油麥菜（份）', '豆豉鲮鱼油麦菜（份）', 'Stir Fried Water Spinach with Fermented Black Beans and Silver Fish(A Serving)', 78, 'Y', '豆豉鯪魚油麥菜.jpg', 'stir_fry'),
	(153, '清炒時蔬（份）', '清炒时蔬（份）', 'Stir Fried Seasonal Vegetables(A Serving)', 68, 'Y', '清炒時蔬.jpg', 'stir_fry'),
	(154, '酸豆角肉沫（份）', '酸豆角肉沫（份）', 'Stir Fried Minced Pork with Pickled Green Beans(A Serving)', 78, 'Y', '酸豆角肉沫.jpg', 'stir_fry'),
	(155, '泡椒雞腎（份）', '泡椒鸡肾（份）', 'Stir Fried Chicken Kidneys with Pickled Peppers(A Serving)', 78, 'Y', '泡椒雞腎.jpg', 'stir_fry'),
	(156, '萵筍炒肉絲（份）', '莴笋炒肉丝（份）', 'Stir Fried Pork with Lettuce Stem(A Serving)', 88, 'Y', '萵筍炒肉絲.jpg', 'stir_fry'),
	(157, '清炒萵筍絲（份）', '清炒莴笋丝（份）', 'Stir Fried Shredded Lettuce Stem(A Serving)', 78, 'Y', '清炒萵筍絲.jpg', 'stir_fry'),
	(158, '花菜炒臘肉（份）', '花菜炒腊肉（份）', 'Stir Fried Cauliflower with Bacon(A Serving)', 98, 'Y', '花菜炒臘肉.jpg', 'stir_fry'),
	(159, '兒菜炒臘肉（份）', '儿菜炒腊肉（份）', 'Stir Fried Baby Bok Choy with Bacon(A Serving)', 98, 'Y', '兒菜炒臘肉.jpg', 'stir_fry'),
	(160, '酸辣土豆絲（份）', '酸辣土豆丝（份）', 'Spicy and Sour Shredded Potatoes(A Serving)', 68, 'Y', '酸辣土豆絲.jpg', 'stir_fry'),
	(161, '薑蔥雪花牛肉（份）', '姜葱雪花牛肉（份）', 'Ginger and Scallion Beef(A Serving)', 198, 'Y', '薑蔥雪花牛肉.jpg', 'stir_fry'),
	(162, '夾沙肉（份）', '夹沙肉（份）', 'Stuffed Belly Pork(A Serving)', 88, 'Y', '夾沙肉.jpg', 'stir_fry'),
	(163, '淮山炒木耳（份）', '淮山炒木耳（份）', 'Stir Fried Huai Shan with Black Fungus(A Serving)', 78, 'Y', '淮山炒木耳.jpg', 'stir_fry'),
	(164, '農家小炒肉（份）', '农家小炒肉（份）', 'Home-style Stir Fried Pork(A Serving)', 88, 'Y', '農家小炒肉.jpg', 'stir_fry'),
	(165, '藕片炒肉（份）', '藕片炒肉（份）', 'Stir Fried Lotus Root Slices with Pork(A Serving)', 88, 'Y', '藕片炒肉.jpg', 'stir_fry'),
	(166, '青椒炒肉（份）', '青椒炒肉（份）', 'Stir Fried Green Peppers with Pork(A Serving)', 68, 'Y', '青椒炒肉.jpg', 'stir_fry'),
	(167, '苦瓜炒肉（份）', '苦瓜炒肉（份）', 'Stir Fried Bitter Melon with Pork(A Serving)', 88, 'Y', '苦瓜炒肉.jpg', 'stir_fry');

DROP TABLE IF EXISTS `spiciness_levels`;
CREATE TABLE IF NOT EXISTS `spiciness_levels` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name_zh_TW` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `name_zh_CN` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `name_en_US` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='辣度';

DELETE FROM `spiciness_levels`;
INSERT INTO `spiciness_levels` (`id`, `name_zh_TW`, `name_zh_CN`, `name_en_US`) VALUES
	(1, '小辣', '小辣', 'Mild'),
	(2, '中辣', '中辣', 'Medium'),
	(3, '大辣', '大辣', 'Hot'),
	(4, '特辣', '特辣', 'Special');


	DROP TABLE IF EXISTS `order_status`;
	CREATE TABLE `order_status` (
	  `id` int NOT NULL AUTO_INCREMENT,
	  `status_en_US` varchar(50) NOT NULL,
	  `status_zh_HK` varchar(50) NOT NULL,
	  `status_zh_CN` varchar(50) NOT NULL,
	  PRIMARY KEY (`id`)
	) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
	

	INSERT INTO `order_status` (`id`, `status_en_US`, `status_zh_HK`, `status_zh_CN`) VALUES
	(1, 'Pending', '處理中', '处理中'),
	(2, 'Completed', '已完成', '已完成'),
	(3, 'Cancelled', '已取消', '已取消');

	DROP TABLE IF EXISTS `order`;
	CREATE TABLE `order` (
	  `id` int NOT NULL AUTO_INCREMENT,
	  `order_status_id` int NOT NULL,
	  `table_name` varchar(50) NOT NULL,
	  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
	  `updated_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE current_timestamp,
	  PRIMARY KEY (`id`),
	  FOREIGN KEY (`order_status_id`) REFERENCES `order_status` (`id`)
	) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
	

	DROP TABLE IF EXISTS `order_item`;
	CREATE TABLE `order_item` (
	  `id` int NOT NULL AUTO_INCREMENT,
	  `order_id` int NOT NULL,
	  `dish_id` int NOT NULL,
	  `quantity` int NOT NULL,
	  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
	  `updated_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE current_timestamp,
	  PRIMARY KEY (`id`),
	  FOREIGN KEY (`order_id`) REFERENCES `order` (`id`),
	  FOREIGN KEY (`dish_id`) REFERENCES `menu` (`id`)
	) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
