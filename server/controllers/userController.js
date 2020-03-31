const {User} = require('../models')
const jwt = require('jsonwebtoken')
const {hash,compare} = require('../helpers/bcrypt')

class UserController {
    static register(req,res) {
        const {email,password,username,role} = req.body
        
        const newUser = {
            email,username,role,
            password : hash(password)
        }

        User.create(newUser)
        .then(user=>{
            res.status(201).json(user)
        })
        .catch(err=>{
            res.status(500).json({message: err.message})
        })
    }

    static login(req,res) {
        const {email,password} = req.body
        User.findOne({
            where: {email: email}
        })
        .then(user=>{
            if (!user) {
                res.status(401).json({message: 'email/password wrong'})
            } else {
                if (!compare(password,user.password)) {
                    res.status(401).json({message: 'email/password wrong'})
                } else {
                    
                }
            }
        })
    }
}

module.exports = UserController