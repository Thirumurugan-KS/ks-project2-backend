const Product = require("../models/productModel")
const asyncHandler = require("express-async-handler")


//used to provide projects for users
exports.viewProduct = asyncHandler(async(req,res)=>{ 
    try {

        const products = await Product.find({ approved : true})

        res.json(products)
        
    } catch (error) {
        throw new Error("Error occured")
    }
})