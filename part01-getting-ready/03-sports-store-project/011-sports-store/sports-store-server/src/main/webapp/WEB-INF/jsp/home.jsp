<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="security" uri="http://www.springframework.org/security/tags" %>
<!doctype html>
<html>
	<head>
        <meta charset="utf-8">
        <title>SportsStore Application Backend</title>
        <link rel="stylesheet" type="text/css" href="static/css/bootstrap.css">
		<link rel="stylesheet" type="text/css" href="static/css/bootstrap-theme.css">
		<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />   
	</head>
	<body>
        <%@ include file="navbar.jspf" %>
            
        <!-- The contents -->
        <div class="well-sm">
            <p>
                This is the home page for the SportsStore Application Server Side.<br>
                <strong>The server side of the SportsStore Application does not provide a UI.</strong>
            </p>
            <div class="well well-lg">
            	<h3>Available REST Resources and Endpoints:</h3>
                <ul>
                    <li>
						Spring Security Login: Use a client application to Log In to <code>/j_spring_security_check</code>.
						You will not be able to access any page beyond the login to the admin application.
						<ul>
							<li>
								daniel:p@ssword is a user acount - he will be able to access the admin console, but product
								creation/modification will be forbidden.
							</li>
							<li>
								juan:p@ssword is an admin acount - he will be able to access the admin console and perform
								CRUD operations on the products.
							</li>							
						</ul>
                    </li>
                    <li>
						ORDERS: <code>/backendapp/orders</code>
						<ul>
							<li>GET: retrieve all existing Customer Orders</li>
							<li>POST: process a new Customer Order</li>
						</ul>
                    </li>    
                    <li>
						PRODUCTS: <code>/backendapp/products</code>
						<ul>
							<li>GET: retrieve all existing Products from the catalogue.</li>
							<li>POST: Add/Update a new/existing product.</li>
							<li>DELETE: Delete an existing product.</li>
						</ul>
                    </li>                    
         		</ul>
            </div>
        </div>
	</body>
</html>