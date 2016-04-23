var express = require('express');
var router = express.Router();
var AM = require('./modules/account-manager');

/* GET home page. */
module.exports = function(app){
app.get('/', function(req, res, next) {
  if (req.cookies.name == undefined || req.cookies.pass == undefined)
  {
    res.render('newuser', { title: 'Express' });}
});
app.post('/adduser', function(req, res){
		console.log(req.body.username);
		AM.manualLogin(req.body.username, req.body.pass, function(e, o){
			if (!o){
				res.status(400).send(e);
			}	else{
				console.log('erro');
				}
				res.status(200).send(o);
			});
		});

  }
