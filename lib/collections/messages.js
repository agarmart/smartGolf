Messages = new Mongo.Collection('messages');


Meteor.methods({    
	messageInsert: function(messageAttributes) {        
		check(this.userId, String);        
		check(messageAttributes, {  
			receiver: String,          
			title: String,            
			body: String        
		});

        var receiver_user = Meteor.users.findOne({username: messageAttributes.receiver});        
        if (!receiver_user) {            
        	return {                
        		usernonExists: true,                          
        	}        
        }


        var user = Meteor.user();        
        var message = _.extend(messageAttributes, {
        			receiverId: receiver_user._id,
                    userId: user._id,            
                    author: user.username,            
                    submitted: new Date()        
                });

        var messageId = Messages.insert(message);
        return {            
        	_id: messageId        
        };    
    }
});