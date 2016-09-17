function get(req, res) {
  const {id} = req.params;
  res.json({id});
  /*
  task.get(task)
    .then(obj => res.json(obj))
    .catch(err => res.json(obj));
  */
}

module.exports = get;
