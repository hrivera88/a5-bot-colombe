const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");

const app = express();

app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const SCOPES = [
  "https://mail.google.com/",
  "https://www.googleapis.com/auth/gmail.modify",
  "https://www.googleapis.com/auth/gmail.compose",
  "https://www.googleapis.com/auth/gmail.send"
];
const TOKEN_PATH = "token.json";

// Serve only the static form the dist directory
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/dist/colombe-bot"));

app.get("/*", function(req, res) {
  res.sendFile(__dirname + "/dist/colombe-bot/index.html");
});
app.post("/sendmail", (req, res) => {
  console.log("api call: ", req.body);
  fs.readFile(__dirname + "/env/gmail-cred.json", (err, content) => {
    if (err) {
      return console.log("Error loading client secret file:", err);
    } else {
      let msg = req.body;
      authorize(JSON.parse(content), sendEmail, msg);
      res.end();
    }
  });
});

function authorize(credentials, callback, msg) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) {
      return getNewToken(oAuth2Client, callback);
    }
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client, msg);
  });
}

function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question("Enter the code from that page here: ", code => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) {
        return callback(err);
      }
      oAuth2Client.setCredentials(token);
      //Store the token to disc for later programm executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), err => {
        if (err) {
          return console.log(err);
        }
        console.log("Token stored to", TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

function sendEmail(auth, msg) {
  console.log("sendEmail: ", msg);
  const gmail = google.gmail({ version: "v1", auth });
  let email_lines = [];

  email_lines.push(`From: "Johnny Bot" <bot@alive5.com>`);
  email_lines.push(`To: bot@alive5.com`);
  email_lines.push(`Content-type: text/html;charset=iso-8859-1`);
  email_lines.push(`MIME-Version: 1.0`);
  email_lines.push(`Subject: Comcast Business Lead`);
  email_lines.push(``);
  email_lines.push(
    `<p><strong>Services New Customer is Interested in:</strong> ${
      msg.servicesChosen
    }</p>`
  );
  email_lines.push(`<p><strong>New Customers Email:</strong> ${msg.email}</p>`);
  email_lines.push(
    `<p><strong>New Customers Service Details:</strong> ${
      msg.serviceDetails
    }</p>`
  );

  let email = email_lines.join("\r\n").trim();

  var base64EncodedEmail = new Buffer(email).toString("base64");
  base64EncodedEmail = base64EncodedEmail
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  gmail.users.messages.send(
    {
      userId: "me",
      resource: {
        raw: base64EncodedEmail
      }
    },
    (err, results) => {
      if (err) {
        console.log("err ", err);
      } else {
        console.log(results);
      }
    }
  );
}

//Start the app by listening on the default Heroku Port
app.listen(8081);
