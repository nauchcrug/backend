{Router} = require 'express'
router = new Router
exam = require models + 'exam'

router.get '/', (req, res) ->
  res.render 'site/subj'

router.get '/:subject', (req, res) ->
  {subject} = req.params
  res.render 'site/subject',
    {subject}

router.get '/:subject/:exam', (req, res) ->
  {subject, exam} = req.params
  db.exam.get subject, exam
    .then (data) ->
      res.send data
      #res.render 'site/exam', {subject, exam}
    .then null, (err) ->
      throw err if err

module.exports = router
