const models = require("../../models");
const Promise = require("bluebird");
const { sequelize } = require("../../models");
var BusStop = {};

BusStop.getStopIDByName = function(info) {
    return new Promise(function(resolve, reject) {
        models.busstop_master.findOne({
            where: {
                busstop: info
            }
        })
        .then(model => {
            console.log(model);
            resolve({
                'success': true,
                'data': model
            });
        })
        .catch(err => {
            reject({
                'success': false,
                'err': err
            });
        });
    });
};

module.exports = BusStop;