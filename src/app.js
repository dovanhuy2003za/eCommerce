require('dotenv').config()
const compression = require("compression")
const express = require("express")
const morgan = require("morgan")
const {default:helmet}=require("helmet")
const app=express()

//init midlewares
app.use(morgan("dev"))
app.use(helmet())
app.use(compression())
//init db
require('./dbs/init.mongodb')
const {countConnect,checkOverload}=require('./helpers/check.connect')
checkOverload()
//init routes
app.use(require('./routes'))

//handling error

module.exports=app