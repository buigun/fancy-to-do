const {Todo} = require('../models')

class ToDoController{
    
    static createToDo(req,res,next) {
        const {title,description,status,due_date} = req.body
        Todo.create({
            title,
            description,
            status,
            due_date,
            UserId : req.user.id
        })
        .then(todo=>{
            res.status(201).json({todo})
        })
        .catch(next)
    }

    static getToDos(req,res,next) {
        Todo.findAll({
            where: {
              UserId: req.user.id
            },
            order: [['id', 'ASC']]
          })
        .then(todos=>{
            console.log(todos,'ini todos')
            res.status(200).json({todos})
        })
        .catch(next)
    }

    static getTodo(req,res,next) {
        Todo.findByPk(req.params.id)
        .then(todo=>{
            res.status(200).json({todo})
        })
        .catch(next)
    }

    static updateTodo(req,res,next) {
        const {title,description,status,due_date} = req.body
        Todo.update({
            title,
            description,
            status,
            due_date,
            UserId: req.user.id
        },{where: {id: req.params.id}})
        .then(todo=>{
            return Todo.findByPk(req.params.id)
        })
        .then(hasil=>{
            res.status(200).json({hasil})
        })
        .catch(next)
    }

    static destroyTodo(req,res,next) {
        Todo.findByPk(req.params.id)
        .then(deleted=>{
            res.status(200).json({deleted})
            return Todo.destroy({where: {id: deleted.id}})
        })
        .then(result=>{
            res.status(200).json({message:'todo deleted'})
        })
        .catch(next)
    }
}

module.exports = ToDoController
