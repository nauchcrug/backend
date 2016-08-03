g = require 'gulp'
n = require 'nodemon'
w = require 'webpack'
config = require './webpack.config'
{join} = require 'path'
{cwd} = require 'process'

g.task 'watch', (done) ->
  fired = no
  w config
    .watch {}, (err, stats) ->
      if not fired
        fired = yes
        done()
      n.restart()

g.task 'run', ['watch'], ->
  n
    execMap: js: 'node -r dotenv/config'
    script: join cwd(), 'dist/bundle.js'
    ignore: ['*']
    watch: ['foo/'] #['dist/bundle.js']
    ext: 'noop'
  .on 'restart', -> console.log 'Patched!'

g.task 'build', (done) ->
  w config
    .run (err, stats) ->
      if err then console.error 'Error', err
      else console.log stats.toString()
      if done then done()

g.task 'default', ['build']
