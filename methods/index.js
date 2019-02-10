const methods = {};

methods.Authentication = require('./authentication');
methods.BusLiveInfo = require('./livebus');
methods.BusLogInfo = require('./buslog');

module.exports = methods;