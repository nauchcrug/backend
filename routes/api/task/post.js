const Task = require('models/task');

function post(req, res) {
  console.log(req.body);
  const task = req.body || req.params;
  Task.approve(task)
    .then(obj => res.json({
      message: 'Task approved'
    }))
    .catch(err => {
      console.error(err);
      res.json({
        error: true,
        message: err
      });
    });
}

module.exports = post;
