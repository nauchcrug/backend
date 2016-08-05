{Router} = require 'express'
router = new Router

exams = require './exams'

router.get '/', (req, res) ->
  res.render 'site/index'

router.use '/exams', exams

module.exports = router
