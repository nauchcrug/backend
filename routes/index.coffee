express = require 'express'
router = express.Router

router.get '/', (res, res) ->
  res.json
    message: 'Hello, world'
