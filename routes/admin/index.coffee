{Router,} = require 'express'
serve = require 'serve-static'
router = new Router

#routes
profile = require './profile'

router.use '/', serve 'node_modules/admin-lte'
router.use '/profile', profile

module.exports = router
