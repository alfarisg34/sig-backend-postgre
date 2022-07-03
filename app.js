require('dotenv').config()
const express = require('express')

const { testConnection } = require('./sequelize')
const app = require('./express')

const port = process.env.PORT || 8000

testConnection()
const server = express();
app(server)

function logMessage() {
  return () => console.log(`This App is Running on port ` + port) 
}

server.listen(port, logMessage())