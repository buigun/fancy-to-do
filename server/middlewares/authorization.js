const {Todo} = require('../models')

const authorization = function (req,res,next) {
    Todo.findByPk(req.params.id)
    .then(result=>{
        if(!result) {
            res.status(404).json({message:'todo not found'})
        } else {
            if (result.UserId === req.user.id) {
                next()
            } else {
                res.status(403).json({message: 'access forbidden'})
            }
        }
    })
}

module.exports = authorization