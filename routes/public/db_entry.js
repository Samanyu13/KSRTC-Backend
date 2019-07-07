const express = require("express");
const router = express.Router();
const methods = require("../../methods");

//public/db_entry/busStopMaster
router.post('/busStopMaster', function(req, res) {
    methods.DBEntry.addBusMaster()
    .then(model => {
        console.log(model);
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
    methods.DBEntry.addRouteMaster()
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
    methods.DBEntry.addRouteDetails()
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