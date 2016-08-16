const Task = require('models/task');
const Image = require('models/image');

function put(req, res) {
  const {id} = req.params;
  const {body} = req;
  Task.update(id, body)
    .then(result => res.json({result}))
    .catch(err => {throw err})
}

module.exports = put;
