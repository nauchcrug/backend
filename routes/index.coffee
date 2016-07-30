{Router} = require 'express'
router = Router()
db = require './db'

router.get '/', (req, res) ->
  res.json
    message: 'Hello, world'

router.use '/db', db

module.exports = router
