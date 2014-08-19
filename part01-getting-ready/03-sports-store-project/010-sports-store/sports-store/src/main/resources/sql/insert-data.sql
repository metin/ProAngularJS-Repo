SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0//
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0//

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



-- Create Accounts
call createAccount('paula', 'Paula', 'Cazares', 'paula.cazares@example.com', @paula)//
call createAccount('juan', 'Juan', 'Cazares', 'juan.cazares@example.com', @juan)//
call createAccount('elvira', 'Elvira', 'Cazares', 'elvira.cazares@example.com', @elvira)//
call createAccount('daniel', 'Daniel', 'Cazares', 'daniel.cazares@example.com', @daniel)//
call createAccount('julia', 'Julia', 'Cazares', 'julia.cazares@example.com', @julia)//

-- Create Roles
call createRole('ROLE_USER', @role_user)//
call createRole('ROLE_ADMIN', @role_admin)//
call createRole('ROLE_STUDENT', @role_student)//
call createRole('ROLE_FACULTY', @role_faculty)//
  

-- Create Permissions
call createPermission('PERM_CREATE_ACCOUNTS')//
call createPermission('PERM_READ_ACCOUNTS')//
call createPermission('PERM_UPDATE_ACCOUNTS')//
call createPermission('PERM_DELETE_ACCOUNTS')//
call createPermission('PERM_ADMIN_ACCOUNTS')//

call createPermission('PERM_CREATE_FORUMS')//
call createPermission('PERM_READ_FORUMS')//
call createPermission('PERM_UPDATE_FORUMS')//
call createPermission('PERM_DELETE_FORUMS')//
call createPermission('PERM_ADMIN_FORUMS')//

call createPermission('PERM_CREATE_MESSAGES')//
call createPermission('PERM_READ_MESSAGES')//
call createPermission('PERM_UPDATE_MESSAGES')//
call createPermission('PERM_DELETE_MESSAGES')//
call createPermission('PERM_ADMIN_MESSAGES')//

-- Assign Permissions to Roles
call assignPermissionToRole('PERM_READ_FORUMS', @role_student)//
call assignPermissionToRole('PERM_READ_MESSAGES', @role_student)//


call assignPermissionToRole('PERM_READ_ACCOUNTS', @role_user)//
call assignPermissionToRole('PERM_READ_FORUMS', @role_user)//
call assignPermissionToRole('PERM_CREATE_MESSAGES', @role_user)//
call assignPermissionToRole('PERM_READ_MESSAGES', @role_user)//
call assignPermissionToRole('PERM_UPDATE_MESSAGES', @role_user)//

call assignPermissionToRole('PERM_UPDATE_MESSAGES', @role_admin)//
call assignPermissionToRole('PERM_DELETE_MESSAGES', @role_admin)//
call assignPermissionToRole('PERM_ADMIN_MESSAGES', @role_admin)//


-- Assign Roles to User
call assignRoleToUser(@role_student, @paula)//

call assignRoleToUser(@role_user, @daniel)//
call assignRoleToUser(@role_student, @daniel)//

call assignRoleToUser(@role_user, @julia)//
call assignRoleToUser(@role_faculty, @paula)//

call assignRoleToUser(@role_user, @elvira)//
call assignRoleToUser(@role_student, @elvira)//
call assignRoleToUser(@role_faculty, @elvira)//

call assignRoleToUser(@role_user, @juan)//
call assignRoleToUser(@role_admin, @juan)//

-- ----------------
-- BUSINESS DATA --
-- ----------------
call createForum('Algebra I', @julia, @forum)//
call createMessage(@forum, @julia, '2013-09-28 12:34:03', 'What *is* a variable?')//

call createForum('Algebra II/Trigonometry', @julia, @forum)//
call createMessage(@forum, @julia, '2013-09-29 04:01:39', 'now i know how tall that pyramid is!')//

call createForum('Calculus II', @elvira, @forum)//
call createMessage(@forum, @elvira, '2013-09-27 12:34:56', 'Relationship between differentiation and integration')//
call createMessage(@forum, @daniel, '2013-09-30 12:43:45', 'Integrating a volume')//

call createForum('Computer Science', @elvira, @forum)//

SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS//
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS//