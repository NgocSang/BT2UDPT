
var AM = require('./modules/account-manager');
var ME = require('./modules/message');

/* GET home page. */
module.exports = function(app){
var login = null;
app.get('/', function(req, res, next) {
  if (login == null)
  {
    res.render('login', { title: 'Login' });
  }else{
    ME.listMessage(login.email,function(e,o){
      if(o == null){
        console.log('ko co bai');
      }
      else{
      req.session.user = o;
      console.log(o.length);
      res.render('homemessage',{

      data:o
      }
    )};
    });
  }

});
app.post('/', function(req, res){
    console.log(req.body.email);
    console.log(req.body.pass);
		AM.manualLogin(req.body.email, req.body.pass, function(e, o){
			if (!o){
        console.log("Loi ko danh nhap dc");
				res.status(400).send(e);
			}	else{
        login = o;
        console.log("Trong login");
        console.log(login);
				}
			});
		});
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
        else{
          res.redirect('/')
        }
      });
    });
      app.get('/homemessage', function(req, res) {
        var list = [];
        if(login == null){
          res.redirect('/');
        }else{
        ME.ReceiverlistMessage(login.email,function(e,o){
          if(o == null){
            console.log('ko co bai');
          }
          else{
          FR.listFriend(login.email,function(e,p){
            if(p != null)
            {
              console.log("So luong block");
              console.log(p.block.length);
              for(var i= 0 ; i < o.length ; i++)
              {
                console.log("Vo ham homemessage de kiem tra");
                var KT = false;
                for(var j = 0 ; j < p.block.length ; j++)
                {
                  if(o[i].sender == p.block[j])
                  {
                    KT = true;
                  }
                }
                if(KT == false)
                {
                  list.push(o[i]);
                }
              }
              res.render('homemessage',{
              data:list})
              }
            else{
              res.render('homemessage',{
              data:o
              })
            };
          });
          };

        });
      };
      });

       app.get('/homemessage', function(req, res) {
        var list = [];
        if(login == null){
          res.redirect('/');
        }else{
        ME.ReceiverlistMessage(login.email,function(e,o){
          if(o == null){
            console.log('ko co bai');
          }
          else{
          FR.listFriend(login.email,function(e,p){
            if(p != null)
            {
              console.log("So luong block");
              console.log(p.block.length);
              for(var i= 0 ; i < o.length ; i++)
              {
                console.log("Vo ham homemessage de kiem tra");
                var KT = false;
                for(var j = 0 ; j < p.block.length ; j++)
                {
                  if(o[i].sender == p.block[j])
                  {
                    KT = true;
                  }
                }
                if(KT == false)
                {
                  list.push(o[i]);
                }
              }
              res.render('homemessage',{
              data:list})
              }
            else{
              res.render('homemessage',{
              data:o
              })
            };
          });
          };

        });
      };
      });
    