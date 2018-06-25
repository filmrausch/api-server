require('dotenv').config()
const PORT = process.env.PORT || 5000

const express = require('express')
const basicAuth = require('express-basic-auth')

const app = express()
app.use(express.json());

const withAuth = basicAuth({
  authorizer: (username, password) => 
    username === process.env.USER &&
    password === process.env.PASS
})

app.get('/', (req, res) => {
  res.status(200).send('get got')
})

app.post('/', withAuth, (req, res) => {
  res.status(200).send('post recieved')
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})