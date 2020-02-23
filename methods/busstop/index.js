const models = require("../../models");
const Promise = require("bluebird");
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
                'data': model.busstop_id
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