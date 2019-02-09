const express = require("express");
const router = express.Router();
const methods = require("../../methods");

router.post("/register", function(req, res) {

  var password = Math.random().toString(36).substr(2, 8);  
  console.log(password);
  let tosend = {};
  tosend.username = req.body.data.username;
  tosend.employee_code = req.body.data.employee_code;
  tosend.email = req.body.data.email;
  tosend.mobile_no = req.body.data.mobile_no;
  tosend.address = req.body.data.address;
  tosend.city = req.body.data.city;
  tosend.state = req.body.data.state;
  tosend.pin = req.body.data.pin;
  tosend.password = password;
  methods.Authentication.addEmployee(tosend)
    .then(function(result) {
      console.log("registration started result:"+result);
      if (result.success === true)
        return res.json({
          success: true,
          status: result.status
        });
      else
        return res.json({
          success: false,
          status: result.status
        });
    })
    .catch(function(err) {
      return res.json({
        success: false,
        status: err
      });
    });
});

router.post("/login", function(req, res) {

    let info = {};
    console.log(req.body);
    info.employee_code = req.body.employee_code;
    // var password = Math.random().toString(36).substr(2, 8);
    // console.log(password);
    info.password = req.body.password;
  methods.Authentication
    .authenticateEmployee(info)
    .then(function(result) {
      console.log(result.success);
      if (result.success === true) {
        console.log("received token ");
        return res.json({
          "success": true
        });
      } else {
        return res.json({
          "success": false,
          "err":"authenticateUser method returned false"
        });
      }
    })
    .catch(function(err) {
      return res.json({
        "success": false,
        "error":err
      });
    });
});

module.exports = router;
