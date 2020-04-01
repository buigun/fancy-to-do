const {Todo} = require('../models')

class ToDoController{
    
    static createToDo(req,res) {
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

    static updateTodo(req,res) {
        const {title,description,status,due_date} = req.body
        Todo.update({
            title,
            description,
            status,
            due_date,
            UserId: req.user.id
        },{where: {id: req.params.id}})
        .then(todo=>{
            if (todo) {
                return Todo.findByPk(req.params.id)
            } else {
                res.status(404).json({
                    message: 'To Do not found'
                })
            }
        })
        .then(hasil=>{
            res.status(200).json({hasil})
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

    static destroyTodo(req,res) {
        // Promise.all([Todo.findByPk(req.params.id),Todo.destroy({where: {id: req.params.id}})])
        Todo.findByPk(req.params.id)
        .then(deleted=>{
            if(deleted) {
                res.status(200).json({deleted})
                return Todo.destroy({where: {id: deleted.id}})
            } else {
                res.status(404).json({
                    message: 'To Do not found'
                })
            }
        })
        .then(result=>{
            res.status(200).json({message:'todo deleted'})
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }
}

module.exports = ToDoController
