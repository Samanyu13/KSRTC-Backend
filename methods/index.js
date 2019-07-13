const methods = {};

methods.Authentication = require('./authentication');
methods.BusLiveInfo = require('./livebus');
methods.BusLogInfo = require('./buslog');
methods.EmailConfirmation = require('./gmail/sendmail');
methods.DBEntry = require('./route_db_entry');
methods.BusStop = require('./busstop');
methods.RouteDetails = require('./route_details');

module.exports = methods;