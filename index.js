require('dotenv').config()
const PORT = process.env.PORT || 5000

const express = require('express')
const bodyParser = require('body-parser')
const basicAuth = require('express-basic-auth')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }));

const withAuth = basicAuth({
  authorizer: (username, password) => 
    username === process.env.USER &&
    password === process.env.PASS
})

app.get('/', (req, res) => {
  console.log('get got')
})

app.post('/', withAuth, (req, res) => {
  console.log(req.body)
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})