class ModelNotSetError extends Error
{
	constructor()
	{
		super("The controller must have a static Model set");
		this.name = "ModelNotSetError";
	}
}



module.exports = ModelNotSetError;
