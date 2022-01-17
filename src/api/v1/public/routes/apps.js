/************
 * REQUIRES *
 ************/

// Routing
const express = require("express");
const app = express();


// Controllers
const { AppController } = require("../../../../js/controllers");


// Validation
const {
    validateGetAppsPayload,
    validateGetAppPayload,
} = require("../validation");


// Custom variables
const {
    SuccessResponse,
    ValidationErrorResponse,
    BadRequestErrorResponse,
} = require("../../../../../custom_modules/Responses");





/********
 * GETS *
 ********/

app.get("/", function(req, res)
{
    validateGetAppsPayload(req.query)
    .then(function (results)
    {
        const response = new SuccessResponse({
            res,
            message: "Successfully validated payload",
            data: results,
        });
        res.send(response);
    })
    .catch(function (err)
    {
        const errResponse = new ValidationErrorResponse({
            error: err,
            res: res,
        });
        res.send(errResponse);
    });
    /*
    AppController.getAll()
    .then(function (results)
    {
        const response = new SuccessResponse({
            res,
            message: "Successfully retrieved all apps",
            data: results,
        });
        res.send(response);
    })
    .catch(function (err)
    {
        const errResponse = new BadRequestErrorResponse({
            res,
            message: "Failed to retrieve all apps",
            err,
        });
        res.send(errResponse);
    });
    */
});





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
