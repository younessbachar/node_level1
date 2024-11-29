const router = require('express').Router();
const usercontroller = require('../controller/usercontroller')


////get request
router.get('/edit/:id', usercontroller.user_edit_get)

///put request
router.put('/edit/:id', usercontroller.user_put)

module.exports = router;