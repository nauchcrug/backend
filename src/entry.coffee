{PORT, SCALE} = process.env

app = require './app.coffee'
app.listen PORT, -> console.log "Express listening on port #{PORT}"
