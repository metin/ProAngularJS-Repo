<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!doctype html>
<html>
	<head>
        <meta charset="utf-8">
        <title>RESTful Application Backend</title>
        <link rel="stylesheet" type="text/css" href="static/css/bootstrap.css">
		<link rel="stylesheet" type="text/css" href="static/css/bootstrap-theme.css">
		<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />   
	</head>
	<body>
        <%@ include file="navbar.jspf" %>
            
        <!-- The contents -->
        <div class="well-sm">
            <p>
                This is the home page for the RESTful Application Backend used to demonstrate
                <em>AngularJS</em> REST services capabilities.
            </p>
            <div class="well well-lg">
            	<h3>Available REST Resources and Endpoints:</h3>
                <ul>    
                    <li>
						PRODUCTS:
						<table class="table table-bordered table-condensed">
							<thead>
								<tr>
									<th>Task</th><th>Method</th><th>URL</th><th>Accepts</th><th>Returns</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>List Products</td>
									<td>GET</td>
									<td>/server/rest/products</td>
									<td>Nothing</td>
									<td>An array of objects</td>
								</tr>
								<tr>
									<td>Create a Product</td>
									<td>POST</td>
									<td>/server/rest/products</td>
									<td>A single Product object</td>
									<td>The saved object</td>
								</tr>					
								<tr>
									<td>Get a Product</td>
									<td>GET</td>
									<td>/server/rest/products/{id}</td>
									<td>Nothing</td>
									<td>A single Product object</td>
								</tr>							
								<tr>
									<td>Update a Product</td>
									<td>PUT</td>
									<td>/server/rest/products/{id}</td>
									<td>A single object</td>
									<td>The saved object</td>
								</tr>						
								<tr>
									<td>Delete a Product</td>
									<td>DELETE</td>
									<td>/server/rest/products/{id}</td>
									<td>Nothing</td>
									<td>Nothing</td>
								</tr>
							</tbody>
						</table>
					</li>
  				</ul>
            </div>
        </div>
	</body>
</html>