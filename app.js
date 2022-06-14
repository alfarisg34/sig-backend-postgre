require('dotenv').config()
const express = require('express')
const cors = require('cors')

const { testConnection } = require('./sequelize')
const app = require('./express')

const port = process.env.PORT || 3000

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true, // access-control-allow-credentials:true
  allowedHeaders: ['Content-Type', 'Authorization', 'Set-Cookie'],
  optionSuccessStatus: 200,
}

testConnection()
const server = express();
app(server)
server.use(cors(corsOptions))

function logMessage() {
  return () => console.log(`This App is Running on port ` + port) 
}

server.listen(port, logMessage())