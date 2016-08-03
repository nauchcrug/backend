{Router,} = require 'express'
serve = require 'serve-static'
router = new Router

router.use '/', serve 'node_modules/admin-lte'

module.exports = router
