const express = require('express');

const router = express.Router();
const usercontroller = require('../controller/usercontroller')



router.get("/signout", usercontroller.signout_controller)

module.exports = router