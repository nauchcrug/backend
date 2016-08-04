{Router} = require 'express'
router = new Router

router.get '/', (req, res) ->
  res.render 'profile'

router.get '/:id', (req, res) ->
  {id} = req
  sql = "select #{id} from profiles"
  result = db.query
  res.render 'profile', data

module.exports = router
