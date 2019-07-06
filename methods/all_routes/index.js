const models = require("../../models");
const Promise = require("bluebird");
const { sequelize } = require("../../models");
const csvFilePath = __dirname+'/all_routes.csv';
// const csv = require("csvtojson");

const csv = require('csv-parser');
const fs = require('fs');

var AllRoutes = {};

// AllRoutes.addAllRoutes = function(info) {
//     return new Promise(function(resolve, reject) {
//         csv().fromFile(csvFilePath)
//         .then((obj) => {
//             for(let i = 0; i < obj.length; i++) {
//                 models.all_routes
//                 .create(obj[i])
//                 .then(model => {
//                     ;
//                 })
//                 .catch(err => {
//                     reject({
//                         'success': false,
//                         'err': "Error in adding data to database"
//                     });                        
//                 });

//             }
//             resolve({
//                 'success': true
//             });
//         })
//         .catch(err => {
//             reject({
//                 'path':csvFilePath,
//                 'success': false,
//                 'err': err
//             });
//         });
//     });
// };

AllRoutes.addAllRoutes = function(info) {
    return new Promise(function(resolve, reject) {

        const obj = [];

        fs.createReadStream(__dirname+'/all_routes.csv')
        .pipe(csv())
        .on('data', (data) => obj.push(data))
        .on('end', () => {
            
            for(let i = 0; i < obj.length; i++) {
                models.all_routes
                .create(obj[i])
                .then(model => {
                    ;
                })
                .catch(err => {
                    reject({
                        'success': false,
                        'err': "Error in adding data to database"
                    });                        
                });

            }

             resolve({
                 'success': true
             })
        });
    });
};


module.exports = AllRoutes;