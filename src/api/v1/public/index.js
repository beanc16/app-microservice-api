/************
 * REQUIRES *
 ************/

// Routing
const express = require("express");
const app = express();





/*******************
 * EXTERNAL ROUTES *
 *******************/

// Ping
const pingEndpoints = require("./routes/ping");
app.use(`/ping`, pingEndpoints);

// Apps
const appEndpoints = require("./routes/apps");
app.use(`/apps`, appEndpoints);





module.exports = app;
