const path = require('path')
const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

const Cliente = require('./models/cliente')
const cliente = require('./models/cliente')
const { Mongoose } = require('mongoose')

const dbUser = process.env.MONGODB_USER
const dbPassword = process.env.MONGODB_PASSWORD
const dbCluster = process.env.MONGODB_CLUSTER
const dbName = process.env.MONGODB_DATABASE

const stringConexao = `mongodb+srv://${dbUser}:${dbPassword}@${dbCluster}.mongodb.net/${dbName}?retryWrites=true&w=majority`

Mongoose.connect(stringConexao)
.then(() => {
  console.log("Conexão MongoDB ok")
})
.catch(err => {
  console.log(`Conexão MongodDB NOK: ${err}`)
})

app.use('/api/clientes', clienteRoutes)
app.use('/api/usuarios', usuarioRoutes)

module.exports = app
