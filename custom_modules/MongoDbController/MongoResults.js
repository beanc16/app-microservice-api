class MongoResults
{
	constructor({
		results = null,
		error = null,
		status,
	})
	{
		this.results = results;
		this.error = error;
		
		if (status != null)
		{
			this.status = status;
		}
		else if (error === null)
		{
			this.status = 200;
		}
	}
	
	
	
	wasSuccessful()
	{
		if (this.results !== null || this.status === 200)
		{
			return true;
		}
		
		return false;
	}
	
	wasUnsuccessful()
	{
		return !this.wasSuccessful();
	}
}





module.exports = MongoResults;

