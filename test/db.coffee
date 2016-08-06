{describe, it} = require 'mocha'
{assert} = require 'chai'
globalize = require '../globalize'
db = require '../db'


describe 'DI of models', ->
  models = ['user', 'exam']
  models.forEach (model) ->
    it "type of model #{model} should be object", ->
      expected = typeof db[model]
      assert.equal expected, 'object'
