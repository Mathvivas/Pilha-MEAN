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
const stringConexao = //string do mongodb

Mongoose.connect(stringConexao)
.then(() => {
  console.log("Conexão MongoDB ok")
})
.catch(err => {
  console.log(`Conexão MongodDB NOK: ${err}`)
})

// app.use((req, res, next) => {
//    console.log('Chegou uma requisição')
//    next()    // Envia para o próximo app.use
//  })

//http://localhost:3000/api/clientes/:id
app.delete('/api/clientes/:id', (req, res) => {
  cliente.deleteOne({_id: req.params.id})
  .then((resultado) => {
    console.log(resultado)
    res.status(200).end()
  })
})

app.post('/api/clientes', (req, res, next) => {
  console.log(req.body)
  const cliente = new Cliente({
    nome: req.body.nome,
    fone: req.body.fone,
    email: req.body.email
  })
  cliente.save().then((clienteInserido) => {
    res.status(201).json({
      id: clienteInserido._id,
      mensagem: "Cliente Inserido"
    })
  })
})

app.get('/api/clientes', (req, res, next) => {
  Cliente.find().then(doc => {
    console.log(doc)
    res.status(200).json({
      mensagem: 'Tudo OK',
      clientes: doc
    })
  })
})

app.put('/api/clientes/:id', (req, res) => {
  const cliente = new Cliente({
    _id: req.params.id,
    nome: req.body.nome,
    fone: req.body.fone,
    email: req.body.email
  })
  Cliente.updateOne({ _id: req.params.id }, cliente)
})

module.exports = app
