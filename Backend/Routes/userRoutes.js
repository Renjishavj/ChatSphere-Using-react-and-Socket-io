const express=require("express")
const {registerUser, allUsers}=require("../Controllers/UserController")
const {authUser}=require("../Controllers/UserController");
const { protect } = require("../Middleware/authMiddleware");
const router=express.Router()


router.route('/').post(registerUser).get(protect,allUsers);
router.route('/login').post(authUser)

module.exports=router;