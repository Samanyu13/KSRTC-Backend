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