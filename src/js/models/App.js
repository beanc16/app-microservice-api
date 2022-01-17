class App
{
    constructor({
        _id,
        envs,
        searchName,
        displayName,
        data,
    })
    {
        if (_id)
        {
            this._id = _id;
        }

        this.envs = (envs) ? envs : [process.env.STAGE];
        this.searchName = searchName;
        this.displayName = displayName;
        this.data = (data) ? data : {};
    }
}



module.exports = App;
