{Router} = require 'express'
router = new Router

#routes
db = require './db'

router.get '/', (req, res) ->
  res.json
    message: 'Hasglo, world 21'

router.post '/', (req, res) ->
  console.log req.body
  res.send 'Okayasf!'

router.use '/db', db

module.exports = router
