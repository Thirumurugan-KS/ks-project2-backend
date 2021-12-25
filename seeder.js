const { config } = require("./Config/mongooseConfig")
const dotenv = require("dotenv")
dotenv.config()

config()

const User = require("./models/userModel")

const createUser = async() =>{
    await User.deleteMany()
    const adminUser = {
        'name' : 'Admin',
        'email' : 'admin@gmail.com',
        'password' : 'admin',
        'district' : 'admin',
        'role' : 'admin'
    }
    await User.create(adminUser)

    const vendorUser = {
        'name' : 'vendor',
        'email' : 'vendor@gmail.com',
        'password' : 'vendor',
        'district' : 'vendor',
        'role' : 'vendor'
    }
    await User.create(vendorUser)

    console.log("Completed")

}

createUser()

