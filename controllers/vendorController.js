const Product = require("../models/productModel")
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const { generateToken } = require("../utils/generateToken")
const cloudinary = require('cloudinary').v2

const appPrefix = 'temp';

cloudinary.config({
    cloud_name : process.env.NAME,
    api_key : process.env.KEY,
    api_secret : process.env.SECRET
})

//used to sigin as vendor
exports.vendorSignin = asyncHandler(async(req,res)=>{

    const { email , password } = req.body
    if(email && password){
        const { email, password } = req.body
       
        const user = await User.findOne({ email : email })
        if (user && await user.matchPassword(password) && user.role==="vendor") {
            user.password = undefined
            res.status(200)
            res.json({
    
                id: user._id,
                name: user.name,
                email: user.email,
                district: user.district,
                role : user.role,
                token: generateToken(user._id,user.role)
    
            })
    
        }
        else {
           
            res.status(401)
            throw new Error("Password or Email is incorrect")
        }
    }

    
    else{
            throw new Error("Need to fill all data")

    }

})

//used to create products
exports.createProduct = asyncHandler(async(req,res)=>{

    try {
        
        const { name , description , price } = req.body        
        if(name && description && price && req.files){


            const cloud = await cloudinary.uploader.upload(req.files.photos.tempFilePath,{
                folder : "Products"
            })
            const image = {
                id : cloud.public_id,
                secure_url : cloud.secure_url
            }
            req.body.image = image
            req.body.createdby = req.user._id
            const product = await Product.create(req.body)
            res.json(product)
        }
        else{
            throw new Error("Error occured")
        }
        
    } catch (error) {

        throw new Error("Error occured")
        
    }
})

//used to show products
exports.createdByVendor = asyncHandler(async(req,res) =>{
    try {

        const id = req.user._id

        const product = await Product.find({ createdby : id} )

        res.json(product)
        
    } catch (error) {

        throw new Error("Error occured")
        
    }
})
