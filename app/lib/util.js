const {NODE_ENV = '', npm_lifecycle_event = ''} = process.env;

const production = (process.env.NODE_ENV === 'production');
const test = xor(
  /test/.test(npm_lifecycle_event),
  (NODE_ENV === 'test')
);

function xor(first, second) {
    return first ? !second : second;
}

module.exports = {
    xor,
    TARGET: {
        production,
        test
    }
};

