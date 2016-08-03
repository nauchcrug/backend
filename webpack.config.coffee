w = require 'webpack'
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
    "process.env.NODE_ENV": JSON.stringify process.env.NODE_ENV or ""
  new w.BannerPlugin 'require("source-map-support").install()'
  new w.HotModuleReplacementPlugin quiet: on
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

if not production
  config.entry.push 'webpack/hot/poll'
  config.devtool = 'cheap-module-source-map'

module.exports = config

#module.exports = merge config, if production
#  plugins: [
#    new w.optimize.UglifyJsPlugin
#      compress: warnings: off
#       sourceMap: on
#    ]
