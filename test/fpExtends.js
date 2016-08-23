'use strict'

function getInstance(klass) {
  return this instanceof klass ? this : new klass;
}

function Klass() {
  Number.apply(this);
  var number = new Number(0);
  this.number = number;
  this.toString = function KlassToString() {
    var number = ++this.number;
    return '' + Number(number)
  }
  return getInstance.apply(this, [Klass]);
}

var klass = new Klass();
for (var i = 0; i < 3; i++) {
  var string = `Iteration: ${i+1} | Instance: ${klass}`;
  console.log(Array(string.length + 2).join('-'));
  console.log(string)
}

module.exports = Klass;
