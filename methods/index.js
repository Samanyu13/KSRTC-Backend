const methods = {};

methods.Authentication = require('./authentication');
methods.BusLiveInfo = require('./livebus');
methods.BusLogInfo = require('./buslog');
methods.EmailConfirmation = require('./gmail/sendmail');

module.exports = methods;