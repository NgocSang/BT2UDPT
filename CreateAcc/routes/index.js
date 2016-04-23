
var AM = require('./modules/account-manager');

/* GET home page. */
module.exports = function(app){

    //Tao tai khoan
    app.get('/createlogin', function(req, res) {
      res.render('createlogin', {  title: 'create_account'});
    });

    app.post('/createlogin', function(req, res){
      AM.addNewAccount({
        name 	: req.body.name,
        email 	: req.body.email,
        pass	: req.body.pass
      }, function(e){
        if (e){
          res.status(400).send(e);
        }

      });
    });
      
 
