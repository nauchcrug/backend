const Task = require('models/task');

/*const getMsg = (state) => state
  ? {
    msg: 'Task undefined'
  } : {
    msg: 'Task approved'
  }
*/
function post(req, res) {
  console.log(req.xhr);
  const task = req.body || req.params;
  Task.approve(task)
    .then(obj => res.json({
      msg: 'Task approved'
    }))
    .catch(err => {
      console.error(err);
      res.send(err.message);
    });
}

module.exports = post;
