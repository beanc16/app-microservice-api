class App
{
    constructor({
        _id,
        env,
        searchName,
        displayName,
        data,
    })
    {
        if (_id)
        {
            this._id = _id;
        }

        this.env = (env) ? env : process.env.STAGE;
        this.searchName = searchName;
        this.displayName = displayName;
        this.data = (data) ? data : {};
    }
}



module.exports = App;
