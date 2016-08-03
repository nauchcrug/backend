{Router} = require 'express'
router = new Router

router.get '/', (req, res) ->
  console.log '123'
