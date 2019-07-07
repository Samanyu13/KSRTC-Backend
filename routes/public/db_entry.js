const express = require("express");
const router = express.Router();
const methods = require("../../methods");

//public/db_entry/busStopMaster
router.post('/busStopMaster', function(req, res) {
    methods.RouteDBEntry.addBusMaster()
    .then(model => {
        return res.json({
            'success': true
        });
    })
    .catch(err => {
        return res.json({
            'success': false,
            'err': err
        });
    });
});

//public/db_entry/routeMaster
router.post('/routeMaster', function(req, res) {
    methods.RouteDBEntry.addRouteMaster()
    .then(model => {
        return res.json({
            'success': true
        });
    })
    .catch(err => {
        return res.json({
            'success': false,
            'err': err
        });
    });
});

//public/db_entry/routeDetails
router.post('/routeDetails', function(req, res) {
    methods.RouteDBEntry.addRouteDetails()
    .then(model => {
        return res.json({
            'success': true
        });
    })
    .catch(err => {
        return res.json({
            'success': false,
            'err': err
        });
    });
});

module.exports = router;