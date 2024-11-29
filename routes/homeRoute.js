const express = require('express');
const router = express.Router();
const usercontroller = require('../controller/usercontroller')


router.get('/home', usercontroller.user_index_get);

module.exports = router;