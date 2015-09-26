Template.header.helpers({

  messagesCount: function() {
      return Messages.find().count();  
  }



});

Template.header.helpers({

  messageisnonzero: function() {
  	if (Messages.find().count()>1) {
  	  return true
  	} else {
      return false 
      }
  }



});


Template.header.helpers({

  gamestouploadCount: function() {
      return GamesToUpload.find().count();  
  }



});

Template.header.helpers({

  gamestouploadisnonzero: function() {
  	if (GamesToUpload.find().count()>1) {
  	  return true
  	} else {
      return false 
      }
  }



});

