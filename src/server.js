const express = require('express')
const next = require('next')
const path = require('path')

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, dir: path.resolve(__dirname, '.') })
const handle = app.getRequestHandler()
app
  .prepare()
  .then(() => {
    const server = express()
    server.get('/page/:id', (req, res) => {
      const actualPath = '/page'
      const queryParams = { id: req.params.id }
      app.render(req, res, actualPath, queryParams)
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, err => {
      if (err) throw err
      console.log('BFF listen on 3000')
    })
  })
  .catch(err => {
    console.error(err.stack)
    process.exit(1)
  })
