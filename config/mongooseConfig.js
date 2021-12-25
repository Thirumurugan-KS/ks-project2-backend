const mongoose = require('mongoose');

exports.config = () =>{
    
    mongoose.connect(process.env.DATABASE, ()=>{
    console.log("DB Connected")
});
}