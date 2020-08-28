const mongoose=require('mongoose');
const schema=mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var currency=mongoose.Types.Currency;

const promotionschema = new schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    label:{
        type:String,
        default:''
    },
    price:{
        type:currency,
        min:0,
        required:true
    },
    description:{
        type: String,
        deafult:''
    },
    featured:{
        type: String,
        deafult:false
    }
},{
  timestamps:true
});

var Promotions=mongoose.model('promotion',promotionschema);

module.exports=Promotions;
