const express = require('express')
const dotenv = require('dotenv')
const dbConnection = require('./src/config/db')
require('dotenv').config()
const app = express()

const port = process.env.PORT || 8080



app.listen(port,(e)=>{
    dbConnection()
    if(e){
        console.log(e)
    }
    console.log(`server on at this port => ${port}`)
})


