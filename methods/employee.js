const Promise = require('bluebird');
const models = require('../models');
const bcrypt = require('bcrypt');

const Employee = {};

Employee.checkForEmployee = (info) => {
    console.log("asdfgh")
    return new Promise((resolve,reject) => {
        models.employee_credentials.findOne( {
            where  :    {
                employee_code: info.username
            }
        })
        .then((theuser) => {
            if(!theuser)
            {
                console.log('Invalid Username..!');
                // loginConfirm("u");
            }
            else
            {               
                if(bcrypt.compareSync(info.password, theuser.password)) {
                    console.log('Successful');  
                    // loginConfirm("t");
                    resolve(theuser);                
                } 
                else {
                    console.log('Invalid Password..!');
                    // loginConfirm("p");

                }
            }
        })
        .catch((err) => {
            console.log("hellooo")
            reject(err);
        });
    })
}

Employee.addEmployee = (final) => {
    return new Promise((resolve, reject) => {
        models.employees.create(final.public)
        .then((exob) => {
            console.log(exob);
            // resolve(exob);
            models.employee_credentials.create(final.private)
            .then((mod) => {
                console.log(mod);
                resolve(mod);
            })
            .catch((err) => {
                reject(err);
            })
        })
        .catch((err) => {
            console.log(err);
            reject(err);
        });
    });
};

module.exports = Employee;