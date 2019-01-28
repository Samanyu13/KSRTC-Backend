function registerEmployee(){
    var name = document.getElementById('name').value;
    var ecode = document.getElementById('ecode').value;
    var email = document.getElementById('email').value;
    var mno = document.getElementById('mno').value;
    var address = document.getElementById('address').value;
    var city = document.getElementById('city').value;
    var state = document.getElementById('state').value;
    var pin = document.getElementById('pin').value;

    var tosend = {};
    tosend.username = name;
    tosend.employee_code = ecode;
    tosend.email = email;
    tosend.mobile_no = mno;
    tosend.address = address;
    tosend.city = city;
    tosend.state = state;
    tosend.pin = pin;
    axios.post('http://localhost:3000/register',{data:tosend})
    .then(function(result){
        window.location.href = "index.html"
    })
    .catch(function(err){
        console.log(err)
    });
}

function EmployeeLogin(){
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var tosend = {};
    tosend.username = username;
    tosend.password = password;
    axios.post('http://localhost:3000/login',{data:tosend})
    .then(function(result){
        window.location.href = "../index.html"
    })
    .catch(function(err){
        console.log(err)
    });
}

function loginConfirm(label) {
    var display;
    if(label=="u") {
        display = "Invalid Username..! Press OK to try again..!";
    }
    else if(label=="p") {
        display = "Invalid Password..! Press OK to try again..!";
    }
    else if(label=="t") {
        display = "You've successfully logged in..! :)";
    }

    var val = confirm(display);
    if(label=="t") {
        if(val!=null) {
            //load admin dashboard
            console.log("Load admin dashboard..!");
        } 
    }
    else {
        if(val==true) {
            //goto the same page
            console.log("Get the same page..!");
        }
        else {
            //goto the main page
            console.log("Get the main page..!");
        }
    }
}