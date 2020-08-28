const mongoose=require('mongoose');
const schema=mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var currency=mongoose.Types.currency;

const leadershipschema = new schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    designation:{
        type:String,
        default:'',
        required:true
    },
    abbr:{
        type:String,
        uppercase:true,
        required:true
    },
    description:{
        type: String,
        deafult:''
    },
    featured:{
        type:Boolean,
        deafult:false
    }
},{
  timestamps:true
});

var Leaders=mongoose.model('leader',leadershipschema);

module.exports=Leaders;
