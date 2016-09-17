const co = require('co');
const fetch = require('node-fetch');
const url = 'http://nauchcrug.shn-host.ru/convert.php?sub='; // Old JSON API url

/*function oldApi(subject, cb) {
  return fetch(url + subject)
    .then(data => data.text())
    .then(data => {
      const str = data.trim();
      const obj = JSON.parse(str);
      cb(obj, 200)
    })
    .catch(err => console.log(err));//cb({err}, err));
}*/

const oldApi = subj => co(function*() {
  const res = yield fetch(url + subj);
  //if (!res.ok) throw new Error('Fetch error');
  const data = yield res.text();
  const str = data.trim();
  const obj = JSON.parse(str);
  return obj;
});

module.exports = oldApi;
