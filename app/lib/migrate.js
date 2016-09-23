require('./globalize');
const fs = require('fs');
//const {resolve} = require('path');
const db = require('app/db');

function query(sql) {
    return db.query(sql).then(function(data) {
        console.log('Result: ' + data);
    }).then(null, function(err) {
        if (err) {
            throw err;
        }
    });
}

function raw(file) {
    return fs.access(file, fs.constants.R_OK, function(err) {
        if (err) {
            throw err;
        }
        return fs.readFile(file, {
            encoding: 'utf8'
        }, function(err, data) {
            if (err) {
                throw err;
            }
            console.log('Applying migration...');
            return query(data);
        });
    });
}

function migrate(action, table, fields) {
    var field, i, len, ref, sql;
    if (action == null) {
        action = 'up';
    }
    switch (action) {
    case 'up' || 'create':
        sql = 'create table if not exists ' + table + ' (';
        ref = fields.slice(0);
        for (i = 0, len = ref.length; i < len; i++) {
            field = ref[i];
            sql += `${field},`;
        }
        sql += fields.slice(-1);
        sql += ');';
        return query(sql);
    case 'down' || 'drop':
        sql = 'drop table ' + table;
        return query(sql);
    }
}

function scaffold(name, type = 'json') {
    var data, file, obj, question, save;
    file = '' + migrations + name + '.' + type;
    save = function() {
        return fs.writeFile(file, data, function(err) {
            if (err) {
                throw err;
            }
            return console.log('New migration: ' + name + '.' + type);
        });
    };
    obj = {
        table: name,
        fields: ['id int(11) not null default primary key', 'name varchar(11) not null']
    };
    data = (eval(type.toUpperCase())).stringify(obj, null, '  ');
    question = 'Migration ' + name + ' exists, overwrite? [y/n]: ';
    return fs.access(file, fs.F_OK, function(err) {
        var readline, rl;
        if (err) {
            return save();
        } else {
            readline = require('readline');
            rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            return rl.question(question, function(ans) {
                var test;
                test = /^(y|Y)(es|ES)?$/.test(ans.trim());
                if (test) {
                    save();
                } else {
                    console.log('Okay! :-)');
                    process.exit(0);
                }
                return rl.close();
            });
        }
    });
}

let ext = '.sql';
let migration = migrations + process.argv[2];
let file = migration + ext;

if (/^(create|generate|scaffold)$/.test(process.argv[2])) {
    scaffold(process.argv[3], process.argv[4]);
} else {
    fs.access(file, fs.F_OK, function(err) {
        var action, fields, ref, table;
        if (!err) {
            return raw(file);
        } else {
            ref = require(migration), action = ref.action, table = ref.table, fields = ref.fields;
            action || (action = process.argv[3]);
            if (table == null) {
                err = new Error('Undefined .table');
            } else if (fields == null) {
                err = new Error('Undefined .fields');
            } else if (fields == null) {
                err = new Error('Undefined action, must be up or down');
            }
            if (err != null) {
                return console.error(err);
            } else {
                return migrate(action, table, fields);
            }
        }
    });
}
