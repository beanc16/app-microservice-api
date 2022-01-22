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

app.get("/", function(req, res)
{
    const response = new SuccessResponse({
        message: "Pong",
    });
    res.json(response);
});





/*********
 * POSTS *
 *********/

app.post("/", function(req, res)
{
    const response = new SuccessResponse({
        message: "Pong",
    });
    res.json(response);
});





/*******
 * PUT *
 *******/

app.put("/", function(req, res)
{
    const response = new SuccessResponse({
        message: "Pong",
    });
    res.json(response);
});





/***********
 * PATCHES *
 ***********/

app.patch("/", function(req, res)
{
    const response = new SuccessResponse({
        message: "Pong",
    });
    res.json(response);
});





/***********
 * DELETES *
 ***********/

app.delete("/", function(req, res)
{
    const response = new SuccessResponse({
        message: "Pong",
    });
    res.json(response);
});





module.exports = app;
