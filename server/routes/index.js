const route = require('express').Router()
const todoRoute = require('./todoRoute')
const loginRoute = require('./loginRoute')
const registerRoute = require('./registerRoute')
// const authentication = require('../middleware/authentication')

route.use('/todos',todoRoute)

// route.use(authentication)
route.use('/login',loginRoute)
route.use('/register',registerRoute)

module.exports = route