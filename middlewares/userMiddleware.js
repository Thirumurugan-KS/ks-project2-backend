const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const User = require('../models/userModel.js')

exports.isLogin = asyncHandler(async(req,res,next)=>{
    try{
        let token 
        if(req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')){
                let token = req.headers.authorization.split(" ")[1]   
                let dectoken = jwt.verify(token , process.env.SECRET_WORD)
                let id = dectoken.id
                user = await User.findById(id)
                req.user = user
                next()
                
            }
            else{
                res.status(401)
            throw new Error("Not authorized")

            }
    }
    catch{
        
        res.status(401)
        throw new Error("Not authorized")
    }
})

exports.isAdmin = asyncHandler(async(req,res,next)=>{
    try{

        const user = req.user
        const role = user.role
        if(role==='admin'){
            next()
        }
        else{

            res.status(401)
            throw new Error("Not authorized")
        
        }

    }
    catch(error){
        res.status(401)
        throw new Error("Not authorized")
    }
})

exports.isVendor = asyncHandler(async(req,res,next)=>{
    try{

        const user = req.user
        const role = user.role
        if(role==='vendor'){
            next()
        }
        else{

            res.status(401)
            throw new Error("Not authorized")
        
        }

    }
    catch(error){
        res.status(401)
        throw new Error("Not authorized")
    }
})

