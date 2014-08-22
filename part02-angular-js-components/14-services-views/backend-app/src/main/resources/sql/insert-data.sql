SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0//
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0//

-- ----------------
-- BUSINESS DATA --
-- ----------------

-- Create Products
call createProduct('fruit', 'Apples', 1.20, @productId)//
call createProduct('fruit', 'Bananas', 2.42, @productId)//
call createProduct('fruit', 'Pears', 2.02, @productId)//
call createProduct('fish', 'Tuna', 20.45, @productId)//
call createProduct('fish', 'Salmon', 17.93, @productId)//
call createProduct('fish', 'Trout', 12.93, @productId)//

SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS//
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS//