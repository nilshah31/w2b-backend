const userController = require('../controller/users/user.js')
const express        = require('express')
const router         = express.Router()

router.route('/')
    .get(userController.getUser)
    .post(userController.creaateUser)

router.route('/login').post(userController.login)

module.exports = router;