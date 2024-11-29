const express = require('express');
const router = express.Router();
const usercontroller = require('../controller/usercontroller')


router.get('/view/:id', usercontroller.user_view_get)

module.exports = router;