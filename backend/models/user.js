const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    pic: {

        type : String,
        required : false

    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart : [

        {
            product : {

                type : Object,
                required : true,

            },
            quantity:{

                type : Number,
                required : true

            }

        }

    ]

})

module.exports = mongoose.model('User',userSchema)