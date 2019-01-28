const Promise = require('bluebird');
const models = require('../models');
const bcrypt = require('bcrypt');

const Employee = {};

Employee.addEmployee = (final) => {
    return new Promise((resolve, reject) => {
        models.sequelize.query(`insert into employee(username,employee_code,email,mobile_no,address,city,state,pin,createdAt,updatedAt) values (${JSON.stringify(final.username)}, ${JSON.stringify(final.employee_code)}, ${JSON.stringify(final.email)},${JSON.stringify(final.mobile_no)}, ${JSON.stringify(final.address)}, ${JSON.stringify(final.city)},${JSON.stringify(final.state)}, ${final.pin}, NOW(), NOW() )`)
        .spread((exob) => {
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

Employee.checkForEmployee = (info) => {
    return new Promise((resolve,reject) => {
        models.emp.findOne( {
            where  :    {
                username: info.username
            }
        })
        .then((theuser) => {
            if(!theuser)
            {
                console.log('Invalid Username..!');
                loginConfirm("u");
            }
            else
            {               
                if(bcrypt.compareSync(info.password, theuser.password)) {
                    console.log('Successful');  
                    loginConfirm("t");
                    resolve(theuser);                
                } 
                else {
                    console.log('Invalid Password..!');
                    loginConfirm("p");

                }
            }
        })
        .catch((err) => {
            console.log(err)
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