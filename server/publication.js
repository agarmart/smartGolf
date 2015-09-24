Meteor.publish('messages', function() {
  return Messages.find({from: Meteor.userId});
});