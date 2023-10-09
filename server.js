require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser');
const routes = require('./routes')

const server = express()

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true}))
server.use(routes)

const port = process.env.PORT || 3001

server.listen(port, ()=>{
    console.log('Server ligado . . .')
})
