const {Todo} = require('../models')

class ToDoController{
    
    static createToDo(req,res) {
        const {title,description,status,due_date} = req.body
        Todo.create({
            title,
            description,
            status,
            due_date
        })
        .then(todo=>{
            res.status(201).json({todo})
        })
        .catch(err=>{
            if (err.name === 'SequelizeValidationError') {
                let msgArr = []

                err.errors.forEach(el => {
                    msgArr.push(el.message)
                });

                res.status(400).json({
                    message: msgArr.join(', ')
                })
            } else {
                res.status(500).json(err)
            }
        })
    }

    static getToDos(req,res) {
        Todo.findAll()
        .then(todos=>{
            console.log(todos,'ini todos')
            res.status(200).json({todos})
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }

    static getTodo(req,res) {
        Todo.findByPk(req.params.id)
        .then(todo=>{
            if (todo) {
                res.status(200).json({todo})
            } else {
                res.status(404).json({
                    message: 'To Do not found'
                })
            }
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }
}

module.exports = ToDoController
