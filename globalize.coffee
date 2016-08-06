{join} = require 'path'
{cwd} = process
{NODE_ENV} = process.env
global.production = NODE_ENV is 'production'

if not production
  dotenv = require 'dotenv'
  dotenv.config()

[
  'middlewares'
  'routes'
  'models'
].forEach (dir) -> global[dir] = "#{join __dirname, dir}/"

global.db = require './db'
