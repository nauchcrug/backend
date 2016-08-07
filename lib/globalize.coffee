{join, resolve} = require 'path'
{cwd} = process
{NODE_ENV} = process.env
global.production = NODE_ENV is 'production'

if not production # Load .env when not in production
  dotenv = require 'dotenv'
  dotenv.config()

[ # Require aliases. Usage: require alias + 'filename'
  'middlewares'
  'migrations'
  'routes'
  'models'
  'lib'
].forEach (dir) -> global[dir] = "#{join cwd(), dir}/"

CSON = require 'cson'
global.CSON = CSON # Add support for cson
require.extensions['.cson'] = (module, filename) ->
  parsed = CSON.parseFile filename
  module.exports = parsed
