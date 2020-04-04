require('dotenv').config()
const {User} = require('../models')
const jwt = require('jsonwebtoken')
const {hash,compare} = require('../helpers/bcrypt')
const { OAuth2Client } = require('google-auth-library');

class UserController {
    static register(req,res,next) {
        const {email,password,username} = req.body

        User.create({email,password,username})
        .then(user=>{
            res.status(201).json(user)
        })
        .catch(next)
    }

    static login(req,res,next) {
        const {email,password} = req.body
        User.findOne({
            where: {email: email}
        })
        .then(user=>{
            if (!user) {
                throw {
                  status: 401,
                  message: 'wrong email'
                }
            } else {
            if (!compare(password,user.password)) {
              throw {
                status: 401,
                message: 'wrong password'
              }
            } else {
                const token = jwt.sign({
                id: user.id
                },process.env.JWT_SECRET)
                res.status(200).json(token)
              }
            }
        })
        .catch(next)
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
                  password: hash('passWoRd!')
                }, {
                  hooks: false
                })
            }
          })
          .then(result => {
            const token = jwt.sign({ email: result.email, id: result.id }, process.env.JWT_SECRET);
            res.status(200).json(token)
          })
          .catch(next)
    }
}

module.exports = UserController