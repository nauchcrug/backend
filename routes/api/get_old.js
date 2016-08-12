const {Router} = require('express');
const router = new Router;
const fetch = require('isomorphic-fetch');

router.get('/:exam', (req, res) => {
  const {exam} = req.params;
  const subject = `ex_${exam}`;
  res.set('Content-Type', 'application/json');
  res.set('Accept', 'application/json');
  options = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };
  fetch(`http://nauchcrug.shn-host.ru/convert.php?sub=${subject}`, options)
    .then(data => data.text())
    .then(json => res.send(json))
    .catch(err => console.error(err));
});

module.exports = router;