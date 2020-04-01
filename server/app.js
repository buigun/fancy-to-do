// require('dotenv').config()
// const axios = require('axios')
const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')

app.use(cors())

const route = require('./routes')

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/',route)

app.listen(port,()=>{
    console.log('This app is running on port ',port)
})