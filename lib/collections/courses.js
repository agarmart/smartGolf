Courses = new Mongo.Collection('courses');


Meteor.methods({
    courseInsert: function(courseAttributes) {       
    	check(Meteor.userId(), String);        
    	check(courseAttributes, {            
    		name: String, 
    		country: String,            
    		city: String,
    		nbhole: Number,
    		holestartlat: [Number],
    		holestartlong: [Number],
    		holeendlat: [Number],
    		holeendlong:  [Number],
    		par: [Number]     }); 
    	 


    	if ((courseAttributes.nbhole != 9) && (courseAttributes.nbhole != 18) ) {
    		return false

    	}


    	var user = Meteor.user();        
    	var course = _.extend(courseAttributes, {
    	            userId: user._id,            
    	            author: user.username,            
    	            submitted: new Date()        
    	        });        
    	var courseId = Courses.insert(course);    
    	return {            
    		_id: courseId        
    	};    
    }




});