/************
 * REQUIRES *
 ************/

// Routing
const express = require("express");
const app = express();


// Custom variables
const { InvalidUrlErrorResponse } = require("../../custom_modules/Responses");





/********
 * GETS *
 ********/

app.get("/*", function(req, res)
{
    const errResponse = new InvalidUrlErrorResponse({ res });
    res.send(errResponse);
});





/*********
 * POSTS *
 *********/

app.post("/*", function(req, res)
{
    const errResponse = new InvalidUrlErrorResponse({ res });
    res.send(errResponse);
});





/*******
 * PUT *
 *******/

app.put("/*", function(req, res)
{
    const err = new InvalidUrlErrorResponse({ res });
    res.send(err);
});





/***********
 * PATCHES *
 ***********/

app.patch("/*", function(req, res)
{
    const err = new InvalidUrlErrorResponse({ res });
    res.send(err);
});





/***********
 * DELETES *
 ***********/

app.delete("/*", function(req, res)
{
    const err = new InvalidUrlErrorResponse({ res });
    res.send(err);
});





module.exports = app;
