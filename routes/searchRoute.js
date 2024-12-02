const express = require('express');
const router = express.Router();
const usercontroller = require('../controller/usercontroller')
const requireAuth = require("../middleware/middleware")


router.post("/search",requireAuth , usercontroller.user_search_post);

module.exports = router ;