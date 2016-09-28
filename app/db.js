const config = require('app/config');
const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
connect()

if (__DEV__ && !__TEST__) {
    mongoose.set('debug', true);
}

module.exports = mongoose;

function connect() {
    return mongoose.connect(
        process.env.MONGODB_URI || config['mongodb_uri']
    );
}
