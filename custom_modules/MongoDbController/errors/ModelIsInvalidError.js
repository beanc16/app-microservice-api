class ModelIsInvalidError extends Error
{
	constructor()
	{
		super("The model is invalid (try checking the casing of parameters)");
		this.name = "ModelIsInvalidError";
	}
}



module.exports = ModelIsInvalidError;
