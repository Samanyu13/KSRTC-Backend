const fs = require('fs');
const {google} = require('googleapis');

var EmailConfirmation = {};

function getOAuth2Client(info, cb) {
    // Load client secrets
    fs.readFile(__dirname+'/credentials.json', function(err, data) {
      if (err) {
        return cb(err);
      }
      var credentials = JSON.parse(data);
      var clientSecret = credentials.installed.client_secret;
      var clientId = credentials.installed.client_id;
      var redirectUrl = credentials.installed.redirect_uris[0];
 
      var oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUrl);

      // Load credentials
      fs.readFile(__dirname+'/token.json', function(err, token) {
        if (err) {
          return cb(err);
        } else {
          oauth2Client.credentials = JSON.parse(token);
          return cb(null, info, oauth2Client);
        }
      });
    });
  }


  function sendSampleMail(info, auth, cb) {
    var gmailClass = google.gmail('v1');

    var email_lines = [];

    email_lines.push('From: "KSRTC" <mybusksrtc2019@gmail.com>');
    email_lines.push('To: '+info.email);
    email_lines.push('Content-type: text/html;charset=iso-8859-1');
    email_lines.push('MIME-Version: 1.0');
    email_lines.push('Subject: KSRTC App - Confirmation');
    email_lines.push('');
    email_lines.push('Dear '+info.username+',<br/><br/>');
    email_lines.push('Your password for KSRTC app is <b>'+info.password+'</b>. Login with this password the next time. Cheers..!');

    var email = email_lines.join('\r\n').trim();

    var base64EncodedEmail = new Buffer(email).toString('base64');
    base64EncodedEmail = base64EncodedEmail.replace(/\+/g, '-').replace(/\//g, '_');

    gmailClass.users.messages.send({
      auth: auth,
      userId: 'me',
      resource: {
        raw: base64EncodedEmail
      }
    }, cb);
  }


EmailConfirmation.Send = async function(info){
  await getOAuth2Client(info, function(err, info, oauth2Client) {
    if (err) {
      console.log('err:', err);
    } else {
      sendSampleMail(info, oauth2Client, function(err, results) {
        if (err) {
          console.log('err:', err);
        } else {
          console.log(results.status);  
          return 200;        
        }
      });
    }
  });
}
module.exports = EmailConfirmation;

