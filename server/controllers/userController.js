require('dotenv').config()
const {User} = require('../models')
const jwt = require('jsonwebtoken')
const {hash,compare} = require('../helpers/bcrypt')
const { OAuth2Client } = require('google-auth-library');

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
                    },process.env.JWT_SECRET)
                    res.status(200).json(token)
                }
            }
        })
        .catch(err=>{
            res.status(500).json({message: err.message})
        })
    }

    static googleSignIn(req,res,next) {
        let user = null

        const client = new OAuth2Client(process.env.CLIENT_ID);
        client.verifyIdToken({
            idToken: req.body.id_token,
            audience: process.env.CLIENT_ID
        })
        .then(result => {
            user = result.getPayload()
            return User
              .findOne({
                where: {
                  email: user.email
                }
              })
        })
        .then(result => {
            if (result) {
              const token = jwt.sign({ email: result.email, id: result.id }, process.env.JWT_SECRET);
              res.status(200).json(token)
            } else {
              return User
                .create({
                  username: user.family_name,
                  email: user.email,
                  password: 'passWoRd!'
                }, {
                  hooks: false
                })
            }
          })
          .then(result => {
            const token = jwt.sign({ email: result.email, id: result.id }, process.env.JWT_SECRET);
            res.status(200).json(token)
          })
          .catch(err => {
            next(err)
          })
    }
}

module.exports = UserController