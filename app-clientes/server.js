require('dotenv').config()
const http = require('http')
const app = require('./backend/app')
//const port = 3000

app.set('port', process.env.PORT)
const server = http.createServer(app)

server.listen(process.env.PORT)

