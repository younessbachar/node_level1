const express = require('express');
const router = express.Router();
const usercontroller = require('../controller/usercontroller')
const requireAuth = require("../middleware/middleware")

router.get('/view/:id',requireAuth, usercontroller.user_view_get)

module.exports = router;