function Protos(obj) {
  var proto = obj.__proto__;
  console.log('Proto:', proto + ',', 'Typeof:', typeof proto);
  try {
    if (proto) Protos(proto)
  } catch(e) {
    return proto;
  }
}

a = {};
stack = 102402;
for (let i = 0; i < stack; i++) {
  a = Object.create(a);
}
console.log('-----------\nLast proto:', Protos(a));
