const User = require("../models/userModel")
const Product = require("../models/productModel")
const { generateToken } = require("../utils/generateToken")
const asyncHandler = require("express-async-handler")

//used to signin as admin
exports.adminSignin = asyncHandler(async(req,res)=>{

    const {email , password} =req.body
    try {
        if(email && password){

            const { email, password } = req.body
            const user = await User.findOne({ email: email })
    
            if (user && await user.matchPassword(password) && user.role==="admin") {
                user.password = undefined
                user.token = null
                res.json({
        
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    district: user.district,
                    city: user.city,
                    role : user.role,
                    token: generateToken(user.id,user.role)
        
                })
        
            }
            else {
        
                throw new Error("Password or Email is incorrect")
            }
        }
        else{
                throw new Error("Need to fill all data")
    
        }
    } catch (error) {

        throw new Error(error.message)
        
    }

})

//created user after sigin 
exports.createUser = asyncHandler(async(req,res) =>{

        const { name , email , password , district , role} =req.body

        if(name && email && password && district && role){
            const existUser = await User.findOne({ email: email })

        if (existUser) {
            
            throw new Error("User already exist")
        }

        const user = await User.create(req.body)

        if (user) {
            user.password = undefined
            res.json({
    
                id: user._id,
                name: user.name,
                email: user.email,
                district : district,
                role : user.role
            })
    
        }
        else {
            
            throw new Error("Invalid data")
        }

        }
        else{

            throw new Error("Need to fill all data")

        }
   

})

//is used to get list of products need to accept 
exports.acceptProduct = asyncHandler(async(req,res) =>{
    try {

        const id = req.body.id

        if(id){
            const userid = req.user._id

        const product = await Product.findById(id)

        product.approved = true
        product.approvedby = userid

        await product.save()

        res.json(product)
        }
        else{

            throw new Error("Need to fill all data")
        }
        
    } catch (error) {

        throw new Error("Need to fill all data")
        
    }
})

//used to get list of users
exports.getUser = asyncHandler(async(req,res) =>{

    const user = await User.find({})

    res.json(user)

})

//used to accept the product
exports.approveActionAdmin = asyncHandler(async(req,res) =>{
    try {

        
        const product = await Product.find({ approved : false , rejected : false } )



        res.json(product)
        
    } catch (error) {

        throw new Error("Error occured")
        
    }
})

//additional one : get the products approved by loggedin admin [ not implemented in frontend]
exports.approvedByAdmin = asyncHandler(async(req,res) =>{
    try {

        const id = req.user._id
        const product = await Product.find({ approvedby : id} )

        res.json(product)
        
    } catch (error) {

        throw new Error("Error occured")
        
    }
})

//used to reject to product
exports.rejectProduct = asyncHandler(async(req,res) =>{
    try {

        const id = req.body.id

        if(id){
        

        const product = await Product.findById(id)

        product.rejected = true
        

        await product.save()

        res.json(product)
        }
        else{

            throw new Error("Need to fill all data")
        }
        
    } catch (error) {

        throw new Error("Need to fill all data")
        
    }
})
