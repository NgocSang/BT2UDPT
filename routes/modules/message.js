var crypto 		= require('crypto');
var MongoDB 	= require('mongodb').Db;
var Server 		= require('mongodb').Server;
var moment 		= require('moment');
var ObjectID = require('mongodb').ObjectID;


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

var message = db.collection('message');

exports.ReceiverlistMessage = function(email, callback)
{
	message.find({receiver:email}).sort({date: -1}).toArray(function(e, o) {
		if (o){
			callback(null,o);
		}	else{
			callback('not message');
		}
	});
}

