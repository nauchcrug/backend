const db = require('app/db');

module.exports = class Model {
    constructor(data) {
        this.db = db;
    }
};
