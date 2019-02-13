const express = require("express");
const router = express.Router();
const methods = require("../../methods");

router.post("/register", function(req, res) {

  var password = Math.random().toString(36).substr(2, 8);  
  console.log(password);
  let tosend = {};
  let tomail = {};
  tosend.username = req.body.username;
  tosend.employee_code = req.body.employee_code;
  tosend.email = req.body.email;
  tosend.mobile_no = req.body.mobile_no;
  tosend.address = req.body.address;
  tosend.city = req.body.city;
  tosend.state = req.body.state;
  tosend.pin = req.body.pin;
  tosend.password = password;

  tomail.username = req.body.username;
  tomail.email = req.body.email;
  tomail.password = password;

  methods.Authentication.addEmployee(tosend)
    .then(function(result) {
      console.log("registration started result:"+result);
      if (result.success === true) {
        methods.EmailConfirmation.Send(tomail)
          .then((val) => {
            console.log(val);
            res.json({
              success: true,
              status: val
            })  
          })
          .catch((err) => {
            res.json({
              success: false,
              status: err
            })
          });         
      }
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
    info.password = req.body.password;
  methods.Authentication
    .authenticateEmployee(info)
    .then(function(result) {
      console.log(result.success);
      if (result.success === true) {
        console.log("received token ");
        return res.json({
          "success": true,
          jwt:result.token
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