const express = require('express');
const router = express.Router();
const usercontroller = require('../controller/usercontroller')


///get request
router.get('/user/add.html', usercontroller.user_add_get)


///post request

router.post("/user/add.html", usercontroller.user_post);

  module.exports = router;