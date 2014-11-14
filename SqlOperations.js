var ejs = require("ejs");

exports.LogInUser = LogInUser;
exports.SignUpUser = SignUpUser;
exports.Add = Add;

function LogInUser(callback, email, password) {
	var mysql = require('mysql');
	var sendName = "";

	var connection = mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : '',
		port : '3306',
		database : 'ShopDB'
	});
	var flag = false;
	var sql1 = "select firstname,lastname from users where email='" + email
			+ "' and password='" + password + "'";

	connection.query(sql1, function(err, rows, fields) {
		if (rows.length != 0) {
			console.log("Got all values");

			sendName = rows[0].firstname + " ";
			sendName += rows[0].lastname + " ";
			console.log(sendName);
			flag = true;

			var sql2 = "select * from Product";

			connection.query(sql2, function(err, rows1, fields) {
				callback(flag, sendName, rows1);
			});

		} else {
			console.log("Error:");
			flag = false;
			callback(flag, sendName, "");
		}

	});
}

function SignUpUser(callback, firstname, lastname, email, password, address) {
	var mysql = require('mysql');
	var sendName = "";

	var connection = mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : '',
		port : '3306',
		database : 'ShopDB'
	});

	var flag = false;

	var sql1 = "Insert into users (firstname,lastname,email,password,address) values('"
			+ firstname
			+ "','"
			+ lastname
			+ "','"
			+ email
			+ "','"
			+ password
			+ "','" + address + "')";

	connection.query(sql1, function(err, rows, fields) {
		console.log(rows);

		console.log("Updated");

		if (rows.length != 0) {

			flag = true;
			callback(flag, sendName, rows);
		} else {
			flag = false;
			callback(flag);
		}

	});
}

function Add(callback, name, description, price, quantity, email) {
	var mysql = require('mysql');
	
	console.log("Mysql Add");

	var connection = mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : '',
		port : '3306',
		database : 'ShopDB'
	});
	var flag = false;
	console.log("Before Query"+	name+" "+description+"  "+price+"  "+quantity+""+"  "+email);
	var sql1 = "Insert into Product (name,description,price,quantity,email) values('"
		+ name
		+ "','"
		+ description
		+ "','"
		+ price
		+ "','"
		+ quantity
		+ "','" + email + "')";

	console.log("After log"+email);

	connection.query(sql1, function(err, rows, fields) {
		
	
		if (rows.length != 0) {
			console.log("Got all values");
			flag = true;
			
			var sql2 = "select * from Product where email='"+email+"'";

			connection.query(sql2, function(err, rows1, fields) {
				console.log(rows1);
				callback(flag, rows1);
			});
		}

		else {
			console.log("Error:");
			flag = false;
			callback(flag,"");
		}

	});
}
