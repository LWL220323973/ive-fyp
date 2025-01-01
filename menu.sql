SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE DATABASE IF NOT EXISTS `menu` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `menu`;

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `username` varchar(10) NOT NULL COMMENT 'username',
  `password` varchar(10) NOT NULL COMMENT 'password'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='管理員';

INSERT INTO `admin` (`username`, `password`) VALUES
('root', 'root_root');

DROP TABLE IF EXISTS `capsicum_annuum`;
CREATE TABLE IF NOT EXISTS `capsicum_annuum` (
  `Name_zh_HK` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Name_zh_CN` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Name_en_US` varchar(150) NOT NULL,
  `price` int(11) NOT NULL,
  `onSale` int(1) UNSIGNED ZEROFILL NOT NULL COMMENT '0= onsale, 1= non -sale',
  `path` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='泡椒類';

INSERT INTO `capsicum_annuum` (`Name_zh_HK`, `Name_zh_CN`, `Name_en_US`, `price`, `onSale`, `path`) VALUES
('泡椒肥腸', '泡椒肥肠', 'Pork Intestines stri fried with Pickled Peppers', 168, 0, '泡椒肥腸.jpg'),
('泡椒黃喉', '泡椒黄喉', 'Stir Fried Yellow Throat with Pickled Peppers', 168, 0, '泡椒黃喉.jpg'),
('泡椒耗兒魚', '泡椒耗儿鱼', 'Stir Fried Smelt Fish with Pickled Peppers', 168, 0, '泡椒耗兒魚.jpg'),
('泡椒脆腸', '泡椒脆肠', 'Stir Fried Crispy Intestines with Pickled Peppers', 168, 0, '泡椒脆腸.jpg'),
('泡椒魔芋', '泡椒魔芋', 'Stir Fried Konjac with Pickled Peppers', 78, 0, '泡椒魔芋.jpg'),
('泡椒腰花', '泡椒腰花', 'Stir Fried Pork Kidneys with Pickled Peppers', 88, 0, '泡椒腰花.jpg'),
('泡椒魚卜', '泡椒鱼卜', 'Stir Fried Fish Maw with Pickled Peppers', 98, 0, '泡椒魚卜.jpg'),
('泡椒雞腎', '泡椒鸡肾', 'Stir Fried Chicken Kidneys with Pickled Peppers', 78, 0, '泡椒雞腎.jpg'),
('泡椒田雞', '泡椒田鸡', 'Stir Fried Frog with Pickled Peppers', 168, 0, '泡椒田雞.jpg'),
('泡椒豬潤', '泡椒猪润', 'Stir Fried Pork Intestines with Pickled Peppers', 88, 0, '泡椒豬潤.jpg');

DROP TABLE IF EXISTS `cold_food`;
CREATE TABLE IF NOT EXISTS `cold_food` (
  `Name_zh_HK` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Name_zh_CN` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Name_en_US` varchar(150) NOT NULL,
  `price` int(11) NOT NULL,
  `onSale` int(1) UNSIGNED ZEROFILL NOT NULL COMMENT '0= onsale, 1= non -sale',
  `path` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='涼菜';

INSERT INTO `cold_food` (`Name_zh_HK`, `Name_zh_CN`, `Name_en_US`, `price`, `onSale`, `path`) VALUES
('涼拌青瓜', '凉拌青瓜', 'Shredded Cucumber with Sauce', 38, 0, '涼拌青瓜.jpg'),
('涼拌秋葵', '凉拌秋葵', 'Shredded Orka with Sauce', 38, 0, '涼拌秋葵.jpg'),
('涼拌豆干', '凉拌豆干', 'Cold Dried Tofu', 48, 0, '涼拌豆干.jpg'),
('涼拌藕片', '凉拌藕片', 'Cold-Spiced Lotus Root Slices', 48, 0, '涼拌藕片.jpg'),
('尖椒皮蛋', '尖椒皮蛋', 'Spicy Pepper Preserved Egg', 48, 0, '尖椒皮蛋.jpg'),
('口水雞', '口水鸡', 'Saliva Chicken', 58, 0, '口水雞.jpg'),
('夫妻肺片', '夫妻肺片', 'Sliced Beef and Ox Tongue in Chili Sauce', 58, 0, '夫妻肺片.jpg'),
('四川臘腸', '四川腊肠', 'Sichuan Sausage', 88, 0, '四川臘腸.jpg'),
('藤椒魚皮', '藤椒鱼皮', 'Rattan Pepper Fish Skin', 68, 0, '藤椒魚皮.jpg'),
('麻辣牛腱', '麻辣牛腱', 'Spicy Beef Shank', 68, 0, '麻辣牛腱.jpg'),
('涼拌蕨根粉', '凉拌蕨根粉', 'Shredded fern root noodles', 68, 0, '涼拌蕨根粉.jpg'),
('香辣酥肉', '香辣酥肉', 'Spicy Deep-Fired Crispy Pork', 88, 0, '香辣酥肉.jpg'),
('黑糖糍粑', '黑糖糍粑', 'Rice Cakes with Brown Sugar', 68, 0, '黑糖糍粑.jpg'),
('涼拌萵筍絲', '凉拌莴笋丝', 'Stem Lettuce Salad', 48, 0, '涼拌萵筍絲.jpg'),
('涼拌土豆絲', '凉拌土豆丝', 'Chinese Potato Salad', 48, 0, '涼拌土豆絲.jpg'),
('涼拌豬肚絲', '凉拌猪肚丝', 'Cold shredded pork belly', 58, 0, '涼拌豬肚絲.jpg'),
('紅油豬耳', '红油猪耳', 'Pig Ear in in Hot and Spicy Sauce', 58, 0, '紅油豬耳.jpg'),
('泡椒雞腳', '泡椒鸡脚', 'Chicken Feet with Pickled Pepper', 58, 0, '泡椒雞腳.jpg'),
('川北涼粉', '川北凉粉', 'Tossed Clear Noodles with Chili Sauce', 48, 0, '川北涼粉.jpg'),
('涼拌長豆角', '凉拌长豆角', 'Shredded Chinese Long Bean with Sauce', 48, 0, '涼拌長豆角.jpg'),
('豆花', '豆花', 'Tofu Pudding', 58, 0, '豆花.jpg');

DROP TABLE IF EXISTS `drinks`;
CREATE TABLE IF NOT EXISTS `drinks` (
  `Name_zh_HK` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Name_zh_CN` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Name_en_US` varchar(50) NOT NULL,
  `price` int(11) NOT NULL,
  `onSale` int(1) UNSIGNED ZEROFILL NOT NULL COMMENT '0= onsale, 1= non -sale',
  `path` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='酒水';

INSERT INTO `drinks` (`Name_zh_HK`, `Name_zh_CN`, `Name_en_US`, `price`, `onSale`, `path`) VALUES
('烏龍茶', '乌龙茶', 'oolong', 15, 0, '烏龍茶.jpg'),
('菊花茶', '菊花茶', 'Chrysanthemum tea', 15, 0, '菊花茶.jpg'),
('竹蔗水', '竹蔗水', 'Bamboo cane water', 15, 0, '竹蔗水.jpg'),
('天地壹號（罐裝）', '天地壹号（罐装）', 'Tian Di No.1(canned)', 20, 0, '天地壹號（罐裝）.jpg'),
('加多寶（罐裝）', '加多宝（罐装）', 'Jia Duo Bao(canned)', 15, 0, '加多寶（罐裝）.jpg'),
('可樂（罐裝）', '可乐（罐装）', 'Coke(canned)', 15, 0, '可樂（罐裝）.jpg'),
('七喜（罐裝）', '七喜（罐裝）', '7-Up (Canned)', 15, 0, '七喜（罐裝）.jpg'),
('雪碧（罐裝）', '雪碧（罐装）', 'Sprite (canned)', 15, 0, '雪碧（罐裝）.jpg'),
('玉泉忌廉（罐裝）', '玉泉忌廉（罐装）', 'Schweppes Cream Soda(canned)', 15, 0, '玉泉忌廉（罐裝）.jpg'),
('無糖可樂（罐裝）', '无糖可乐（罐装）', 'Coca-Cola No Sugar(canned)', 15, 0, '無糖可樂（罐裝）.jpg'),
('芬達橙味（罐裝）', '芬达橙味（罐装）', 'Fanta Orange(canned)', 15, 0, '芬達橙味（罐裝）.jpg'),
('礦泉水', '矿泉水', 'Mineral water', 10, 0, '礦泉水.jpg'),
('維他檸檬茶', '维他柠檬茶', 'Vita Lemon Tea', 12, 0, '維他檸檬茶.jpg'),
('（大樽）青島', '（大瓶）青岛', '(Large)Tsingtao Beer', 28, 0, '（大樽）青島.jpg'),
('（大樽）藍妹', '（大瓶）蓝妹', '(Large)Blue Girl Beer', 28, 0, '（大樽）藍妹.jpg'),
('江小白', '江小白', 'Jiang Xiaobai', 58, 0, '江小白.jpg'),
('Hoegaarden', '豪格登', 'Hoegaarden', 42, 0, 'Hoegaarden.jpg'),
('雪花啤酒', '雪花啤酒', 'Snow Beer', 20, 0, '雪花啤酒.jpg'),
('哈爾濱啤酒', '哈尔滨啤酒', 'Harbin Beer', 25, 0, '哈爾濱啤酒.jpg'),
('（大樽）生力黑啤', '（大瓶）生力黑啤', '(Large)San Miguel Cerveza Negra', 38, 0, '（大樽）生力黑啤.jpg'),
('真露燒酒', '真露烧酒', 'Jinro-Clhamisul Soju', 40, 0, '真露燒酒.jpg');

DROP TABLE IF EXISTS `side_dish`;
CREATE TABLE IF NOT EXISTS `side_dish` (
  `Name_zh_HK` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Name_zh_CN` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Name_en_US` varchar(50) NOT NULL,
  `price` int(11) NOT NULL,
  `onSale` int(1) UNSIGNED ZEROFILL NOT NULL COMMENT '0= onsale, 1= non -sale',
  `path` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='配菜';

INSERT INTO `side_dish` (`Name_zh_HK`, `Name_zh_CN`, `Name_en_US`, `price`, `onSale`, `path`) VALUES
('萵筍', '莴笋', 'Celtuce', 38, 0, '萵筍.jpg'),
('淮山', '山药', 'Common Yam Rhizome', 38, 0, '淮山.jpg'),
('鮮木耳', '鲜木耳', 'Wood Ear', 28, 0, '鮮木耳.jpg'),
('油麥菜', '油麦菜', 'Indian Lettuce', 28, 0, '油麥菜.jpg'),
('娃娃菜', '娃娃菜', 'Baby Cabbage', 28, 0, '娃娃菜.jpg'),
('豆卜', '豆卜', 'Tofu Puff', 38, 0, '豆卜.jpg'),
('幼薯粉', '幼薯粉', 'Potato Starch Noodles', 28, 0, '幼薯粉.jpg'),
('豬紅', '猪红', 'Curdled Pig\'s Blood', 28, 0, '豬紅.jpg'),
('黑椒牛丸', '黑椒牛丸', 'Black Pepper Beef ', 45, 0, '黑椒牛丸.jpg'),
('牛肉丸', '牛肉丸', 'Beef Ball', 45, 0, '牛肉丸.jpg'),
('豬肉丸', '猪肉丸', 'Pork Ball', 45, 0, '豬肉丸.jpg'),
('牛筋丸', '牛筋丸', 'Beef Tendon Ball', 45, 0, '牛筋丸.jpg'),
('芝士丸', '芝士丸', 'Fish Ball with Cheese Stuffing', 45, 0, '芝士丸.jpg'),
('墨魚丸', '墨鱼丸', 'Cuttlefish Flavour Fish Ball', 45, 0, '墨魚丸.jpg'),
('花枝丸', '花枝丸', 'Cuttlefish Flavour Fish Ball in Taiwanese Style', 45, 0, '花枝丸.jpg'),
('芝士腸', '芝士肠', 'Cheese Cocktail Sausage', 42, 0, '芝士腸.jpg'),
('肥牛', '肥牛', 'SLICED BEEF', 58, 0, '肥牛.jpg'),
('午餐肉', '午餐肉', 'Luncheon', 42, 0, '午餐肉.jpg'),
('酸豆角', '酸豆角', 'Sour Chinese Long Bean', 38, 0, '酸豆角.jpg'),
('魚卜', '鱼卜', 'Fish Maw', 68, 0, '魚卜.jpg'),
('肥腸', '肥肠', 'Pig Intestine', 88, 0, '肥腸.jpg'),
('土豆片', '土豆片', 'potato chips', 28, 0, '土豆片.jpg'),
('藕片', '藕片', 'lotus root slices', 38, 0, '藕片.jpg'),
('腐竹', '腐竹', 'dried beancurd sticks', 38, 0, '腐竹.jpg'),
('海帶', '海带', 'kelp', 28, 0, '海帶.jpg'),
('生菜', '生菜', 'lettuce', 28, 0, '生菜.jpg'),
('洋蔥', '洋葱', 'onion', 38, 0, '洋蔥.jpg'),
('豆腐', '豆腐', 'tofu', 28, 0, '豆腐.jpg'),
('寬粉', '宽粉', 'wide rice noodles', 28, 0, '寬粉.jpg'),
('魔芋', '魔芋', 'konjac', 38, 0, '魔芋.jpg'),
('貢丸', '贡丸', 'gongwan meatballs', 45, 0, '貢丸.jpg'),
('手切牛肉', '手切牛肉', 'hand-sliced beef', 168, 0, '手切牛肉.jpg'),
('豆皮', '豆皮', 'tofu skin', 38, 0, '豆皮.jpg'),
('腰花', '腰花', 'pork kidney', 58, 0, '腰花.jpg'),
('兒菜', '儿菜', 'B. j. var. Gemminfera', 38, 0, '兒菜.jpg'),
('豬潤', '猪润', 'Pork Liver', 48, 0, '豬潤.jpg'),
('牛百葉', '牛百叶', 'Beef Omasum', 58, 0, '牛百葉.jpg'),
('雞腎', '鸡肾', 'Chicken Gizzard', 48, 0, '雞腎.jpg');

DROP TABLE IF EXISTS `signature_dish`;
CREATE TABLE IF NOT EXISTS `signature_dish` (
  `Name_zh_HK` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Name_zh_CN` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Name_en_US` varchar(150) NOT NULL,
  `price` int(11) NOT NULL,
  `onSale` int(1) UNSIGNED ZEROFILL NOT NULL COMMENT '0= onsale, 1= non -sale',
  `path` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='招牌特色';

INSERT INTO `signature_dish` (`Name_zh_HK`, `Name_zh_CN`, `Name_en_US`, `price`, `onSale`, `path`) VALUES
('清江魚', '清江鱼', 'Steamed Mandarin Fish', 378, 0, '清江魚.jpg'),
('紙包魚(大)', '纸包鱼（大）', 'Steamed Fish in Paper (Large)', 238, 0, '紙包魚(大).jpg'),
('紙包魚(小)', '纸包鱼（小）', 'Steamed Fish in Paper (Small)', 218, 0, '紙包魚(小).jpg'),
('紙包魚(整條)', '纸包鱼（整条）', 'Steamed Fish in Paper (1 piece)', 408, 0, '紙包魚(整條).jpg'),
('紙包海鱸魚(整條)', '纸包海鲈鱼（整条）', 'Steamed Sea Bass in Paper (1 piece)', 378, 0, '紙包海鱸魚(整條).jpg'),
('酸菜魚(半條)', '酸菜鱼（半条）', 'Sour and Spicy Fish (Half fish)', 268, 0, '酸菜魚(半條).jpg'),
('金湯魚片', '金汤鱼片', 'Fish Fillet in Golden Soup', 268, 0, '金湯魚片.jpg'),
('水煮魚(整條)', '水煮鱼（整条）', 'Boiled Fish (Whole fish)', 468, 0, '水煮魚(整條).jpg'),
('水煮魚(半條)', '水煮鱼（半条）', 'Boiled Fish (Half fish)', 268, 0, '水煮魚(半條).jpg'),
('酸菜魚(整條)', '酸菜鱼（整条）', 'Sour and Spicy Fish (Whole fish)', 468, 0, '酸菜魚(整條).jpg'),
('酸菜魚(半條)', '酸菜鱼（半条）', 'Sour and Spicy Fish (Half fish)', 268, 0, '酸菜魚(半條).jpg'),
('酸菜海鱸魚(整條)', '酸菜海鲈鱼（整条）', 'Sour and Spicy Sea Bass (Whole fish)', 468, 0, '酸菜海鱸魚(整條).jpg'),
('酸菜海鱸魚(半條)', '酸菜海鲈鱼（半条）', 'Sour and Spicy Sea Bass (Half fish)', 268, 0, '酸菜海鱸魚(半條).jpg'),
('金湯海鱸魚(例)', '金汤海鲈鱼（例）', 'Sea Bass in Golden Soup (Portion)', 238, 0, '金湯海鱸魚(例).jpg'),
('水煮海鱸魚(整條)', '水煮海鲈鱼（整条）', 'Boiled Sea Bass (Whole fish)', 468, 0, '水煮海鱸魚(整條).jpg'),
('水煮海鱸魚(半條)', '水煮海鲈鱼（半条）', 'Boiled Sea Bass (Half fish)', 238, 0, '水煮海鱸魚(半條).jpg'),
('毛血旺', '毛血旺', 'Spicy Hot Pot with Blood Curd', 158, 0, '毛血旺.jpg'),
('麻辣蝦', '麻辣虾', 'Spicy Sichuan Shrimp', 188, 0, '麻辣蝦.jpg'),
('水煮牛肉', '水煮牛肉', 'Boiled Beef Slices', 198, 0, '水煮牛肉.jpg'),
('水煮肥牛', '水煮肥牛', 'Boiled Sliced Beef Brisket', 158, 0, '水煮肥牛.jpg'),
('水煮田雞', '水煮田鸡', 'Boiled Frog', 168, 0, '水煮田雞.jpg'),
('水煮肉片', '水煮肉片', 'Boiled Pork Slices', 198, 0, '水煮肉片.jpg'),
('啤酒鴨(整隻)', '啤酒鸭（整只）', 'Beer Duck (Whole duck)', 318, 0, '啤酒鴨(整隻).jpg'),
('啤酒鴨(半隻)', '啤酒鸭（半只）', 'Beer Duck (Half duck)', 188, 0, '啤酒鴨(半隻).jpg'),
('奇味雞煲(整隻)', '奇味鸡煲（整只）', 'Flavorful Chicken Hot Pot (Whole Chicken)', 268, 0, '奇味雞煲(整隻).jpg'),
('奇味雞煲(半隻)', '奇味鸡煲（半只）', 'Flavorful Chicken Hot Pot (Half Chicken)', 158, 0, '奇味雞煲(半隻).jpg'),
('麻辣雞煲(整隻)', '麻辣鸡煲（整只）', 'Spicy Chicken Hot Pot (Whole Chicken)', 268, 0, '麻辣雞煲(整隻).jpg'),
('麻辣雞煲(半隻)', '麻辣鸡煲（半只）', 'Spicy Chicken Hot Pot (Half Chicken)', 158, 0, '麻辣雞煲(半隻).jpg');

DROP TABLE IF EXISTS `spiciness_levels`;
CREATE TABLE IF NOT EXISTS `spiciness_levels` (
  `name_zh_TW` varchar(50) NOT NULL,
  `name_zh_CN` varchar(50) NOT NULL,
  `name_en_US` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='辣度';

INSERT INTO `spiciness_levels` (`name_zh_TW`, `name_zh_CN`, `name_en_US`) VALUES
('小辣', '小辣', 'Mild'),
('中辣', '中辣', 'Medium'),
('大辣', '大辣', 'Hot'),
('特辣', '特辣', 'Special');

DROP TABLE IF EXISTS `staple_food`;
CREATE TABLE IF NOT EXISTS `staple_food` (
  `Name_zh_HK` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Name_zh_CN` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Name_en_US` varchar(150) NOT NULL,
  `price` int(11) NOT NULL,
  `onSale` int(1) UNSIGNED ZEROFILL NOT NULL COMMENT '0= onsale, 1= non -sale',
  `path` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='主食';

INSERT INTO `staple_food` (`Name_zh_HK`, `Name_zh_CN`, `Name_en_US`, `price`, `onSale`, `path`) VALUES
('紅油抄手', '红油抄手', 'Wonton Soup in Hot and Spicy Sauce', 35, 0, '紅油抄手.jpg'),
('重慶酸辣粉', '重庆酸辣粉', 'Chongqing Hot and Sour Rice Noodles', 26, 0, '重慶酸辣粉.jpg'),
('重慶酸辣麵', '重庆酸辣面', 'Chongqing Hot and Sour Noodles', 26, 0, '重慶酸辣麵.jpg'),
('白飯', '白饭', 'Rice', 10, 0, '白飯.jpg'),
('蛋炒飯', '蛋炒饭', 'Egg Fried Rice', 26, 0, '蛋炒飯.jpg');

DROP TABLE IF EXISTS `stir_fry`;
CREATE TABLE IF NOT EXISTS `stir_fry` (
  `Name_zh_HK` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Name_zh_CN` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Name_en_US` varchar(150) NOT NULL,
  `price` int(11) NOT NULL,
  `onSale` int(1) UNSIGNED ZEROFILL NOT NULL COMMENT '0= onsale, 1= non -sale',
  `path` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='精美小炒';

INSERT INTO `stir_fry` (`Name_zh_HK`, `Name_zh_CN`, `Name_en_US`, `price`, `onSale`, `path`) VALUES
('螞蟻上樹', '蚂蚁上树', 'spicy vermicelli stir-fry', 58, 0, '螞蟻上樹.jpg'),
('辣子雞', '辣子鸡', 'Spicy Chicken', 158, 0, '辣子雞.jpg'),
('尖椒雞(半隻)', '尖椒鸡(半只)', 'Half Spicy Chicken with Bell Peppers', 178, 0, '尖椒雞(半隻).jpg'),
('尖椒雞(整隻)', '尖椒鸡(整只)', 'Whole Spicy Chicken with Bell Peppers', 318, 0, '尖椒雞(整隻).jpg'),
('梅菜扣肉', '梅菜扣肉', 'Braised Pork Belly with Preserved Mustard Greens', 88, 0, '梅菜扣肉.jpg'),
('西芹炒豆干', '西芹炒豆干', 'Stir Fried Celery with Tofu', 78, 0, '西芹炒豆干.jpg'),
('酸豆角炒豆干', '酸豆角炒豆干', 'Stir Fried Green Beans with Tofu and Pickled Green Beans', 78, 0, '酸豆角炒豆干.jpg'),
('粉蒸肉', '粉蒸肉', 'Steamed Pork with Rice Flour', 88, 0, '粉蒸肉.jpg'),
('尖椒豬肚', '尖椒猪肚', 'Stir Fried Pork Stomach with Bell Peppers', 88, 0, '尖椒豬肚.jpg'),
('白油肚條', '白油肚条', 'Stir Fried Pork Tripe in White Sauce', 88, 0, '白油肚條.jpg'),
('辣子雞軟骨', '辣子鸡软骨', 'Spicy Chicken Cartilage', 168, 0, '辣子雞軟骨.jpg'),
('干煸肥腸', '干煸肥肠', 'Stir Fried Pig Intestine', 168, 0, '干煸肥腸.jpg'),
('大碗花菜', '大碗花菜', 'Stir Fried Cauliflower', 78, 0, '大碗花菜.jpg'),
('干煸耗兒魚', '干煸耗儿鱼', 'Stir Fried Dried Fish', 168, 0, '干煸耗兒魚.jpg'),
('鹹蛋黃土豆絲', '咸蛋黄土豆丝', 'Salted Egg Yolk Shredded Potatoes', 78, 0, '鹹蛋黃土豆絲.jpg'),
('鹹蛋黃炒蝦', '咸蛋黄炒虾', 'Salted Egg Yolk Stir Fried Shrimp', 188, 0, '鹹蛋黃炒蝦.jpg'),
('家常豆腐', '家常豆腐', 'Home-style Tofu', 78, 0, '家常豆腐.jpg'),
('清炒兒菜', '清炒儿菜', 'Stir Fried Baby Vegetables', 78, 0, '清炒兒菜.jpg'),
('清炒土豆絲', '清炒土豆丝', 'Stir Fried Shredded Potatoes', 68, 0, '清炒土豆絲.jpg'),
('熗炒土豆絲', '炝炒土豆丝', 'Stir Fried Shredded Potatoes', 68, 0, '熗炒土豆絲.jpg'),
('清炒娃娃菜', '清炒娃娃菜', 'Stir Fried Baby Bok Choy', 68, 0, '清炒娃娃菜.jpg'),
('熗炒娃娃菜', '炝炒娃娃菜', 'Stir Fried Baby Bok Choy (Spicy)', 68, 0, '熗炒娃娃菜.jpg'),
('手撕包菜', '手撕包菜', 'Hand-Torn Cabbage', 68, 0, '手撕包菜.jpg'),
('蒜苗炒臘肉', '蒜苗炒腊肉', 'Stir Fried Garlic Sprouts with Bacon', 98, 0, '蒜苗炒臘肉.jpg'),
('番茄炒蛋', '番茄炒蛋', 'Stir Fried Tomatoes with Eggs', 68, 0, '番茄炒蛋.jpg'),
('麻婆豆腐', '麻婆豆腐', 'Mapo Tofu', 68, 0, '麻婆豆腐.jpg'),
('干煸四季豆', '干煸四季豆', 'Dry-Fried Green Beans', 78, 0, '干煸四季豆.jpg'),
('川式回鍋肉', '川式回锅肉', 'Sichuan Twice-Cooked Pork', 88, 0, '川式回鍋肉.jpg'),
('豆豉鯪魚油麥菜', '豆豉鲮鱼油麦菜', 'Stir Fried Water Spinach with Fermented Black Beans and Silver Fish', 78, 0, '豆豉鯪魚油麥菜.jpg'),
('清炒時蔬', '清炒时蔬', 'Stir Fried Seasonal Vegetables', 68, 0, '清炒時蔬.jpg'),
('酸豆角肉沫', '酸豆角肉沫', 'Stir Fried Minced Pork with Pickled Green Beans', 78, 0, '酸豆角肉沫.jpg'),
('泡椒雞腎', '泡椒鸡肾', 'Stir Fried Chicken Kidneys with Pickled Peppers', 78, 0, '泡椒雞腎.jpg'),
('萵筍炒肉絲', '莴笋炒肉丝', 'Stir Fried Pork with Lettuce Stem', 88, 0, '萵筍炒肉絲.jpg'),
('清炒萵筍絲', '清炒莴笋丝', 'Stir Fried Shredded Lettuce Stem', 78, 0, '清炒萵筍絲.jpg'),
('花菜炒臘肉', '花菜炒腊肉', 'Stir Fried Cauliflower with Bacon', 98, 0, '花菜炒臘肉.jpg'),
('兒菜炒臘肉', '儿菜炒腊肉', 'Stir Fried Baby Bok Choy with Bacon', 98, 0, '兒菜炒臘肉.jpg'),
('酸辣土豆絲', '酸辣土豆丝', 'Spicy and Sour Shredded Potatoes', 68, 0, '酸辣土豆絲.jpg'),
('薑蔥雪花牛肉', '姜葱雪花牛肉', 'Ginger and Scallion Beef', 198, 0, '薑蔥雪花牛肉.jpg'),
('夾沙肉', '夹沙肉', 'Stuffed Belly Pork', 88, 0, '夾沙肉.jpg'),
('淮山炒木耳', '淮山炒木耳', 'Stir Fried Huai Shan with Black Fungus', 78, 0, '淮山炒木耳.jpg'),
('農家小炒肉', '农家小炒肉', 'Home-style Stir Fried Pork', 88, 0, '農家小炒肉.jpg'),
('藕片炒肉', '藕片炒肉', 'Stir Fried Lotus Root Slices with Pork', 88, 0, '藕片炒肉.jpg'),
('青椒炒肉', '青椒炒肉', 'Stir Fried Green Peppers with Pork', 68, 0, '青椒炒肉.jpg'),
('苦瓜炒肉', '苦瓜炒肉', 'Stir Fried Bitter Melon with Pork', 88, 0, '苦瓜炒肉.jpg');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
