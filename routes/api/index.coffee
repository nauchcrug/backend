{Router} = require 'express'
router = new Router
db = require routes + 'api/db'
protect = require routes + 'protect'

router.use '/db', db
#router.use '/protected', protect

router.get '/', (req, res) ->
  res.json
    message: 'asga Hasglo, world 21'

router.post '/', (req, res) ->
  {id} = req.body
  console.log id
  res.json id

router.get '/isprod', (req, res) ->
  {NODE_ENV} = process.env
  console.log NODE_ENV
  res.json production: NODE_ENV

module.exports = router
