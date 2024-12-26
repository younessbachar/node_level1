const router = require('express').Router();
const usercontroller = require('../controller/usercontroller')
const {requireAuth} = require("../middleware/middleware")

router.delete('/deleteAll',requireAuth, usercontroller.user_deleteAll)

module.exports = router;