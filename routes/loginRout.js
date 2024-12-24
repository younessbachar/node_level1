const express = require('express');
const router = express.Router();
const usercontroller = require('../controller/usercontroller')


///get request
router.get("/login", usercontroller.login_get_controller)


///post request
router.post("/login", usercontroller.login_post_controller)

module.exports = router;

