const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'I\'m here' })
})

app.get('/test', (request, response) => {
  response.json({ user: '93857129', name: 'John Doe', photo: 'https://scontent-ort2-2.xx.fbcdn.net/v/t1.0-9/14713509_995433853900445_4536229211525512364_n.jpg?_nc_cat=110&_nc_oc=AQlS8-ml5gj9IVkg39UG2AvelXlTSUDha-8X1VOxFUHi7ZvZOQptsHg2-ndhEZ_5hNY&_nc_ht=scontent-ort2-2.xx&oh=f30fe67bb424c708a35e1600bc3ea00c&oe=5E64E849' })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})