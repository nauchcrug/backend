{join, resolve} = require 'path'
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
  'lib'
].forEach (dir) -> global[dir] = "#{join cwd(), dir}/"
#{db, pgp} = require lib + 'db'
#global.db = db
#global.pgp = pgp
