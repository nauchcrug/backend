function get(req, res) {
  const {task} = req.body || req.params;
  res.json({task});
  /*
  task.get(task)
    .then(obj => res.json(obj))
    .catch(err => res.json(obj));
  */
}

module.exports = get;
