const mongoose = require('mongoose');


const productSchema = mongoose.Schema({
    name : String,
    description : String,
    price : String,
    image : {
        id : String,
        secure_url : String
    },
    approved : {
        type : String,
        default : false
    },
    rejected : {
        type : String,
        default : false
    },
    createdby : {
        type : mongoose.Schema.ObjectId,
        ref : 'user'
    },
    approvedby : {
        type : mongoose.Schema.ObjectId,
        ref : 'user'
    },
    district : String
},{
    timestamps : true
})

module.exports = mongoose.model("product", productSchema)