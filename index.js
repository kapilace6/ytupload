const {google} = require('googleapis');
const secret = require('./client_secret_410390836127-k7fjit4nmdjb2a1b07ai92lkdi0m20lc.apps.googleusercontent.com.json');

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

const oauth2Client = new google.auth.OAuth2(
  secret.web.client_id,
  secret.web.client_secret,
  secret.web.redirect_uris[0]
);

const scopes = [
  'https://www.googleapis.com/auth/youtube.upload',
  'https://www.googleapis.com/auth/youtube'
];

const url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'offline',

  // If you only need one scope you can pass it as a string
  scope: scopes
});

app.get('/', function(req, res) {
  console.log(req.body);

  return res.send({
    "message": "Henlo"
  });
});

app.listen(3000, () => {
  console.log(`listening on port ${3000}`);
})