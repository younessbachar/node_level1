const router = require('express').Router();
const usercontroller = require('../controller/usercontroller')
const requireAuth = require("../middleware/middleware")

////get request
router.get('/edit/:id',requireAuth , usercontroller.user_edit_get)

///put request
router.put('/edit/:id', usercontroller.user_put)

module.exports = router;