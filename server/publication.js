Meteor.publish('messages', function() {
	if (this.userId)
	{
  		return Messages.find({ $or: [{userId: this.userId},{receiverId: this.userId}]});
  }
  	else
  	{
  		return [];
  	}
});


Meteor.publish('gamesToUpload', function() {
	if (this.userId)
	{
  		return GamesToUpload.find({userId: this.userId});
  }
  	else
  	{
  		return [];
  	} 	
});