{wrap} = require 'co'
fetch = require 'node-fetch'
url = ''

exports = wrap ->
  res = yield fetch url + subj
  data = yield res.text()
  JSON.parse(data.trim())

