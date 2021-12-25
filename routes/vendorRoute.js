const express = require("express")
const { createProduct, vendorSignin, createdByVendor } = require("../controllers/vendorController")
const { isLogin, isVendor } = require("../middlewares/userMiddleware")
const router = express.Router()

router.route("/signin").post(vendorSignin)
router.route("/create/product").post(isLogin, isVendor ,createProduct)
router.route("/product/createdby").get(isLogin , isVendor , createdByVendor)

module.exports = router