/**
 * New node file
 */



var mysql = require("../SqlOperations");
exports.list = function(req, res) {
console.log(req.param("name"), req.param("description"),req.param("price"),req.param("quantity"),req.param("email"));
console.log("add before sql");
	mysql.Add(function(flag,products) {
		console.log("add after sql");
		if (flag === true) {
			res.render('Add.ejs', {	products:products});
		} else {
			res.render('Add.ejs', {
				title : "Error"
			});
		}
	}, req.param("name"), req.param("description"),req.param("price"),req.param("quantity"),req.param("email"));

};

