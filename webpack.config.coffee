w = require 'webpack'
{resolve, join} = require 'path'
{readdirSync} = require 'fs'

if not global.production?
  global.production = process.env.NODE_ENV is 'production'
  {production} = global

nodeModules = readdirSync 'node_modules'
  .filter (x) -> ['.bin'] not in x

loaders = [{
  test: /\.coffee$/, loaders: ['monkey-hot', 'coffee']
},{
  test: /\.cson$/, loaders: ['monkey-hot', 'cson']
}]
plugins = [
  new w.DefinePlugin
    "production": JSON.stringify production
    "process.env.NODE_ENV": JSON.stringify process.env.NODE_ENV or ""
  new w.BannerPlugin
    banner: '' #'require("source-map-support").install()'
    raw: yes
    entryOnly: no
]

config =
  name: 'backend'
  entry: ['./src/entry']
  output:
    filename: 'bundle.js'
    path: join __dirname, 'dist'
  module: {loaders}
  resolve:
    extensions: ['', '.coffee', '.js', '.json']
    alias:
      routes: resolve './src/routes'
      middlewares: resolve './src/middlewares'
      models: resolve './src/models'
      config: resolve './src/config.cson'
  target: 'node'
  node: fs: 'empty'
  plugins: plugins
  devtool: 'source-map'
  externals: (ctx, req, cb) ->
    start = req.split('/')[0]
    if start in nodeModules and req isnt 'webpack/hot/poll'
      cb null, "commonjs #{req}"
    else cb()

module.exports = (production) ->
  if not production
    config.entry.push 'webpack/hot/poll'
    config.devtool = 'cheap-module-source-map'
    config.plugins.push new w.HotModuleReplacementPlugin quiet: on
  else config.plugins.push  new w.optimize.UglifyJsPlugin
    compress: warnings: off
    sourcemap: on
    sourceMap: on
  config
