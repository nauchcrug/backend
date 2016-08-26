const production = (process.env.NODE_ENV === 'production');
const test = xor(
  ((process.env.npm_lifecycle_event || '').indexOf('test') > -1),
  (process.env.NODE_ENV === 'test')
);

function range(max) {
  const arr = Object.keys(new Int8Array(max)).map(Number).slice(1);
  return arr;
}

function iterate(count, cb) {
  if (!(count > 1)) count++;
  const res = range(count).forEach(cb);
  return res;
}

function log() {
  const arr = [].slice.call(arguments, 0);
  return (!production && !test)
    ? console.log.apply(console, arr)
    : void 0;
}

function xor(first, second) {
  return first ? !second : second;
}

module.exports = {
  range,
  iterate,
  log,
  xor,
  TARGET: {
    production,
    test
  }
};


