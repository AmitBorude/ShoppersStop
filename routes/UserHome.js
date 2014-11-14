/**
 * New node file
 */
var mysql = require("../SqlOperations");

exports.list = function(req, res) {
	console.log(req.param("email"), req.param("password"));
	mysql.LogInUser(function(flag, name, products) {

		if (flag === true) {
			res.render('UserHome.ejs', {
				name : name,
				products : products
			});
		} else {
			res.render('index.ejs', {
				title : "Error"
			});
		}
	}, req.param("email"), req.param("password"));

};

