{Router} = require 'express'
router = Router()

router.get '/', (req, res) ->
  res.json
    message: 'Hello, world'

module.exports = router
