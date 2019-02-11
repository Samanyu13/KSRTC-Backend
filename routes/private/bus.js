const express = require("express");
const router = express.Router();
const methods = require("../../methods");
const auth = require('../../middlewares/auth');
//private/bus/start
router.post("/start", auth.jwtVerifyToken, function(req, res) {

  let tosend = {};
  tosend.bus_no = req.body.bus_no;
  tosend.reg_no = req.body.reg_no;
  tosend.bus_make = req.body.bus_make;
  tosend.employee_code = req.body.employee_code;
  tosend.route_no = req.body.route_no;
  methods.BusLiveInfo.addRoute(tosend)
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
//private/bus/trip
router.post('/end' , auth.jwtVerifyToken , function(req,res) {
  let info = {}
  info.bus_no = req.body.bus_no;
  methods.BusLiveInfo.getLiveBus(info)
  .then((result)=>{
    if(result===null){
     return res.json({
        success: true,
        status:"noEntry"
      })
    }
    methods.BusLiveInfo.deleteRoute(result)
    .then((deletedBus)=>{
      methods.BusLogInfo.addRoute(result)
      .then((data)=>{
        res.json({
          status:data
        })
      })
      .catch((err=>{
        res.json({
          success: false,
          status:err
        })
      }))
    })
    .catch((err)=>{
      res.json({
        success: false,
        status:err
      })
    })
  })
  .catch((err)=>{
    res.json({
      success: false,
      status:err,
    })
  })
})

module.exports = router;