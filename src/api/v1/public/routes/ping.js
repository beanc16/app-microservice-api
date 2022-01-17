/************
 * REQUIRES *
 ************/

// Routing
const express = require("express");
const app = express();


// Custom variables
const { SuccessResponse } = require("../../../../../custom_modules/Responses");





/********
 * GETS *
 ********/

// Ping
app.get("/ping", function(req, res)
{
    const response = new SuccessResponse({
        message: "Pong",
    });
    res.send(response);
});





/*********
 * POSTS *
 *********/

app.post("/ping", function(req, res)
{
    const response = new SuccessResponse({
        message: "Pong",
    });
    res.send(response);
});





/*******
 * PUT *
 *******/

app.put("/ping", function(req, res)
{
    const response = new SuccessResponse({
        message: "Pong",
    });
    res.send(response);
});





/***********
 * PATCHES *
 ***********/

app.patch("/ping", function(req, res)
{
    const response = new SuccessResponse({
        message: "Pong",
    });
    res.send(response);
});





/***********
 * DELETES *
 ***********/

app.delete("/ping", function(req, res)
{
    const response = new SuccessResponse({
        message: "Pong",
    });
    res.send(response);
});





module.exports = app;
