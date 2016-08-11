exports.stringify = (obj) ->
  {table, fields} = obj
  data = "create table if not exists #{table} (\n"
  data += " #{field},\n" for field in fields[..-1]
  data += " #{fields[-1..]}\n" #cut off last field's comma
  data += ")"
exports.parse = (data) ->
