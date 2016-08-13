const {Router} = require('express');
const router = new Router;
/*
task = require(models + 'task');
*/

router.get('/:task', (req, res) => {
  const {task} = req.params;
  res.json({task});
  /*
  task.get(task)
    .then(obj => res.json(obj))
    .catch(err => console.error(err.message));
  */
});

router.post('/', (req, res) => {
  const obj = {
    status: true,
    msg: 'Task approved'
  };
  if (!req.body) {
    obj.status = false;
    obj.msg = 'Task undefined';
  }
  console.log(req.body);
  res.json(obj);
});

module.exports = router;
