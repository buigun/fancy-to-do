const route = require('express').Router()
const Controller = require('../controllers/userController')

route.post('/',Controller.login)
route.post('/google',Controller.googleSignIn)

module.exports = route