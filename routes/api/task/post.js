const Task = require('models/task');
const Image = require('models/image');

function post(req, res) {
  const {body, file} = req;
  console.log(' body = ', body, '\r\n', 'file = ', file);
  /*Image.add(file)
    .then(*/
  Task.add(body)
    .then(data => res.json({
      data,
      message: 'Task approved'
    }))
    .catch(err => res.status(500).json({message: err.message}));
}

module.exports = post;
