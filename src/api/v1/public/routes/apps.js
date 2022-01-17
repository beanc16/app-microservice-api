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
    .then(function (payload)
    {
        const findParams = convertEnvForFindParams(req.query);

        AppController.getAll(findParams)
        .then(function (data)
        {
            const response = new SuccessResponse({
                res,
                message: getSuccessMessageForGetApps(req.query),
                data: data.results,
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
    })
    .catch(function (err)
    {
        const errResponse = new ValidationErrorResponse({
            error: err,
            res: res,
        });
        res.send(errResponse);
    });
});

// Get apps - helper
function getSuccessMessageForGetApps(query)
{
    let str = "Successfully retrieved all apps";

    if (query.env)
    {
        str += ` from ${query.env}`;
    }

    if (query.searchName)
    {
        str += ` named ${query.searchName}`;
    }

    if (query._id)
    {
        str += ` with ID ${query._id}`;
    }
    else if (query.id)
    {
        str += ` with ID ${query.id}`;
    }

    return str;
}

// Get apps - helper
function convertEnvForFindParams(query)
{
    let findParams = query;

    if (query.env)
    {
        findParams = Object.assign({}, query, {
            // envs array includes query.env
            envs: {
                // $in for Mongo = array.includes() for JavaScript
                $in: [query.env]
            },
        });

        delete findParams.env;
    }
    
    return findParams;
}





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
