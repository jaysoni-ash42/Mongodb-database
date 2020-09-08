const mongoose = require("mongoose");
require('mongoose-currency').loadType(mongoose);
var currency = mongoose.Types.Currency;
const schema = mongoose.Schema;
const commentschema = new schema({
    rating: {
        type: String,
        max: 5,
        min: 1,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'

    }
},
    {
        timestamps: true
    });
const dishschema = new schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: ''
    },
    price: {
        type: currency,
        min: 0,
        required: true
    },
    featured: {
        type: Boolean,
        required: true
    },
    description: {
        type: String,
        deafult: false
    },
    comments: [commentschema]
},
    {
        timestamps: true
    });

var Dishes = mongoose.model("Dish", dishschema);
module.exports = Dishes;