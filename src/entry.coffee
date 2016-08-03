{PORT, SCALE} = process.env

PORT or= 3000

app = require './app.coffee'
app.listen PORT, -> console.log "Express listening on port #{PORT}"
