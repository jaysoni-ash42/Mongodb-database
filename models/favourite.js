const mongoose = require("mongoose");
const schema = mongoose.Schema;
const favouriteschema = new schema({
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'

    },
    dishes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish'
    }]
},
    {
        timestamps: true
    });

var Favourites = mongoose.model('Favourite', favouriteschema);
module.exports = Favourites;