const methods = {};

methods.Authentication = require('./authentication');
methods.BusLiveInfo = require('./livebus');
methods.BusLogInfo = require('./buslog');
methods.EmailConfirmation = require('./gmail/sendmail');
methods.DBEntry = require('./route_db_entry');
methods.BusStop = require('./busstop');

module.exports = methods;