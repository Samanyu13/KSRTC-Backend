const models = require("../../models");
const Promise = require("bluebird");
const csv = require('csv-parser');
const fs = require('fs');

var RouteDetails = {};

RouteDetails.returnAllTheRoutes = function(info) {
    return new Promise(function(resolve, reject) {
        models.route_details.findAll({
            where: {
                busstop_id: info.from
            },
            attributes: ['route_id', 'id']
        })
        .then(m1 => {
            models.route_details.findAll({
                where: {
                    busstop_id: info.to
                },
                attributes: ['route_id', 'id']
            })
            .then(m2 => {

                var m1_routeid = [];
                for(let i=0; i<m1.length;i++) {
                    m1_routeid.push(m1[i].route_id);
                }
                var route_ids = [];
                for(let i=0; i<m2.length; i++) {
                    let index = m1_routeid.indexOf(m2[i].route_id);
                    if(index > -1 && index < m2[i].id) {
                        route_ids.push(m2[i].route_id);
                    }
                }

                resolve({
                    'success': true,
                    'data': route_ids
                });
            })
            .catch(err => {
                reject({
                    'success': false,
                    'err': err
                });
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

module.exports = RouteDetails;