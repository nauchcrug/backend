endpoints = [{
  path: '/', fn: require('./site')
},{
  path: '/api', fn: require('./api')
},{
  path: '/admin', fn: require('./admin')
}];

function endpointsFactory() {
  return endpoints.map(obj => [obj.path, obj.fn]);
}

module.exports = endpointsFactory;
