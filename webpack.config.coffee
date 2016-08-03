w = require 'webpack'
merge = require 'webpack-merge'
{resolve, join} = require 'path'
{readdirSync} = require 'fs'

production = process.env.NODE_ENV is 'production'

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
    "process.env":
      "NODE_ENV": JSON.stringify process.env.NODE_ENV
  new w.BannerPlugin 'require("source-map-support").install()'
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
  externals: (ctx, req, cb) ->
    start = req.split('/')[0]
    if start in nodeModules and req isnt 'webpack/hot/signal.js'
      cb null, "commonjs #{req}"
    else cb()

if not production
  config.entry.push 'webpack/hot/signal'

module.exports = merge config, if production
  devtool: 'source-map'
  plugins: [
    new w.optimize.UglifyJsPlugin
      compress: warnings: off
      sourceMap: on
  ]
else
  devtool: 'cheap-module-source-map'
  plugins: [
    new w.HotModuleReplacementPlugin quiet: on
  ]
