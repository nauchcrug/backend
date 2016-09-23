const Task = require('app/models/task');
const Image = require('app/models/image');

function put(req, res) {
    const {id} = req.params;
    const {body} = req;
    Task.update(id, body)
    .then(result => res.json({result}))
    .catch(err => Promise.reject(err));
}

module.exports = put;
