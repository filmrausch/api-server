require('dotenv').config()
const express = require('express')
const basicAuth = require('express-basic-auth')
const fs = require('fs')

const PORT = process.env.PORT || 5000
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

  try {
    data = JSON.stringify(req.body)
    fs.writeFile('./movies.json', data, (err) => {
      if (err) throw err
      res.status(200).send('POST was successful')
    })
  }
  catch (e) {
    res.status(400).send(`POST encountered an error: ${e}`)
  }

})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})