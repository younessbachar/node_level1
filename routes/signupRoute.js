const express = require('express');
const router = express.Router();
const {validationResult ,check } = require("express-validator")
const usercontroller = require('../controller/usercontroller')

const jwt = require('jsonwebtoken');



router.get("/signup", usercontroller.signup_get_controller)

router.post("/signup",[
    check("email", "Please provide a valid email").isEmail(),
    check("password", "Password must be at least 8 characters with 1 upper case letter and 1 number").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
 ], usercontroller.signup_post_controller)

module.exports = router;