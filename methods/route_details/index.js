const models = require("../../models");
const Promise = require("bluebird");
const csv = require('csv-parser');
const fs = require('fs');
const Op = require('sequelize').Op
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
                var busstop_start_end = [];
                for(let i=0; i<m2.length; i++) {
                    let index = m1_routeid.indexOf(m2[i].route_id);
                    if(index > -1 && index < m2[i].id) {
                        route_ids.push(m2[i].route_id);
                        var s_e = {};
                        s_e.start = m1[i].id;
                        s_e.end = m2[i].id;
                        busstop_start_end.push(s_e);
                    }
                }

                resolve({
                    'success': true,
                    'data': route_ids,
                    'id_range': busstop_start_end
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

RouteDetails.returnInfoOfRouteIDs = function(info) {
    return new Promise(function(resolve, reject) {

        var load = {};
        var distance = 0;
        var busstops = [];
        models.route_master.findOne({
            where: {
                route_id: info.route_id
            }
        })
        .then(model_route => {
            let ids = []
            for(let i=info.range.start; i<=info.range.end; i++) {
                ids.push(i);
            }
                models.route_details.findAll({
                    where: {
                        id: {
                            [Op.or]: ids
                        },
                        route_id: info.route_id
                    },
                    attributes: ['busstop_id', 'distance']
                })
                .then(model_details => {
                    let busstop_ids = [];
                    for(let i = 0;i<model_details.length;i++){
                        distance += model_details[i].distance;
                        busstop_ids.push(model_details[i].busstop_id)
                    
                    }
                    models.busstop_master.findAll({
                        where: {
                            busstop_id: busstop_ids
                        },
                        attributes: ['busstop']
                    })
                    .then(model_bus => {
                        for(let i = 0;i<model_bus.length;i++)
                            busstops.push(model_bus[i].busstop);
                        load.route_name = model_route.route_name;
                        load.route_id = model_route.route_id;
                        load.distance = distance;
                        load.busstops = busstops;
                        resolve({
                            'success': true,
                            'data': load
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