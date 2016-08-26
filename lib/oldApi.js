const fetch = require('node-fetch');

function oldApi(subject, cb) {
  const url = 'http://nauchcrug.shn-host.ru/convert.php?sub='; // Old JSON API url
  return fetch(url + subject)
    .then(data => data.text())
    .then(data => {
      const str = data.trim();
      const obj = JSON.parse(str);
      cb(obj, 200)
    })
    .catch(err => console.log(err));//cb({err}, err));
}

module.exports = oldApi;
