
var AM = require('./modules/account-manager');
var FR = require('./modules/friend');
var ME = require('./modules/message');

/* GET home page. */
module.exports = function(app){
var login = null;
  app.get('/logout', function(req, res) {
    if(login != null){
      login = null;
      res.redirect('/');
    }
  });
  