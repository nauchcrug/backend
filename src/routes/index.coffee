{Router} = require 'express'
router = new Router
db = require 'routes/db'
protect = require 'routes/protect'

#router.use '/db', db
#router.use '/protected', protect

router.get '/', (req, res) ->
  res.json
    message: 'asga Hasglo, world 21'

router.post '/', (req, res) ->
  {id} = req.body
  {stringify} = JSON
  console.log stringify id
  res.send stringify id

router.get '/isprod', (req, res) ->
  {stringify} = JSON
  {NODE_ENV} = process.env
  console.log NODE_ENV
  production = stringify NODE_ENV
  res.send {production}

module.exports = router
