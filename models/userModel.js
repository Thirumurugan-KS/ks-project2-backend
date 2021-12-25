const mongoose = require('mongoose');
require('mongoose-type-email');

const bcrypt = require("bcryptjs")

const userSchema = mongoose.Schema({
    name : String,
    email : mongoose.SchemaTypes.Email,
    password : String,
    district : String,
    role : String
},{
    timestamps : true
})

userSchema.pre('save', async function(next){

    if(!this.isModified('password')){
        next()
    }

    this.password = bcrypt.hashSync(this.password,10)
})

userSchema.methods.matchPassword = async function(enterPassword){

    return await bcrypt.compare(enterPassword , this.password)

}

module.exports = mongoose.model("user", userSchema)