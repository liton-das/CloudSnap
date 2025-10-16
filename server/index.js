const express = require('express')
// const dbConnection = require('./src/config/db.js')
const cors = require('cors')
const route  = require('./src/routes/routes')
const dbConnection = require('./src/config/db')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 8080
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(route)
app.listen(port,(e)=>{
    dbConnection()
    if(e){
        console.log(e)
    }
    console.log(`server on at this port => ${port}`)
})


