const {isString, isNaN} = require('lodash');

function validate(task) {
  console.log(task, typeof task)
  const test = {
    task: (data) => !isNaN(data),
    answer: (data) => isString(data),
    text: (data) => isString(data)
  };
  return new Promise((resolve, reject) => {
    console.log('isNaN: ' + isNaN(task.task));
    Object.keys(task).forEach(i => {
      const result = test[i](task[i]);
      console.log(`Field ${i}: ${task[i]}`)
      if (!result) {
        const msg = `Field ${task[i]} invalid`;
        console.log(msg);
        reject(msg);
      }
    });
    resolve(task);
  });
}

module.exports = validate;
