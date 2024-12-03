const express = require('express');
const router = express.Router();
const usercontroller = require('../controller/usercontroller')
const requireAuth = require("../middleware/requireAuth")

router.get('/home',requireAuth , usercontroller.user_index_get);

module.exports = router;
