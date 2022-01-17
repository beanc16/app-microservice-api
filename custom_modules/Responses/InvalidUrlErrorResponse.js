const Response = require("./Response");



class InvalidUrlErrorResponse extends Response
{
    constructor({
        res,        // For status code
    })
    {
        if (res)
        {
            res.status(404);
        }
        
        super({
            res,
            error: "Invalid URL",
        });
    }
}



module.exports = InvalidUrlErrorResponse;
