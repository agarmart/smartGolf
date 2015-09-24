Template.header.helpers({

  messagesCount: function() {
      return Messages.find().count();  
  }



});