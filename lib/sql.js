exports.stringify = function(obj) {
  const {table, fields} = obj;
  let data = `create table if not exists ${table} (\n`;
  for (field in fields.slice(0)) {
    data += ` ${field},\n`;
  }
  data += `  ${fields.slice(-1)}\n`;
  data += ')';
  return data;
};

exports.parse = function(data) {
  return data;
};
