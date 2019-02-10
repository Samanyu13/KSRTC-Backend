const jwt = require("jsonwebtoken");
const models = require("../../models");
const Promise = require("bluebird");
const { sequelize } = require("../../models");
const key = require("../../config/api.json").API_SECRET;
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