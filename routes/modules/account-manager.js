var crypto 		= require('crypto');
var MongoDB 	= require('mongodb').Db;
var Server 		= require('mongodb').Server;
var moment 		= require('moment');

var dbPort 		= 27017;
var dbHost 		= 'localhost';
var dbName 		= 'login';

var db = new MongoDB(dbName, new Server(dbHost, dbPort, {auto_reconnect: true}), {w: 1});
	db.open(function(e, d){
	if (e) {
		console.log(e);
	}	else{
		console.log('connected to database :: ' + dbName);
	}
});
var accounts = db.collection('login-user');

exports.manualLogin = function(user, pass, callback)
{
	accounts.findOne({name:user}, function(e, o) {
		if (o == null){
			callback('user-not-found');
		}	else{
      accounts.findOne({pass:pass}, function(e, o) {
				if (o){
					callback(null, o);
				}	else{
					callback('invalid-password');
				}
			});
		}
	});
}
