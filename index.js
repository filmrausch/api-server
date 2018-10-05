require('dotenv').config()
const express = require('express')
const basicAuth = require('express-basic-auth')
const fs = require('fs')
const cors = require('cors')
const { exec } = require('child_process')

const PORT = process.env.PORT || 5000
const app = express()
app.use(express.json())
app.use(cors())

const withAuth = basicAuth({
  authorizer: (username, password) =>
    username === process.env.API_USER &&
    password === process.env.API_PASS
})

app.get('/', (_, res) => {
  fs.readFile('./movies.json', (err, data) => {
    if (err) {
      res.status(200).send([])
    } else {
      res.status(200).send(JSON.parse(data))
    }
  })
})

app.post('/', withAuth, (req, res) => {
  const data = JSON.stringify(req.body)
  fs.writeFile('./movies.json', data, (err) => {
    if (err) {
      res.status(400).send(`POST encountered an error: ${err}`)
    }
    else {

      if (process.env.POSTHOOK) {
        const shellPath = process.env.POSTHOOK
        exec(shellPath, (err) => {
          if (err) {
            res.status(400).send(`POSTHOOK encountered an error: ${err}`)
          } else {
            res.status(200).send('POSTHOOK was successful')
          }
        })
      }
      else {
        res.status(200).send('POST was successful')
      }

    }

  })
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
