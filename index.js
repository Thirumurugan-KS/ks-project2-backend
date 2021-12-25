const express = require("express")
const cors = require("cors")
const fileUpload = require("express-fileupload")
require('dotenv').config()
const app = express()
const { config } = require("./config/mongooseConfig")

config()

app.use(express.json())
app.use(cors())
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : "/temp/"
}))

const adminRoute = require("./routes/adminRoute")
const vendorRoute = require("./routes/vendorRoute")
const userRoute = require("./routes/userRoute")
const { customError } = require("./middlewares/customMiddleware")

app.use('/api/admin',adminRoute)
app.use('/api/vendor',vendorRoute)
app.use('/api',userRoute)

app.use(customError)

app.listen( process.env.PORT || 5000, ()=>{
    console.log("Server is up")
})