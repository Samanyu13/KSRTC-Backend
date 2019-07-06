const methods = {};

methods.Authentication = require('./authentication');
methods.BusLiveInfo = require('./livebus');
methods.BusLogInfo = require('./buslog');
methods.EmailConfirmation = require('./gmail/sendmail');
methods.AllRoutes = require('./all_routes');

module.exports = methods;