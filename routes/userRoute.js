const express = require("express")
const { viewProduct } = require("../controllers/userController")
const router = express.Router()

router.route("/").get(viewProduct)

module.exports = router