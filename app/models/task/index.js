const validate = require('app/lib/validate');
const Model = require('app/models/base');
module.exports = new Task;

module.exports = class Task extends Model {
    static tableName = 'task'

    constructor(data) {
        super(data);
    }
}

/*
exports.add = (task) => {
    sql = '';
    return validate(task); // Promise
  // TODO: db.query
};

exports.approve = (id, approved) => {
    sql = 'update approved from tasks where id=$1';
    const bit = approved ? 1 : 0;
    return db.query(sql, [id, bit]);
};

module.exports = class Task extends Model {
    constructor(data) {
        super(data);
    }

    create(data) {
        this.validate;
    }

    approve(id, approved) {
        return this.db.query(sql, {id, bit});
    }
};

Task.tableName = 'task';
*/
