const express = require('express');
const router = express.Router();
const usercontroller = require('../controller/usercontroller')


router.delete('/delete/:id', usercontroller.user_delete)

module.exports = router;