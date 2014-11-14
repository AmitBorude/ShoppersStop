/**
 * Module dependencies.
 */

var express = require('express'), 
routes = require('./routes'), 
user = require('./routes/user'), 
http = require('http'), 
path = require('path'), 
UserHome = require('./routes/UserHome'), 
History = require('./routes/History'), 
About = require('./routes/About'), 
Help = require('./routes/Help'),
Add = require('./routes/Add');

var app = express();

var mysql = require("./SqlOperations");

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

app.post('/UserHome', UserHome.list);
app.get('/About', About.list);
app.get('/History', History.list);
app.get('/Help', Help.list);
app.post('/Add', Add.list);

app.post('/index', function(req, res) {
	console.log(req.param("firstname"), req.param("lastname"), req
			.param("email"), req.param("password"), req.param("address"));

	mysql.SignUpUser(function(flag, name, products) {

		if (flag === true) {
			res.render('index.ejs', {
				title : 'Successful'

			});
		} else {
			res.render('index.ejs', {
				title : 'Error'
			});
		}
	}, req.param("firstname"), req.param("lastname"), req.param("email"), req
			.param("password"), req.param("address"));
});

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});
