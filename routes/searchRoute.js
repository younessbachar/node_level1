const express = require('express');
const router = express.Router();
const usercontroller = require('../controller/usercontroller')



router.post("/search", usercontroller.user_search_post);

module.exports = router ;