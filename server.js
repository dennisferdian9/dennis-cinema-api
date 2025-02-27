const { config } = require('dotenv') 
const express = require('express');
const { Controllers } = require('./controllers') 


config() 

const app = express()

app.use(express.json()) // middleware jso
app.use(express.urlencoded({extended: true}))

app.use('/', Controllers)

module.exports = app
