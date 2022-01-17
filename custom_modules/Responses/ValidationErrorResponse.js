const Response = require("./Response");



class ValidationErrorResponse extends Response
{
    constructor({
        res,        // For status code
        error,      // For error messages
    })
    {
        if (res)
        {
            res.status(400);
        }
        
        super({
            res,
            error,
            message: "Payload validation failed",
        });
    }
}



module.exports = ValidationErrorResponse;
