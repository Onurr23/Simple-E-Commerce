const mongoose = require('mongoose');

const productSchema = mongoose.Schema({

    name : {

        type : String,
        required : true

    },

    price : {

        type : String,
        required : true


    },

    description : {

        type : String,
        required : true

    },

    imageUrl : {

        type : String,
        required : true


    },
    category : {

        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category',
        required : false

    },
    userId : {

        type : String,
        required : false,
        ref : 'User'

    },

})

module.exports = mongoose.model('Product',productSchema)
