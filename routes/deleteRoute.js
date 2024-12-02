const express = require('express');
const router = express.Router();
const usercontroller = require('../controller/usercontroller')
const requireAuth = require("../middleware/middleware")

router.delete('/delete/:id',requireAuth, usercontroller.user_delete)

module.exports = router;