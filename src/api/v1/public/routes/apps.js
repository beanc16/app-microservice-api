/************
 * REQUIRES *
 ************/

// Routing
const express = require("express");
const app = express();

// Controllers
const { AppController } = require("../../../../js/controllers");


// Custom variables
const {
    SuccessResponse,
    BadRequestErrorResponse,
} = require("../../../../../custom_modules/Responses");





/********
 * GETS *
 ********/

/*
app.get("/", function(req, res)
{
    const response = new SuccessResponse({
        message: "Pong",
    });
    res.send(response);
});
*/





/*********
 * POSTS *
 *********/

/*
app.post("/", function(req, res)
{
    const response = new SuccessResponse({
        message: "Pong",
    });
    res.send(response);
});
*/





/*******
 * PUT *
 *******/

/*
app.put("/", function(req, res)
{
    const response = new SuccessResponse({
        message: "Pong",
    });
    res.send(response);
});
*/





/***********
 * PATCHES *
 ***********/

/*
app.patch("/", function(req, res)
{
    const response = new SuccessResponse({
        message: "Pong",
    });
    res.send(response);
});
*/





/***********
 * DELETES *
 ***********/

/*
app.delete("/", function(req, res)
{
    const response = new SuccessResponse({
        message: "Pong",
    });
    res.send(response);
});
*/





module.exports = app;
