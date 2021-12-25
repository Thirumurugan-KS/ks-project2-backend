const jwt = require("jsonwebtoken")

exports.generateToken = (id,role) =>{

    return jwt.sign({ id : id , role : role } , process.env.SECRET_WORD)

}