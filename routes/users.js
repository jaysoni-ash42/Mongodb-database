var express = require('express');
var bodyparser = require('body-parser');
var Users = require('../models/user');
const { application, text } = require('express');
var router = express.Router();
router.use(bodyparser.json());
var passport = require('passport');
var authenticate = require('../authentication');

/* GET users listing. */
router.get('/', function (req, res, next) {

});

router.post('/signup', (req, res, next) => {
  Users.register(new Users({ username: req.body.username }), req.body.password, (err, user) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({ err: err,status:false});

    }
    else {
      if (req.body.firstname)
      {
        user.firstname = req.body.firstname;
      }
      if (req.body.lastname)
      {
        user.lastname = req.body.lastname;
      }
      user.save().then((user) => {
        passport.authenticate('local')(req, res, () => {
          res.redirect('/');
        }, ((err) => {
          res.statusCode = 500; res.setHeader('Content-Type', 'application/json');
          res.json({ err: err })
        }));
      });
    }
  });
});
router.post('/login', passport.authenticate('local'), (req, res) => {
  var token = authenticate.gettoken({ _id: req.user._id });
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({ status: true, token:token, status:'login  successful'});

});
router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');

  }
  else {
    var err = new Error('you are not logged in!');
    err.status = 403;
    return next(err);
  }
});

module.exports = router;
