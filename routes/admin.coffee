{Router} = require 'express'
router = Router()

router.get '/', (req, res) ->
  res.send '<h1>Admin</h1>'

module.exports = router
