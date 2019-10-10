const https = require('https');
const fs = require('fs');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.pem'),
    requestCert: true,
    rejectUnauthorized: false,
    ca: fs.readFileSync('ca.pem')
};

const server = https.createServer(options, function (req, res) {
    if (req.client.authorized) {
        res.writeHead(200, {"Content-Type":"application/json"});
        res.end('{"status":"approved"}');
        console.log("Approved Client ");
    } else {
        console.log("res.connection.authroizationError:  " + res.connection.authorizationError);
        res.writeHead(403, {"Content-Type":"application/json"});
        res.end('{"status":"denied"}');
        console.log("Denied Client " );
    }
});

server.on('error', function(err) {
    console.log("server.error: "  + err);
});

server.on("listening", function () {
    console.log("Server listeining");
});

server.listen(5678);