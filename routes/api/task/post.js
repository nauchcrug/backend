const Task = require('models/task');
const Image = require('models/image');

function post(req, res) {
  const {body, file} = req;
  console.log(' body = ', body, '\r\n', 'file = ', file);
  /*Image.add(file)
    .then(*/
  /*Task.add(body)
>>>>>>> db06bb1a31dda74104ee09487c77ed2d9e15489b
    .then(data => res.json({
      data,
      message: 'Task approved'
    }))
<<<<<<< HEAD
    .catch(err => res.status(500).json({message: err.message}));
    .catch(err => {throw err});*/
  throw new Error('Not implemented');
}

module.exports = post;
