Meteor.publish('messages', function() {
	if (this.userId)
	{
  		return Messages.find({ $or: [{userId: this.userId},{receiverId: this.userId}]});
  }
});


Meteor.publish('gamesToUpload', function() {
	if (this.userId)
	{
  		return Messages.find({userId: this.userId});
  }
});