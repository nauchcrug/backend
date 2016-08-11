{Router,} = require 'express'
serve = require 'serve-static'
router = new Router

#routes
#profile = require './profile'

router.use '/static', serve 'node_modules/admin-lte'
#router.use '/profile', profile

router.get '/', (req, res) ->
  res.render 'cab/index',
    title: 'Личный кабинет'

module.exports = router
