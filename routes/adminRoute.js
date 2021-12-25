const express = require("express")
const { createUser, adminSignin, getUser, acceptProduct, approvedByAdmin, approveActionAdmin, rejectProduct } = require("../controllers/adminController")
const { viewProduct } = require("../controllers/userController")
const { isLogin , isAdmin} = require("../middlewares/userMiddleware")
const router = express.Router()

router.route("/approve/action").get(isLogin , isAdmin ,approveActionAdmin)
router.route("/create/user").post(isLogin , isAdmin ,createUser)
router.route("/signin").post(adminSignin)
router.route("/user/view").get(isLogin , isAdmin,getUser)
router.route("/product/view").get(isLogin , isAdmin,viewProduct)
router.route("/product/approve").put(isLogin , isAdmin , acceptProduct)
router.route("/product/approvedby").get(isLogin , isAdmin , approvedByAdmin)
router.route("/product/reject").put(rejectProduct)

module.exports = router