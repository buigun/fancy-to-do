const {User} = require('../models')
const jwt = require('jsonwebtoken')
const {hash,compare} = require('../helpers/bcrypt')

class UserController {
    static register(req,res) {
        const {email,password,username} = req.body

        User.create({email,password,username})
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
                res.status(401).json({message: 'email wrong'})
            } else {
                if (!compare(password,user.password)) {
                    res.status(401).json({message: 'password wrong'})
                } else {
                    const token = jwt.sign({
                        id: user.id
                    },'rahasia')
                    res.status(200).json(token)
                }
            }
        })
        .catch(err=>{
            res.status(500).json({message: err.message})
        })
    }
}

module.exports = UserController