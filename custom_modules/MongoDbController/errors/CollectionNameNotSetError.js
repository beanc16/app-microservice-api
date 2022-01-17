class CollectionNameNotSetError extends Error
{
	constructor()
	{
		super("The controller must have a static collectionName set");
		this.name = "CollectionNameNotSetError";
	}
}



module.exports = CollectionNameNotSetError;
