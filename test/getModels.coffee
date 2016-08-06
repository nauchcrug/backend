fs = require 'fs'
models = '../models/'

for modelName in fs.readdirSync 'models'
  modelName = modelName.replace /\.coffee/, ''
  modelObj = require models + modelName
  for prop, func of modelObj
    console.log "Model: #{modelName}, Prop: #{prop}, Func: #{func}"
