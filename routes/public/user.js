const express = require("express");
const router = express.Router();
const methods = require("../../methods");

// public/user/returnBusDetails
router.post('/returnBusDetails', function(req, res) {
  const from = req.body.from;
  const to = req.body.to;

  //get from and to busstop ids
  methods.BusStop.getStopIDByName(from)
  .then(model_from => {
    methods.BusStop.getStopIDByName(to)
    .then(model_to => {

      let info = {};
      info.from = model_from.data;
      info.to = model_to.data;

      //get the routes corresponding to from and to
      methods.RouteDetails.returnAllTheRoutes(info)
      .then(model => {

        let route_ids = model.data;
        let route_checker = {};


        methods.BusLiveInfo.returnAllRouteIDs(route_ids)
        .then(live => {

          let live_data = live.data;
          var final_routes = [];

          //filtering out routes from live_buses and routes
          for(let i=0; i<route_ids.length; i++) {
            route_checker[route_ids[i]] = true;
          }

          for(let i=0; i<live_data.length; i++) {
            if(route_checker[live_data[i].route_no] == true) {
              final_routes.push(live_data[i].route_no);
            }
          }

          return res.json({
            'success': true,
            'data': final_routes
          });
        })
        .catch(err => {
          return res.json({
            'success': false,
            'err': "method returnAllRouteIDs"
          });
        });
      })
      .catch(err => {
        return res.json({
          'success': false,
          'err': "method returnAllTheRoutes"
        });
      });
    })
    .catch(err => {
      return res.json({
        'success': false,
        'err': "method getStopIDByName-to"
      });
    });
  })
  .catch(err => {
    return res.json({
      'success': false,
      'err': "method getStopIDByName-from"+ err
    });
  });
});

module.exports = router;
