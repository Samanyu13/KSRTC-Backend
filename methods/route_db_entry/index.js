const models = require("../../models");
const Promise = require("bluebird");
const csv = require('csv-parser');
const fs = require('fs');

//paths to the csv files
const path_busMaster = __dirname + '/sheets/busstop_master.csv';
const path_routeMaster = __dirname + '/sheets/route_master.csv';
const path_routeDetails = __dirname + '/sheets/route_details.csv';

var DBEntry = {};

DBEntry.addBusMaster = function() {
    return new Promise(function(resolve, reject) {
        const obj = [];

        fs.createReadStream(path_busMaster)
        .pipe(csv())
        .on('data', (data) => obj.push(data))
        .on('end', () => {

            for(let i = 0; i < obj.length;i++) {
                models.busstop_master
                .create(obj[i])
                .then(model => {
                    console.log(model+i);
                    ;
                })
                .catch(err => {
                    reject({
                        'success': false,
                        'err': "Error in adding data to database"
                    });
                });
            }

            resolve({
                'success': true
            });
        });
    });
};

DBEntry.addRouteMaster = function() {
    return new Promise(function(resolve, reject) {
        const obj = [];

        fs.createReadStream(path_routeMaster)
        .pipe(csv())
        .on('data', (data) => obj.push(data))
        .on('end', () => {

            for(let i = 0; i < obj.length;i++) {
                models.route_master
                .create(obj[i])
                .then(model => {
                    ;
                })
                .catch(err => {
                    reject({
                        'success': false,
                        'err': "Error in adding data to database"
                    });
                });
            }

            resolve({
                'success': true
            });
        });
    });
};

DBEntry.addRouteDetails = function() {
    return new Promise(function(resolve, reject) {
        const obj = [];

        fs.createReadStream(path_routeDetails)
        .pipe(csv())
        .on('data', (data) => obj.push(data))
        .on('end', () => {

            for(let i = 0; i < obj.length;i++) {
                models.route_details
                .create(obj[i])
                .then(model => {
                    ;
                })
                .catch(err => {
                    reject({
                        'success': false,
                        'err': "Error in adding data to database"
                    });
                });
            }

            resolve({
                'success': true
            });
        });
    });
};

module.exports = DBEntry;