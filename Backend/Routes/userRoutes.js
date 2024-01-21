const express=require("express")
const {registerUser}=require("../Controllers/UserController")
const {authUser}=require("../Controllers/UserController")
const router=express.Router()

router.route('/').post(registerUser)
router.route('/login').post(authUser)

module.exports=router;