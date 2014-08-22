SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0//
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0//

DROP TABLE IF EXISTS `product`//
CREATE TABLE `product` (
	`id` BIGINT(20) NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL,
	`category` VARCHAR(255) NOT NULL,
	`price` DECIMAL(19,2) NOT NULL,
	PRIMARY KEY (`id`),
	UNIQUE INDEX `product_idx_1` (`name`)
)
COLLATE='utf8_bin'
ENGINE=InnoDB//


-- ---------------------------
-- Helper Stored Procedures --
-- ---------------------------


DROP PROCEDURE IF EXISTS `createProduct`//
CREATE PROCEDURE createProduct($category varchar(255), $name varchar(255), $price decimal(19,2), out $id BIGINT)
BEGIN
	INSERT INTO `product`
		(`name`, `category`, `price`)
	VALUES
		($name, $category, $price);
	SET $id := last_insert_id();
END// 

SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS//
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS//