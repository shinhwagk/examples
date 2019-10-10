const https = require('https');
const fs = require('fs');

const options = {
  host: 'localhost',
  port: 5678,
  method: 'GET',
  path: '/',
  headers: {},
  agent: false,
  key: fs.readFileSync('client.key'),
  cert: fs.readFileSync('client.pem'),
  ca: fs.readFileSync('ca.pem')
};

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const req = https.request(options, (res) => {
  console.log(res.req.connection.authorizationError);
});

req.on("error", (err) => console.log('error: ' + err));

req.end();