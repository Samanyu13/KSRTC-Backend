const express = require("express");
const router = express.Router();
const methods = require("../../methods");
const auth = require('../../middlewares/auth');

router.post("/addroute", auth.jwtVerifyToken, function(req, res) {

  let tosend = {};
  tosend.bus_no = req.body.bus_no;
  tosend.reg_no = req.body.reg_no;
  tosend.bus_make = req.body.bus_make;
  tosend.employee_code = req.body.employee_code;
  tosend.route_no = req.body.route_no;
  methods.BusRouteInfo.addRoute(tosend)
    .then(function(result) {
        return res.json({
        success: true,
        status: result
        })
      })
    .catch(function(err) {
      return res.json({
        success: false,
        status: err
      });
    });
});

module.exports = router;