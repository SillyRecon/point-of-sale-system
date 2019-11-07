
//Required libraries. Package.JSON needs to be updated
var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var datastore = require('nedb');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var index = require('./routes/index');
var inventory = require('./routes/inventory')
var app = express();

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
  secret: 'secret'
}));

app.use('/', index);
app.use('/inventory', inventory);

//Set Ports
app.set('port', (process.env.PORT || 8080));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});


module.exports = app;
