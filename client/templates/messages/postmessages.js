Template.messageNew.events({
    'submit form': function(e) {        
    	e.preventDefault();

        var message = {            
        	receiver: $(e.target).find('[name=receiver]').val(),            
        	title: $(e.target).find('[name=title]').val(),
        	body: $(e.target).find('[name=body]').val()        
        };

        Meteor.call('messageInsert', message, function(error, result) {          
            if (error)                
            	return throwError(error.reason);
                       
            if (result.usernonExists)
                return throwError('This recipient non exist');

            Router.go('messagesList');        
        });    
    }
});


Template.messagesList.helpers({
  messages: function() {
  	return Messages.find();
  }
});