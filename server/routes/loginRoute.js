const route = require('express').Router()
const Controller = require('../controllers/userController')

route.post('/',Controller.login)

module.exports = route