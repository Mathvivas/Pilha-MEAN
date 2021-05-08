const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", '*')
//   res.setHeader("Access-Control-Allow-Headers", 'Origin, x-Requested-With, Content-Type, Accept')
//   res.setHeader("Access-Control-Allow-Methods", 'GET, POST, PATCH, DELETE, OPTIONS')
//   next()
// })

const clientes = [
  {
    id: '1',
    nome: 'José',
    fone: '1123344',
    email: 'jose@email.com'
  },
  {
    id: '2',
    nome: 'Ana',
    fone: '11225577',
    email: 'ana@email.com'
  }
]

// app.use((req, res, next) => {
//    console.log('Chegou uma requisição')
//    next()    // Envia para o próximo app.use
//  })

app.post('/api/clientes', (req, res, next) => {
  const cliente = req.body
  console.log(cliente)
  res.status(201).json({
    mensagem: "Cliente Inserido"
  })
})

app.get('/api/clientes', (req, res, next) => {
  res.status(200).json({
    mensagem: 'Tudo OK',
    clientes: clientes
  })
})

module.exports = app
