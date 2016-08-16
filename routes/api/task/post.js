const Task = require('models/task');

function post(req, res) {
  const task = req.body;
  task.send = req.file;
  Task.approve(task)
    .then(data => res.json({
      data,
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
