g = require 'gulp'
n = require 'nodemon'
w = require 'webpack'
fs = require 'fs'
{cwd} = require 'process'
{join} = require 'path'
{spawn} = require 'child_process'
{extend} = require 'lodash'
config = require './webpack.config'
production = yes
options =
  colors: on
  timings: on
  errorDetails: on
  chunks: off
  hash: on

dotenv = require 'dotenv'
dotenv.config() #import .env file
rimraf = require 'rimraf'
rimraf.sync './dist'

g.task 'watch', (done) ->
  fired = no
  w config not production
    .watch {}, (err, stats) ->
      console.log stats.toString extend options,
        hash: off
        timings: off
        version: off
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
  w config production
    .run (err, stats) ->
      if err then console.error 'Error', err
      else
        console.log stats.toString options
        file = join cwd(), './stats.json'
        fs.writeFile file, JSON.stringify stats.toJson 'verbose', (err) ->
          if err then console.error err
          else console.log 'stats.json saved!'
      if done then done()

g.task 'deploy', ->
  remote = 'github'
  branch = 'master' #TOOD: Production branch
  git = spawn 'git', ['push', remote, branch]
  git.stdout.on 'data', (data) -> console.log data
  git.stderr.on 'data', (data) -> console.log data
  git.on 'exit', (code) -> ocnsole.log "Git exited with code #{code}"

g.task 'default', ['build']
