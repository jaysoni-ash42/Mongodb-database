var express = require('express');
var bodyparser = require('body-parser');
var Users = require('../models/user');
const { application, text } = require('express');
var router = express.Router();
router.use(bodyparser.json());

/* GET users listing. */
router.get('/', function (req, res, next) {
  
});

router.post('/signup', (req, res, next) => {
  Users.findOne({ username: req.body.username }).then((user) => {
    if (user == null) {
      Users.create({ username: req.body.username, password: req.body.password }).then((user) => {
        res.status = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ status: 'Registeration successful', user: user });

      }, (err) => next(err));

    } else {
      var err = new Error("Your id already exist");
      err.status = 403;
      next(err);
    }


  }).catch((err) => next(err));
});
router.post('/login', (req, res, next) => {
  if (!req.session.user) {
      var error = new Error('You are not authtified!');
      res.setHeader('www-Authenticate', 'Basic');
      error.status = 401;
      return next(error);
    }
    else {
      var authname = req.headers.authorization;
      var authtified = new Buffer.from(authname.split(' ')[1], 'base64').toString().split(':');
      Users.findOne({ username: authtified[0] }).then((user) => {
        if (user == null) {
          var error = new Error('no such user exist!');
          error.status = 403;
          return next(error);
        }
        else if (user.password != authtified[1]) {
          var error = new Error('your password is incorrect!');
          error.status = 403;
          return next(error);
        }
        else if (user.username == authtified[0] && user.password == authtified[1]) {
          req.session.user = 'authentified';
          res.statusCode = 200;
          res.setHeader("Content-Type", 'text/plain');
          res.end('Login successful');
        }
      }).catch((err) => next(err));

    }

  }

  else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end('Your are already logged in');
  }

});
router.get('/logout',(req,res)=>{
  if(req.session)
  {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');

  }
  else{
    var err = new Error('you are not logged in!');
    err.status=403;
    next(err);
  }
});

module.exports = router;
