{Router} = require 'express'
router = new Router
sql = "select * from exams where id=$1, name=$2"

router.get '/:name/:id', (req, res) ->
  {name, id} = req.params
  result = db.any sql, [id, name]
  result.then (data) ->
    console.log data
    res.send data
  result.then null, (err) ->
    throw err if err

module.exports = router
