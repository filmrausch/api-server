require('dotenv').config()
const express = require('express')
const basicAuth = require('express-basic-auth')
const fs = require('fs')
const child_process = require('child_process')
const cors = require('cors')
const util = require('util')

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)
const exec = util.promisify(child_process.exec)

const PORT = process.env.PORT || 5000
const app = express()
app.use(express.json())
app.use(cors())

const withAuth = basicAuth({
  authorizer: (username, password) =>
    username === process.env.API_USER &&
    password === process.env.API_PASS
})

app.get('/', async (_, res) => {

  try {
    const data = await readFile('./movies.json')
    res.status(200).send(JSON.parse(data))
  } catch (error) {
    res.status(200).send([])
  }
})

app.post('/', withAuth, async (req, res) => {

  const data = JSON.stringify(req.body)
  
  try {
    await writeFile('./movies.json', data)
    if (process.env.POSTHOOK) {
      await exec(process.env.POSTHOOK)
    }
    res.status(200).send(`POST successful!`)
  } catch (error) {
    res.status(400).send(`An error occured: ${error}`)
  }

})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
