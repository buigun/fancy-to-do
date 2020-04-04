const route = require('express').Router()
const todoRoute = require('./todoRoute')
const loginRoute = require('./loginRoute')
const registerRoute = require('./registerRoute')
const {errorHandler} = require('../middlewares/errorHandler')

route.use('/todos',todoRoute)

route.use('/login',loginRoute)
route.use('/register',registerRoute)
route.use(errorHandler)

module.exports = route