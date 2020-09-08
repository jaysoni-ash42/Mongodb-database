var passport = require('passport');
var localstrategy = require('passport-local').Strategy;
var jwt = require('jsonwebtoken');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var config = require('./config');
var Users = require('./models/user');

passport.use(new localstrategy(Users.authenticate()));
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());
exports.gettoken = function (user) {
    return jwt.sign(user, config.seceretkey,{ expiresIn: 86000*7 });
};
var opt = {};
opt.jwtFromRequest =ExtractJwt.fromAuthHeaderAsBearerToken();
opt.secretOrKey = config.seceretkey;


exports.jwtpassport = passport.use(new JwtStrategy(opt,function (jwt_payload, done)  {
    //console.log('jwt_payload'+jwt_payload._doc._id);
        Users.findOne({_id:jwt_payload._id},(err,user)=>{
            if(err)
            {
                console.log("err"+err);
                return done(err,false);
            }
            else if(user)
            {
                return done(null,user);
            }
            else{
                console.log('thalla');
                return done(null,false);
            }

        });
}));
exports.verify=passport.authenticate('jwt',{session:false});
exports.verifyadmin=(req,res,next)=>
{
    if(!req.user.admin)
    {
         error = new Error("you are not authorized");
         error.status=403;
         return next(error);
    }
    else{
       next();
    }
};