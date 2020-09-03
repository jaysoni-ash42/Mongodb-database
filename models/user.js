const mongoose = require('mongoose');
const scheme = mongoose.Schema;
 
var user = new scheme({
username:{
    type:String,
    required:true,
    unique:true

},
password:{
    type:String,
    required:true

},
admin:{
    type:Boolean,
    default:false

}
});

var Users=new mongoose.model('user',user);
module.exports = Users;
