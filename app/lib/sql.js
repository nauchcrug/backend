function hook() {
    global.SQL = SQL;
    return require.extensions['.sql'] = requireFile;
}

function stringify(obj) {
    const {table, fields} = obj;
    let data = `create table if not exists ${table} (\n`;
    for (field in fields.slice(0)) {
        data += ` ${field},\n`;
    }
    data += `  ${fields.slice(-1)}\n`;
    data += ')';
    return data;
}

function parse(data) {
    return data;
}

function requireFile(module, filename) {
    const fs = require('fs');
    const content = fs.readFileSync(filename, 'utf-8');
    try {
        const parsed = parse(content);
        module.exports = parsed;
    } catch (err) {
        err.message = `${filename}: ${err.message}`;
        throw err;
    }
}

const SQL = {
    stringify,
    parse,
    requireFile,
    hook
};
module.exports = SQL;
