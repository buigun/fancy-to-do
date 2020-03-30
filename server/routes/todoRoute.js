const route = require('express').Router()
const Controller = require('../controllers/todoController')

route.get('/',Controller.getToDos)
route.post('/',Controller.createToDo)
route.get('/:id',Controller.getTodo)

module.exports = route