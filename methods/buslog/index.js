const models = require("../../models");
const Promise = require("bluebird");
const { sequelize } = require("../../models");
var BusLogInfo = {};


BusLogInfo.addRoute = function(info) {
  return new Promise(function(resolve, reject) {
      return sequelize
        .transaction(function(t) {
          return models.bus_log
            .create(info, { transaction: t })
            .then(function(data) {
              resolve( data );     
            })
            .catch(function(err) {
              console.log(err);
              reject( err );
            });
    });
  });
};

module.exports = BusLogInfo;