import '@babel/polyfill'
import bodyParser from 'body-parser'
import express from 'express'
import apollo from './apollo'
import mongooseConnection from './connections/mongoose'

import api from './api'

const app = express()
const port = process.env.PORT || 8080

app.use(express.static('public'))
app.use(bodyParser.json())
app.use('/api', api)

apollo.applyMiddleware({ app })

mongooseConnection.connect().then(() => {
  app.listen(port, () => {
    console.log(`Listen on port ${port}...`)
  })
})
