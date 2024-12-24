const express = require('express');
const router = express.Router();
const authUser = require("../models/authUser")
const usercontroller = require('../controller/usercontroller');
const multer = require('multer');
const upload = multer({dest: "uploads/"});



router.post("/profile-image" ,upload.single('avatar'), usercontroller.user_profileImage_post)

  module.exports = router ;