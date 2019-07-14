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
        let id_range = model.id_range;
        let route_checker = {};


        methods.BusLiveInfo.returnAllRouteIDs(route_ids)
        .then(live => {

          let live_data = live.data;
          var final_routes = [];
          var final_range = [];


          for(let i=0; i<live_data.length; i++) {
            route_checker[live_data[i].route_no] = true;
          }


          for(let i=0; i<route_ids.length; i++) {
            if(route_checker[route_ids[i]] == true) {
              final_routes.push(route_ids[i]);
              final_range.push(id_range[i]);
            }
          }
          
          // console.log(JSON.stringify(final_routes)+"qwertyuytrewadfgh");


          var final_details = [];
          //fetching details of all the filtered routes
          for(let i=0; i<final_routes.length; i++) {
            var datum = {};
            datum.route_id = final_routes[i];
            datum.range = final_range[i];
            methods.RouteDetails.returnInfoOfRouteIDs(datum)
            .then(final_model => {
              final_details.push(final_model);
            })
            .catch(err => {
              return res.json({
                'success': false,
                'err': "method returnInfoOfRouteIDs"
              });
            });
          }

          return res.json({
            'success': true,
            'data': final_details
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
      'err': "method getStopIDByName-from"
    });
  });
});

module.exports = router;
