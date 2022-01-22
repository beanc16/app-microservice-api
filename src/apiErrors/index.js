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
    res.json(errResponse);
});





/*********
 * POSTS *
 *********/

app.post("/*", function(req, res)
{
    const errResponse = new InvalidUrlErrorResponse({ res });
    res.json(errResponse);
});





/*******
 * PUT *
 *******/

app.put("/*", function(req, res)
{
    const errResponse = new InvalidUrlErrorResponse({ res });
    res.json(errResponse);
});





/***********
 * PATCHES *
 ***********/

app.patch("/*", function(req, res)
{
    const errResponse = new InvalidUrlErrorResponse({ res });
    res.json(errResponse);
});





/***********
 * DELETES *
 ***********/

app.delete("/*", function(req, res)
{
    const errResponse = new InvalidUrlErrorResponse({ res });
    res.json(errResponse);
});





module.exports = app;
