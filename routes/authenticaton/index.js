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
      if (result.success === true) {
        methods.EmailConfirmation.Send(tomail)
          .then((val) => {
<<<<<<< HEAD
            console.log("sasibalh"+JSON.stringify(val)) ;
=======
            console.log(JSON.stringify(val)) ;
>>>>>>> dd22f44ec465d84760ca0646356c0d9b8142d941
            return res.json({
              success: true
            })  
          })
          .catch((err) => {
            console.log(err)
            return res.json({
              success: false,
              status: err
            })
          });         
      }
      else {
        console.log(err)

        return res.json({
          success: false,
          status: result.status
        });
      }
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