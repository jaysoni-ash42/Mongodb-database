const mongoose = require('mongoose');
const scheme = mongoose.Schema;
const passportlocalmongoose = require('passport-local-mongoose');

var user = new scheme({
    firstname: {
        type: String,
        default:''
    },
    lastname: {
        type: String,
        default:''
    },
    admin: {
        type: Boolean,
        default: false

    },
    image:{
        data:Buffer,
        type:String
    }
});
user.plugin(passportlocalmongoose);
var Users = new mongoose.model('user', user);
module.exports = Users;
