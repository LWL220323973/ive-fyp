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
	(1, '12345678', 'admin', '$2a$10$CmL8d8kv2y2pMgpgTZThE.xeaCZx1nzD5epgyWWVaodS8Gak6WBou', 'Admin_01', '管理員_1號', '28935767', 'admin01@gmail.com', '香港快活谷路123號，快活谷', '123 Happy Valley Road, Happy Valley, Hong Kong');

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
	(1, '泡椒肥腸', '泡椒肥肠', 'Pork Intestines stri fried with Pickled Peppers', 168, 'Y', '泡椒肥腸.jpg', 'capsicum_annuum'),
	(2, '泡椒黃喉', '泡椒黄喉', 'Stir Fried Yellow Throat with Pickled Peppers', 168, 'Y', '泡椒黃喉.jpg', 'capsicum_annuum'),
	(3, '泡椒耗兒魚', '泡椒耗儿鱼', 'Stir Fried Smelt Fish with Pickled Peppers', 168, 'Y', '泡椒耗兒魚.jpg', 'capsicum_annuum'),
	(4, '泡椒脆腸', '泡椒脆肠', 'Stir Fried Crispy Intestines with Pickled Peppers', 168, 'Y', '泡椒脆腸.jpg', 'capsicum_annuum'),
	(5, '泡椒魔芋', '泡椒魔芋', 'Stir Fried Konjac with Pickled Peppers', 78, 'Y', '泡椒魔芋.jpg', 'capsicum_annuum'),
	(6, '泡椒腰花', '泡椒腰花', 'Stir Fried Pork Kidneys with Pickled Peppers', 88, 'Y', '泡椒腰花.jpg', 'capsicum_annuum'),
	(7, '泡椒魚卜', '泡椒鱼卜', 'Stir Fried Fish Maw with Pickled Peppers', 98, 'Y', '泡椒魚卜.jpg', 'capsicum_annuum'),
	(8, '泡椒雞腎', '泡椒鸡肾', 'Stir Fried Chicken Kidneys with Pickled Peppers', 78, 'Y', '泡椒雞腎.jpg', 'capsicum_annuum'),
	(9, '泡椒田雞', '泡椒田鸡', 'Stir Fried Frog with Pickled Peppers', 168, 'Y', '泡椒田雞.jpg', 'capsicum_annuum'),
	(10, '泡椒豬潤', '泡椒猪润', 'Stir Fried Pork Intestines with Pickled Peppers', 88, 'Y', '泡椒豬潤.jpg', 'capsicum_annuum'),
	(11, '涼拌青瓜', '凉拌青瓜', 'Shredded Cucumber with Sauce', 38, 'Y', '涼拌青瓜.jpg', 'cold_food'),
	(12, '涼拌秋葵', '凉拌秋葵', 'Shredded Orka with Sauce', 38, 'Y', '涼拌秋葵.jpg', 'cold_food'),
	(13, '涼拌豆干', '凉拌豆干', 'Cold Dried Tofu', 48, 'Y', '涼拌豆干.jpg', 'cold_food'),
	(14, '涼拌藕片', '凉拌藕片', 'Cold-Spiced Lotus Root Slices', 48, 'Y', '涼拌藕片.jpg', 'cold_food'),
	(15, '尖椒皮蛋', '尖椒皮蛋', 'Spicy Pepper Preserved Egg', 48, 'Y', '尖椒皮蛋.jpg', 'cold_food'),
	(16, '口水雞', '口水鸡', 'Saliva Chicken', 58, 'Y', '口水雞.jpg', 'cold_food'),
	(17, '夫妻肺片', '夫妻肺片', 'Sliced Beef and Ox Tongue in Chili Sauce', 58, 'Y', '夫妻肺片.jpg', 'cold_food'),
	(18, '四川臘腸', '四川腊肠', 'Sichuan Sausage', 88, 'Y', '四川臘腸.jpg', 'cold_food'),
	(19, '藤椒魚皮', '藤椒鱼皮', 'Rattan Pepper Fish Skin', 68, 'Y', '藤椒魚皮.jpg', 'cold_food'),
	(20, '麻辣牛腱', '麻辣牛腱', 'Spicy Beef Shank', 68, 'Y', '麻辣牛腱.jpg', 'cold_food'),
	(21, '涼拌蕨根粉', '凉拌蕨根粉', 'Shredded fern root noodles', 68, 'Y', '涼拌蕨根粉.jpg', 'cold_food'),
	(22, '香辣酥肉', '香辣酥肉', 'Spicy Deep-Fired Crispy Pork', 88, 'Y', '香辣酥肉.jpg', 'cold_food'),
	(23, '黑糖糍粑', '黑糖糍粑', 'Rice Cakes with Brown Sugar', 68, 'Y', '黑糖糍粑.jpg', 'cold_food'),
	(24, '涼拌萵筍絲', '凉拌莴笋丝', 'Stem Lettuce Salad', 48, 'Y', '涼拌萵筍絲.jpg', 'cold_food'),
	(25, '涼拌土豆絲', '凉拌土豆丝', 'Chinese Potato Salad', 48, 'Y', '涼拌土豆絲.jpg', 'cold_food'),
	(26, '涼拌豬肚絲', '凉拌猪肚丝', 'Cold shredded pork belly', 58, 'Y', '涼拌豬肚絲.jpg', 'cold_food'),
	(27, '紅油豬耳', '红油猪耳', 'Pig Ear in in Hot and Spicy Sauce', 58, 'Y', '紅油豬耳.jpg', 'cold_food'),
	(28, '泡椒雞腳', '泡椒鸡脚', 'Chicken Feet with Pickled Pepper', 58, 'Y', '泡椒雞腳.jpg', 'cold_food'),
	(29, '川北涼粉', '川北凉粉', 'Tossed Clear Noodles with Chili Sauce', 48, 'Y', '川北涼粉.jpg', 'cold_food'),
	(30, '涼拌長豆角', '凉拌长豆角', 'Shredded Chinese Long Bean with Sauce', 48, 'Y', '涼拌長豆角.jpg', 'cold_food'),
	(31, '豆花', '豆花', 'Tofu Pudding', 58, 'Y', '豆花.jpg', 'cold_food'),
	(32, '烏龍茶', '乌龙茶', 'Oolong', 15, 'Y', '烏龍茶.jpg', 'drink'),
	(33, '菊花茶', '菊花茶', 'Chrysanthemum Tea', 15, 'Y', '菊花茶.jpg', 'drink'),
	(34, '竹蔗水', '竹蔗水', 'Bamboo cane Water', 15, 'Y', '竹蔗水.jpg', 'drink'),
	(35, '天地壹號（罐裝）', '天地壹号（罐装）', 'Tian Di No.1(Canned)', 20, 'Y', '天地壹號（罐裝）.jpg', 'drink'),
	(36, '加多寶（罐裝）', '加多宝（罐装）', 'Jia Duo Bao(Canned)', 15, 'Y', '加多寶（罐裝）.jpg', 'drink'),
	(37, '可樂（罐裝）', '可乐（罐装）', 'Coke(Canned)', 15, 'Y', '可樂（罐裝）.jpg', 'drink'),
	(38, '七喜（罐裝）', '七喜（罐裝）', '7-Up (Canned)', 15, 'Y', '七喜（罐裝）.jpg', 'drink'),
	(39, '雪碧（罐裝）', '雪碧（罐装）', 'Sprite (Canned)', 15, 'Y', '雪碧（罐裝）.jpg', 'drink'),
	(40, '玉泉忌廉（罐裝）', '玉泉忌廉（罐装）', 'Schweppes Cream Soda(Canned)', 15, 'Y', '玉泉忌廉（罐裝）.jpg', 'drink'),
	(41, '無糖可樂（罐裝）', '无糖可乐（罐装）', 'Coca-Cola No Sugar(Canned)', 15, 'Y', '無糖可樂（罐裝）.jpg', 'drink'),
	(42, '芬達橙味（罐裝）', '芬达橙味（罐装）', 'Fanta Orange(Canned)', 15, 'Y', '芬達橙味（罐裝）.jpg', 'drink'),
	(43, '礦泉水', '矿泉水', 'Mineral Water', 10, 'Y', '礦泉水.jpg', 'drink'),
	(44, '維他檸檬茶', '维他柠檬茶', 'Vita Lemon Tea', 12, 'Y', '維他檸檬茶.jpg', 'drink'),
	(45, '青島（大樽）', '青岛（大瓶）', 'Tsingtao Beer(Large)', 28, 'Y', '（大樽）青島.jpg', 'drink'),
	(46, '藍妹（大樽）', '蓝妹（大瓶）', 'Blue Girl Beer(Large)', 28, 'Y', '（大樽）藍妹.jpg', 'drink'),
	(47, '江小白', '江小白', 'Jiang Xiaobai', 58, 'Y', '江小白.jpg', 'drink'),
	(48, 'Hoegaarden', '豪格登', 'Hoegaarden', 42, 'Y', 'Hoegaarden.jpg', 'drink'),
	(49, '雪花啤酒', '雪花啤酒', 'Snow Beer', 20, 'Y', '雪花啤酒.jpg', 'drink'),
	(50, '哈爾濱啤酒', '哈尔滨啤酒', 'Harbin Beer', 25, 'Y', '哈爾濱啤酒.jpg', 'drink'),
	(51, '生力黑啤（大樽）', '生力黑啤（大瓶）', 'San Miguel Cerveza Negra(Large)', 38, 'Y', '（大樽）生力黑啤.jpg', 'drink'),
	(52, '真露燒酒', '真露烧酒', 'Jinro-Clhamisul Soju', 40, 'Y', '真露燒酒.jpg', 'drink'),
	(53, '萵筍', '莴笋', 'Celtuce', 38, 'Y', '萵筍.jpg', 'side_dish'),
	(54, '淮山', '山药', 'Common Yam Rhizome', 38, 'Y', '淮山.jpg', 'side_dish'),
	(55, '鮮木耳', '鲜木耳', 'Wood Ear', 28, 'Y', '鮮木耳.jpg', 'side_dish'),
	(56, '油麥菜', '油麦菜', 'Indian Lettuce', 28, 'Y', '油麥菜.jpg', 'side_dish'),
	(57, '娃娃菜', '娃娃菜', 'Baby Cabbage', 28, 'Y', '娃娃菜.jpg', 'side_dish'),
	(58, '豆卜', '豆卜', 'Tofu Puff', 38, 'Y', '豆卜.jpg', 'side_dish'),
	(59, '幼薯粉', '幼薯粉', 'Potato Starch Noodles', 28, 'Y', '幼薯粉.jpg', 'side_dish'),
	(60, '豬紅', '猪红', 'Curdled Pig\'s Blood', 28, 'Y', '豬紅.jpg', 'side_dish'),
	(61, '黑椒牛丸', '黑椒牛丸', 'Black Pepper Beef ', 45, 'Y', '黑椒牛丸.jpg', 'side_dish'),
	(62, '牛肉丸', '牛肉丸', 'Beef Ball', 45, 'Y', '牛肉丸.jpg', 'side_dish'),
	(63, '豬肉丸', '猪肉丸', 'Pork Ball', 45, 'Y', '豬肉丸.jpg', 'side_dish'),
	(64, '牛筋丸', '牛筋丸', 'Beef Tendon Ball', 45, 'Y', '牛筋丸.jpg', 'side_dish'),
	(65, '芝士丸', '芝士丸', 'Fish Ball with Cheese Stuffing', 45, 'Y', '芝士丸.jpg', 'side_dish'),
	(66, '墨魚丸', '墨鱼丸', 'Cuttlefish Flavour Fish Ball', 45, 'Y', '墨魚丸.jpg', 'side_dish'),
	(67, '花枝丸', '花枝丸', 'Cuttlefish Flavour Fish Ball in Taiwanese Style', 45, 'Y', '花枝丸.jpg', 'side_dish'),
	(68, '芝士腸', '芝士肠', 'Cheese Cocktail Sausage', 42, 'Y', '芝士腸.jpg', 'side_dish'),
	(69, '肥牛', '肥牛', 'Sliced Beef', 58, 'Y', '肥牛.jpg', 'side_dish'),
	(70, '午餐肉', '午餐肉', 'Luncheon', 42, 'Y', '午餐肉.jpg', 'side_dish'),
	(71, '酸豆角', '酸豆角', 'Sour Chinese Long Bean', 38, 'Y', '酸豆角.jpg', 'side_dish'),
	(72, '魚卜', '鱼卜', 'Fish Maw', 68, 'Y', '魚卜.jpg', 'side_dish'),
	(73, '肥腸', '肥肠', 'Pig Intestine', 88, 'Y', '肥腸.jpg', 'side_dish'),
	(74, '土豆片', '土豆片', 'Potato Chips', 28, 'Y', '土豆片.jpg', 'side_dish'),
	(75, '藕片', '藕片', 'Lotus Root Slices', 38, 'Y', '藕片.jpg', 'side_dish'),
	(76, '腐竹', '腐竹', 'Dried Beancurd Sticks', 38, 'Y', '腐竹.jpg', 'side_dish'),
	(77, '海帶', '海带', 'Kelp', 28, 'Y', '海帶.jpg', 'side_dish'),
	(78, '生菜', '生菜', 'Lettuce', 28, 'Y', '生菜.jpg', 'side_dish'),
	(79, '洋蔥', '洋葱', 'Onion', 38, 'Y', '洋蔥.jpg', 'side_dish'),
	(80, '豆腐', '豆腐', 'Tofu', 28, 'Y', '豆腐.jpg', 'side_dish'),
	(81, '寬粉', '宽粉', 'Wide Rice Noodles', 28, 'Y', '寬粉.jpg', 'side_dish'),
	(82, '魔芋', '魔芋', 'Konjac', 38, 'Y', '魔芋.jpg', 'side_dish'),
	(83, '貢丸', '贡丸', 'Gongwan Meatballs', 45, 'Y', '貢丸.jpg', 'side_dish'),
	(84, '手切牛肉', '手切牛肉', 'Hand-Sliced Beef', 168, 'Y', '手切牛肉.jpg', 'side_dish'),
	(85, '豆皮', '豆皮', 'Tofu Skin', 38, 'Y', '豆皮.jpg', 'side_dish'),
	(86, '腰花', '腰花', 'Pork Kidney', 58, 'Y', '腰花.jpg', 'side_dish'),
	(87, '兒菜', '儿菜', 'B. j. var. Gemminfera', 38, 'Y', '兒菜.jpg', 'side_dish'),
	(88, '豬潤', '猪润', 'Pork Liver', 48, 'Y', '豬潤.jpg', 'side_dish'),
	(89, '牛百葉', '牛百叶', 'Beef Omasum', 58, 'Y', '牛百葉.jpg', 'side_dish'),
	(90, '雞腎', '鸡肾', 'Chicken Gizzard', 48, 'Y', '雞腎.jpg', 'side_dish'),
	(91, '清江魚', '清江鱼', 'Steamed Mandarin Fish', 378, 'Y', '清江魚.jpg', 'signature_dish'),
	(92, '紙包魚(大)', '纸包鱼（大）', 'Steamed Fish in Paper (Large)', 238, 'Y', '紙包魚(大).jpg', 'signature_dish'),
	(93, '紙包魚(小)', '纸包鱼（小）', 'Steamed Fish in Paper (Small)', 218, 'Y', '紙包魚(小).jpg', 'signature_dish'),
	(94, '紙包魚(整條)', '纸包鱼（整条）', 'Steamed Fish in Paper (1 piece)', 408, 'Y', '紙包魚(整條).jpg', 'signature_dish'),
	(95, '紙包海鱸魚(整條)', '纸包海鲈鱼（整条）', 'Steamed Sea Bass in Paper (1 piece)', 378, 'Y', '紙包海鱸魚(整條).jpg', 'signature_dish'),
	(96, '酸菜魚(半條)', '酸菜鱼（半条）', 'Sour and Spicy Fish (Half fish)', 268, 'Y', '酸菜魚(半條).jpg', 'signature_dish'),
	(97, '金湯魚片', '金汤鱼片', 'Fish Fillet in Golden Soup', 268, 'Y', '金湯魚片.jpg', 'signature_dish'),
	(98, '水煮魚(整條)', '水煮鱼（整条）', 'Boiled Fish (Whole fish)', 468, 'Y', '水煮魚(整條).jpg', 'signature_dish'),
	(99, '水煮魚(半條)', '水煮鱼（半条）', 'Boiled Fish (Half fish)', 268, 'Y', '水煮魚(半條).jpg', 'signature_dish'),
	(100, '酸菜魚(整條)', '酸菜鱼（整条）', 'Sour and Spicy Fish (Whole fish)', 468, 'Y', '酸菜魚(整條).jpg', 'signature_dish'),
	(101, '酸菜魚(半條)', '酸菜鱼（半条）', 'Sour and Spicy Fish (Half fish)', 268, 'Y', '酸菜魚(半條).jpg', 'signature_dish'),
	(102, '酸菜海鱸魚(整條)', '酸菜海鲈鱼（整条）', 'Sour and Spicy Sea Bass (Whole fish)', 468, 'Y', '酸菜海鱸魚(整條).jpg', 'signature_dish'),
	(103, '酸菜海鱸魚(半條)', '酸菜海鲈鱼（半条）', 'Sour and Spicy Sea Bass (Half fish)', 268, 'Y', '酸菜海鱸魚(半條).jpg', 'signature_dish'),
	(104, '金湯海鱸魚(例)', '金汤海鲈鱼（例）', 'Sea Bass in Golden Soup (Portion)', 238, 'Y', '金湯海鱸魚(例).jpg', 'signature_dish'),
	(105, '水煮海鱸魚(整條)', '水煮海鲈鱼（整条）', 'Boiled Sea Bass (Whole fish)', 468, 'Y', '水煮海鱸魚(整條).jpg', 'signature_dish'),
	(106, '水煮海鱸魚(半條)', '水煮海鲈鱼（半条）', 'Boiled Sea Bass (Half fish)', 238, 'Y', '水煮海鱸魚(半條).jpg', 'signature_dish'),
	(107, '毛血旺', '毛血旺', 'Spicy Hot Pot with Blood Curd', 158, 'Y', '毛血旺.jpg', 'signature_dish'),
	(108, '麻辣蝦', '麻辣虾', 'Spicy Sichuan Shrimp', 188, 'Y', '麻辣蝦.jpg', 'signature_dish'),
	(109, '水煮牛肉', '水煮牛肉', 'Boiled Beef Slices', 198, 'Y', '水煮牛肉.jpg', 'signature_dish'),
	(110, '水煮肥牛', '水煮肥牛', 'Boiled Sliced Beef Brisket', 158, 'Y', '水煮肥牛.jpg', 'signature_dish'),
	(111, '水煮田雞', '水煮田鸡', 'Boiled Frog', 168, 'Y', '水煮田雞.jpg', 'signature_dish'),
	(112, '水煮肉片', '水煮肉片', 'Boiled Pork Slices', 198, 'Y', '水煮肉片.jpg', 'signature_dish'),
	(113, '啤酒鴨(整隻)', '啤酒鸭（整只）', 'Beer Duck (Whole duck)', 318, 'Y', '啤酒鴨(整隻).jpg', 'signature_dish'),
	(114, '啤酒鴨(半隻)', '啤酒鸭（半只）', 'Beer Duck (Half duck)', 188, 'Y', '啤酒鴨(半隻).jpg', 'signature_dish'),
	(115, '奇味雞煲(整隻)', '奇味鸡煲（整只）', 'Flavorful Chicken Hot Pot (Whole Chicken)', 268, 'Y', '奇味雞煲(整隻).jpg', 'signature_dish'),
	(116, '奇味雞煲(半隻)', '奇味鸡煲（半只）', 'Flavorful Chicken Hot Pot (Half Chicken)', 158, 'Y', '奇味雞煲(半隻).jpg', 'signature_dish'),
	(117, '麻辣雞煲(整隻)', '麻辣鸡煲（整只）', 'Spicy Chicken Hot Pot (Whole Chicken)', 268, 'Y', '麻辣雞煲(整隻).jpg', 'signature_dish'),
	(118, '麻辣雞煲(半隻)', '麻辣鸡煲（半只）', 'Spicy Chicken Hot Pot (Half Chicken)', 158, 'Y', '麻辣雞煲(半隻).jpg', 'signature_dish'),
	(119, '紅油抄手', '红油抄手', 'Wonton Soup in Hot and Spicy Sauce', 35, 'Y', '紅油抄手.jpg', 'staple_food'),
	(120, '重慶酸辣粉', '重庆酸辣粉', 'Chongqing Hot and Sour Rice Noodles', 26, 'Y', '重慶酸辣粉.jpg', 'staple_food'),
	(121, '重慶酸辣麵', '重庆酸辣面', 'Chongqing Hot and Sour Noodles', 26, 'Y', '重慶酸辣麵.jpg', 'staple_food'),
	(122, '白飯', '白饭', 'Rice', 10, 'Y', '白飯.jpg', 'staple_food'),
	(123, '蛋炒飯', '蛋炒饭', 'Egg Fried Rice', 26, 'Y', '蛋炒飯.jpg', 'staple_food'),
	(124, '螞蟻上樹', '蚂蚁上树', 'spicy vermicelli stir-fry', 58, 'Y', '螞蟻上樹.jpg', 'stir_fry'),
	(125, '辣子雞', '辣子鸡', 'Spicy Chicken', 158, 'Y', '辣子雞.jpg', 'stir_fry'),
	(126, '尖椒雞(半隻)', '尖椒鸡(半只)', 'Half Spicy Chicken with Bell Peppers', 178, 'Y', '尖椒雞(半隻).jpg', 'stir_fry'),
	(127, '尖椒雞(整隻)', '尖椒鸡(整只)', 'Whole Spicy Chicken with Bell Peppers', 318, 'Y', '尖椒雞(整隻).jpg', 'stir_fry'),
	(128, '梅菜扣肉', '梅菜扣肉', 'Braised Pork Belly with Preserved Mustard Greens', 88, 'Y', '梅菜扣肉.jpg', 'stir_fry'),
	(129, '西芹炒豆干', '西芹炒豆干', 'Stir Fried Celery with Tofu', 78, 'Y', '西芹炒豆干.jpg', 'stir_fry'),
	(130, '酸豆角炒豆干', '酸豆角炒豆干', 'Stir Fried Green Beans with Tofu and Pickled Green Beans', 78, 'Y', '酸豆角炒豆干.jpg', 'stir_fry'),
	(131, '粉蒸肉', '粉蒸肉', 'Steamed Pork with Rice Flour', 88, 'Y', '粉蒸肉.jpg', 'stir_fry'),
	(132, '尖椒豬肚', '尖椒猪肚', 'Stir Fried Pork Stomach with Bell Peppers', 88, 'Y', '尖椒豬肚.jpg', 'stir_fry'),
	(133, '白油肚條', '白油肚条', 'Stir Fried Pork Tripe in White Sauce', 88, 'Y', '白油肚條.jpg', 'stir_fry'),
	(134, '辣子雞軟骨', '辣子鸡软骨', 'Spicy Chicken Cartilage', 168, 'Y', '辣子雞軟骨.jpg', 'stir_fry'),
	(135, '干煸肥腸', '干煸肥肠', 'Stir Fried Pig Intestine', 168, 'Y', '干煸肥腸.jpg', 'stir_fry'),
	(136, '大碗花菜', '大碗花菜', 'Stir Fried Cauliflower', 78, 'Y', '大碗花菜.jpg', 'stir_fry'),
	(137, '干煸耗兒魚', '干煸耗儿鱼', 'Stir Fried Dried Fish', 168, 'Y', '干煸耗兒魚.jpg', 'stir_fry'),
	(138, '鹹蛋黃土豆絲', '咸蛋黄土豆丝', 'Salted Egg Yolk Shredded Potatoes', 78, 'Y', '鹹蛋黃土豆絲.jpg', 'stir_fry'),
	(139, '鹹蛋黃炒蝦', '咸蛋黄炒虾', 'Salted Egg Yolk Stir Fried Shrimp', 188, 'Y', '鹹蛋黃炒蝦.jpg', 'stir_fry'),
	(140, '家常豆腐', '家常豆腐', 'Home-style Tofu', 78, 'Y', '家常豆腐.jpg', 'stir_fry'),
	(141, '清炒兒菜', '清炒儿菜', 'Stir Fried Baby Vegetables', 78, 'Y', '清炒兒菜.jpg', 'stir_fry'),
	(142, '清炒土豆絲', '清炒土豆丝', 'Stir Fried Shredded Potatoes', 68, 'Y', '清炒土豆絲.jpg', 'stir_fry'),
	(143, '熗炒土豆絲', '炝炒土豆丝', 'Stir Fried Shredded Potatoes', 68, 'Y', '熗炒土豆絲.jpg', 'stir_fry'),
	(144, '清炒娃娃菜', '清炒娃娃菜', 'Stir Fried Baby Bok Choy', 68, 'Y', '清炒娃娃菜.jpg', 'stir_fry'),
	(145, '熗炒娃娃菜', '炝炒娃娃菜', 'Stir Fried Baby Bok Choy (Spicy)', 68, 'Y', '熗炒娃娃菜.jpg', 'stir_fry'),
	(146, '手撕包菜', '手撕包菜', 'Hand-Torn Cabbage', 68, 'Y', '手撕包菜.jpg', 'stir_fry'),
	(147, '蒜苗炒臘肉', '蒜苗炒腊肉', 'Stir Fried Garlic Sprouts with Bacon', 98, 'Y', '蒜苗炒臘肉.jpg', 'stir_fry'),
	(148, '番茄炒蛋', '番茄炒蛋', 'Stir Fried Tomatoes with Eggs', 68, 'Y', '番茄炒蛋.jpg', 'stir_fry'),
	(149, '麻婆豆腐', '麻婆豆腐', 'Mapo Tofu', 68, 'Y', '麻婆豆腐.jpg', 'stir_fry'),
	(150, '干煸四季豆', '干煸四季豆', 'Dry-Fried Green Beans', 78, 'Y', '干煸四季豆.jpg', 'stir_fry'),
	(151, '川式回鍋肉', '川式回锅肉', 'Sichuan Twice-Cooked Pork', 88, 'Y', '川式回鍋肉.jpg', 'stir_fry'),
	(152, '豆豉鯪魚油麥菜', '豆豉鲮鱼油麦菜', 'Stir Fried Water Spinach with Fermented Black Beans and Silver Fish', 78, 'Y', '豆豉鯪魚油麥菜.jpg', 'stir_fry'),
	(153, '清炒時蔬', '清炒时蔬', 'Stir Fried Seasonal Vegetables', 68, 'Y', '清炒時蔬.jpg', 'stir_fry'),
	(154, '酸豆角肉沫', '酸豆角肉沫', 'Stir Fried Minced Pork with Pickled Green Beans', 78, 'Y', '酸豆角肉沫.jpg', 'stir_fry'),
	(155, '泡椒雞腎', '泡椒鸡肾', 'Stir Fried Chicken Kidneys with Pickled Peppers', 78, 'Y', '泡椒雞腎.jpg', 'stir_fry'),
	(156, '萵筍炒肉絲', '莴笋炒肉丝', 'Stir Fried Pork with Lettuce Stem', 88, 'Y', '萵筍炒肉絲.jpg', 'stir_fry'),
	(157, '清炒萵筍絲', '清炒莴笋丝', 'Stir Fried Shredded Lettuce Stem', 78, 'Y', '清炒萵筍絲.jpg', 'stir_fry'),
	(158, '花菜炒臘肉', '花菜炒腊肉', 'Stir Fried Cauliflower with Bacon', 98, 'Y', '花菜炒臘肉.jpg', 'stir_fry'),
	(159, '兒菜炒臘肉', '儿菜炒腊肉', 'Stir Fried Baby Bok Choy with Bacon', 98, 'Y', '兒菜炒臘肉.jpg', 'stir_fry'),
	(160, '酸辣土豆絲', '酸辣土豆丝', 'Spicy and Sour Shredded Potatoes', 68, 'Y', '酸辣土豆絲.jpg', 'stir_fry'),
	(161, '薑蔥雪花牛肉', '姜葱雪花牛肉', 'Ginger and Scallion Beef', 198, 'Y', '薑蔥雪花牛肉.jpg', 'stir_fry'),
	(162, '夾沙肉', '夹沙肉', 'Stuffed Belly Pork', 88, 'Y', '夾沙肉.jpg', 'stir_fry'),
	(163, '淮山炒木耳', '淮山炒木耳', 'Stir Fried Huai Shan with Black Fungus', 78, 'Y', '淮山炒木耳.jpg', 'stir_fry'),
	(164, '農家小炒肉', '农家小炒肉', 'Home-style Stir Fried Pork', 88, 'Y', '農家小炒肉.jpg', 'stir_fry'),
	(165, '藕片炒肉', '藕片炒肉', 'Stir Fried Lotus Root Slices with Pork', 88, 'Y', '藕片炒肉.jpg', 'stir_fry'),
	(166, '青椒炒肉', '青椒炒肉', 'Stir Fried Green Peppers with Pork', 68, 'Y', '青椒炒肉.jpg', 'stir_fry'),
	(167, '苦瓜炒肉', '苦瓜炒肉', 'Stir Fried Bitter Melon with Pork', 88, 'Y', '苦瓜炒肉.jpg', 'stir_fry');

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

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
