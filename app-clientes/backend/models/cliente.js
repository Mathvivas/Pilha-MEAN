const mongoose = require('mongoose')

const clienteSchema = mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  fone: {
    type: String,
    required: false,
    default: '000000000'
  },
  email: {
    type: String,
    require: true
  }
})

module.exports = mongoose.model('Cliente', clienteSchema)
