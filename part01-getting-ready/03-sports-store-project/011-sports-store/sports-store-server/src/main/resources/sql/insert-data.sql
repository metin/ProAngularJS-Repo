SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0//
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0//


-- Create Accounts
call createAccount('juan', 'Juan', 'Cazares', 'juan.cazares@example.com', @juan)//
call createAccount('daniel', 'Daniel', 'Cazares', 'daniel.cazares@example.com', @daniel)//

-- Create Roles
call createRole('ROLE_USER', @role_user)//
call createRole('ROLE_ADMIN', @role_admin)// 

-- Create Permissions
call createPermission('PERM_CREATE_PRODUCTS')//
call createPermission('PERM_READ_PRODUCTS')//
call createPermission('PERM_UPDATE_PRODUCTS')//
call createPermission('PERM_DELETE_PRODUCTS')//
call createPermission('PERM_ADMIN_PRODUCTS')//
call createPermission('PERM_READ_ORDERS')//

-- Assign Permissions to Roles

call assignPermissionToRole('PERM_READ_PRODUCTS', @role_user)//
call assignPermissionToRole('PERM_READ_ORDERS', @role_user)//

call assignPermissionToRole('PERM_READ_PRODUCTS', @role_admin)//
call assignPermissionToRole('PERM_CREATE_PRODUCTS', @role_admin)//
call assignPermissionToRole('PERM_UPDATE_PRODUCTS', @role_admin)//
call assignPermissionToRole('PERM_DELETE_PRODUCTS', @role_admin)//
call assignPermissionToRole('PERM_ADMIN_PRODUCTS', @role_admin)//

call assignPermissionToRole('PERM_READ_ORDERS', @role_admin)//

-- Assign Roles to User

call assignRoleToUser(@role_user, @daniel)//

call assignRoleToUser(@role_user, @juan)//
call assignRoleToUser(@role_admin, @juan)//

-- ----------------
-- BUSINESS DATA --
-- ----------------

-- Create Categories
call createCategory('Watersports', 'Watersports related items', @watersports)//
call createCategory('Soccer', 'Soccer related items', @soccer)//
call createCategory('Chess', 'Chess related items', @chess)//

-- Create Products
call createProduct(@watersports, 'A boat for one person', 'Kayak', 275, @productId)//
call createProduct(@watersports, 'Protective and fashionable', 'Lifejacket', 48.95, @productId)//
call createProduct(@soccer, 'FIFA-approved size and weight', 'Soccer Ball', 19.5, @productId)//
call createProduct(@soccer, 'Give your playing field a professional touch', 'Corner Flags', 34.95, @productId)//
call createProduct(@soccer, 'Flat-packed 35,000-seat stadium', 'Stadium', 79500, @productId)//
call createProduct(@soccer, 'Improve your brain efficiency by 75%', 'Thinking Cap', 16, @productId)//
call createProduct(@soccer, 'Secretly give your opponent a disadvantage', 'Unsteady Chair', 29.95, @productId)//
call createProduct(@chess, 'A fun game for the family', 'Human Chess Board', 75, @productId)//
call createProduct(@chess, 'Gold-plated, diamond-studded King', 'Bling-Bling King', 1200, @productId)//


SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS//
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS//