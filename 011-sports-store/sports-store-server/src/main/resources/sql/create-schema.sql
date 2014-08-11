SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0//
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0//

DROP TABLE IF EXISTS `category`//
CREATE TABLE `category` (
	`id` BIGINT(20) NOT NULL AUTO_INCREMENT,
	`description` VARCHAR(255) NOT NULL,
	`name` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`id`),
	UNIQUE INDEX `category_idx_1` (`name`)
)
COLLATE='utf8_bin'
ENGINE=InnoDB//


DROP TABLE IF EXISTS `product`//
CREATE TABLE `product` (
	`id` BIGINT(20) NOT NULL AUTO_INCREMENT,
	`category_id` BIGINT NOT NULL,
	`name` VARCHAR(255) NOT NULL,
	`description` VARCHAR(255) NULL DEFAULT NULL,
	`price` DECIMAL(19,2) NOT NULL,
	PRIMARY KEY (`id`),
	UNIQUE INDEX `product_idx_1` (`name`),
	CONSTRAINT `product_fk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
)
COLLATE='utf8_bin'
ENGINE=InnoDB//

DROP TABLE IF EXISTS `custorder`//
CREATE TABLE `custorder` (
	`id` BIGINT(20) NOT NULL AUTO_INCREMENT,
	`city` VARCHAR(255) NULL DEFAULT NULL,
	`country` VARCHAR(255) NULL DEFAULT NULL,
	`name` VARCHAR(255) NULL DEFAULT NULL,
	`state` VARCHAR(255) NULL DEFAULT NULL,
	`street` VARCHAR(255) NULL DEFAULT NULL,
	`zip` VARCHAR(255) NULL DEFAULT NULL,
	`gift` TINYINT(1) NOT NULL,
	PRIMARY KEY (`id`)
)
COLLATE='utf8_bin'
ENGINE=InnoDB//

DROP TABLE IF EXISTS `lineitem`//
CREATE TABLE `lineitem` (
	`id` BIGINT(20) NOT NULL AUTO_INCREMENT,
	`count` INT(11) NOT NULL,
	`unit_price` DECIMAL(19,2) NOT NULL,
	`product_id` BIGINT(20) NULL DEFAULT NULL,
	`order_id` BIGINT(20) NULL DEFAULT NULL,
	PRIMARY KEY (`id`),
	CONSTRAINT `lineitem_fk_1` FOREIGN KEY (`order_id`) REFERENCES `custorder` (`id`),
	CONSTRAINT `lineitem_fk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
)
COLLATE='utf8_bin'
ENGINE=InnoDB//


DROP TABLE IF EXISTS `account`//

CREATE TABLE `account` (
	`id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
	`username` VARCHAR(50) NOT NULL,
	`first_name` VARCHAR(50) NOT NULL,
	`last_name` VARCHAR(50) NOT NULL,
	`email` VARCHAR(50) NOT NULL,
	`password` VARCHAR(80) NULL DEFAULT NULL,
	`marketing_ok` TINYINT(1) NOT NULL,
	`accept_terms` TINYINT(1) NOT NULL,
	`enabled` TINYINT(1) NOT NULL,
	`date_created` TIMESTAMP NOT NULL DEFAULT 0,
	`date_modified` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`),
	UNIQUE INDEX `username` (`username`),
	UNIQUE INDEX `account_idx_1` (`username`),
	UNIQUE INDEX `account_idx_2` (`email`)
)
COLLATE='utf8_bin'
ENGINE=InnoDB//

DROP TABLE IF EXISTS `role`//

CREATE TABLE `role` (
	`id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(50) NOT NULL,
	PRIMARY KEY (`id`),
	UNIQUE INDEX `name` (`name`)
)
COLLATE='utf8_bin'
ENGINE=InnoDB//

DROP TABLE IF EXISTS `permission`//

CREATE TABLE `permission` (
	`id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(50) NOT NULL,
	PRIMARY KEY (`id`),
	UNIQUE INDEX `name` (`name`)	
)
COLLATE='utf8_bin'
ENGINE=InnoDB//

DROP TABLE IF EXISTS `account_role`//

CREATE TABLE `account_role` (
	`id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
	`account_id` BIGINT(20) UNSIGNED NOT NULL,
	`role_id` BIGINT(20) UNSIGNED NOT NULL,
	PRIMARY KEY (`id`),
	UNIQUE INDEX `account_role_idx_1` (`account_id`, `role_id`),
	INDEX `role_id` (`role_id`),
	CONSTRAINT `account_role_fk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`),
	CONSTRAINT `account_role_fk_2` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
)
COLLATE='utf8_bin'
ENGINE=InnoDB//

DROP TABLE IF EXISTS `role_permission`//

CREATE TABLE `role_permission` (
	`id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
	`role_id` BIGINT(20) UNSIGNED NOT NULL,
	`permission_id` BIGINT(20) UNSIGNED NOT NULL,
	PRIMARY KEY (`id`),
	UNIQUE INDEX `role_permission_idx_1` (`role_id`, `permission_id`),
	CONSTRAINT `role_permission_fk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
	CONSTRAINT `role_permission_fk_2` FOREIGN KEY (`permission_id`) REFERENCES `permission` (`id`)
)
COLLATE='utf8_bin'
ENGINE=InnoDB//

-- ---------------------------
-- Helper Stored Procedures --
-- ---------------------------

DROP PROCEDURE IF EXISTS `createCategory`//
CREATE PROCEDURE createCategory($name varchar(255), $description varchar(255), out $id BIGINT)
BEGIN
	INSERT INTO `category`
		(`name`, `description`)
	VALUES
		($name, $description);
	SET $id := last_insert_id();
END// 


DROP PROCEDURE IF EXISTS `createProduct`//
CREATE PROCEDURE createProduct($category_id BIGINT, $description varchar(255), $name varchar(255), $price decimal(19,2), out $id BIGINT)
BEGIN
	INSERT INTO `product`
		(`name`, `category_id`, `description`, `price`)
	VALUES
		($name, $category_id, $description, $price);
	SET $id := last_insert_id();
END// 


DROP PROCEDURE IF EXISTS `createAccount`//
CREATE PROCEDURE createAccount($name varchar(50), $first_name varchar(50), $last_name varchar(50), $email varchar(50), out $id BIGINT)
BEGIN
	INSERT INTO `account` 
  		(`username`, `first_name`, `last_name`, `email`, `password`, `marketing_ok`, `accept_terms`, `enabled`, `date_created`) 
	VALUES
  		($name, $first_name, $last_name, $email, 'p@ssword', 1, 1, 1, CURRENT_TIMESTAMP);
  	SET $id := last_insert_id();
END//

DROP PROCEDURE IF EXISTS `createRole`//
CREATE PROCEDURE createRole($name varchar(50), out $id BIGINT) 
BEGIN
	INSERT INTO `role` (`name`) VALUES ($name);
	SET $id := last_insert_id();
END//

DROP PROCEDURE IF EXISTS `createPermission`//
CREATE PROCEDURE createPermission($name varchar(50)) 
BEGIN
	INSERT INTO `permission` (`name`) VALUES ($name);	
END//

DROP PROCEDURE IF EXISTS `assignPermissionToRole`//
CREATE PROCEDURE `assignPermissionToRole`($permission_name varchar(50), $role_id BIGINT)
BEGIN
	DECLARE PERMISSION_ID BIGINT;
	SELECT `id` INTO PERMISSION_ID FROM `permission` WHERE `name` = $permission_name;
	INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ($role_id, PERMISSION_ID);
END//

DROP PROCEDURE IF EXISTS `assignRoleToUser`//
CREATE PROCEDURE `assignRoleToUser`($role_id BIGINT, $account_id BIGINT)
BEGIN
	INSERT INTO `account_role` (`role_id`, `account_id`) VALUES ($role_id, $account_id);
END//

SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS//
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS//