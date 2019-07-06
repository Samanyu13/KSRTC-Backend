const express = require("express");
const router = express.Router();
const methods = require("../../methods");

//public/all_routes/addAllRoutes
router.post('/addAllRoutes', function(req, res) {

    methods.AllRoutes.addAllRoutes()
    .then((model) => {
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

//public/allroutes/getInfoByID
router.get('/getInfoByID', function(req, res) {

});

module.exports = router;