require("dotenv").config();
const express = require("express");
const app = express();
const fs = require('fs');
// Configure HTTPS options
const server_options = {
    key: fs.readFileSync('cert/key.pem'),
    cert: fs.readFileSync('cert/crt.pem')
};
const server = require("https").createServer(server_options, app);
// const server = require("http").createServer(app);
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // Disable web cert verification
const connectionString = process.env.SE_LOCAL_DB_STRING
const env = "primary";
const port =
  env === "primary" ? process.env.PRIMARY_PORT : process.env.SECONDARY_PORT;

const postgres = require('postgres')
const ExpressMiddleware = require('./middleware/ExpressMiddleware.js');

// ROUTES
ExpressMiddleware(app,server);

let apiroutes = require('./routes/api.js');
let webroutes = require('./routes/web.js');
app.use('/', apiroutes);
app.use('/', webroutes);

app.get('/json_test', (req, res) => {
  const response = {
    message: "Hello, this is a JSON response!",
    status: "success"
  };
  
  res.json(response);
});


server.listen(8082, '0.0.0.0', () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});