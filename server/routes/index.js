const route = require('express').Router()
const todoRoute = require('./todoRoute')
const loginRoute = require('./loginRoute')
const registerRoute = require('./registerRoute')

route.use('/todos',todoRoute)

route.use('/login',loginRoute)
route.use('/register',registerRoute)

module.exports = route