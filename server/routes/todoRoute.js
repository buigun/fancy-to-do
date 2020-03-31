const route = require('express').Router()
const Controller = require('../controllers/todoController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

route.get('/', authentication, Controller.getToDos)
route.post('/', authentication, Controller.createToDo)
route.get('/:id',[authentication,authorization],Controller.getTodo)
route.put('/:id',[authentication,authorization],Controller.updateTodo)
route.delete('/:id',[authentication,authorization],Controller.destroyTodo)

module.exports = route