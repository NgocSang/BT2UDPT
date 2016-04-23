var crypto 		= require('crypto');
var MongoDB 	= require('mongodb').Db;
var Server 		= require('mongodb').Server;
var moment 		= require('moment');

var dbPort 		= 27017;
var dbHost 		= 'localhost';
var dbName 		= 'loginsystem';

var db = new MongoDB(dbName, new Server(dbHost, dbPort, {auto_reconnect: true}), {w: 1});
	db.open(function(e, d){
	if (e) {
		console.log(e);
	}	else{
		console.log('connected to database :: ' + dbName);
	}
});
var accounts = db.collection('account');

exports.manualLogin = function(email, pass, callback)
{
	accounts.findOne({email:email, pass:pass}, function(e, o) {
		if (o == null){
			callback('user-not-found or pass wrong');
		}	else{
					callback(null, o);
			}
		}
	);
}

exports.listaccount = function(callback)
{
	accounts.find({}).toArray(function(e, o) {
		if (o){
			callback(null,o);
		}	else{
			callback('not accounts');
		}
	});
}
//Phan memfind({name:'A'}).toArray(function(err, document)

