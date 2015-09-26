Template.newcourse.helpers({
  whichOne: function () {
    return Session.get('addhole') ? 'newcoursehole' : 'newcoursedata'
  }
});

Template.newcoursehole.helpers({
  coursename: function () {
  	var temp = Session.get('courseStocke');
    return temp.name;
  }
});

Template.newcoursehole.helpers({
  holenb: function () {
  	var temp = Session.get('holetoadd');
    return temp;
  }
});

Template.newcoursehole.helpers({
  instruction: function () {
	return Session.get('instruction') ? 'Green Center' : 'Starting Point'
  }
});


Template.newcourse.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var $name = $(e.target).find('[name=name]');
	var $country = $(e.target).find('[name=country]');
	var $city = $(e.target).find('[name=city]');
	var $nbhole = $(e.target).find('[name=optradio]:checked');

	var course = {
      name: $name.val(),
      country: $country.val(),
      city: $city.val(),
      nbhole: parseInt($nbhole.val()),
      holestartlat: [],
      holestartlong: [],
      holeendlat: [],
      holeendlong: [],
      par: []
    };

	if (! course.name) {      
      return throwError('Please enter a name');
    }
    if (! course.country) {      
      return throwError('Please enter a country');
    }
    if (! course.city) {      
      return throwError('Please enter a city');
    }


    if (! course.nbhole) {      
      return throwError('Please select a number of hole');
    }


    Session.set('courseStocke',course);
    Session.set('addhole',true);
    Session.set('holetoadd',1)
    
      }
});


Template.newcoursehole.helpers({
  addholeOptions: function() {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // Map initialization options
      return {
      	mapTypeId: google.maps.MapTypeId.HYBRID,
        center: new google.maps.LatLng(4.407145, 102.203006),
        zoom: 6,
        disableDoubleClickZoom: true
      };
    }
  }
});




Template.newcoursehole.onCreated(function() {  
  GoogleMaps.ready('addhole', function(map) {
     google.maps.event.addListener(map.instance, 'dblclick', function(event) {
      	var holetoadd =Session.get('holetoadd');
      	var coursestocke =Session.get('courseStocke');
      	var instruc = Session.get('instruction');
      	

      	if (instruc) {
      		var par = window.prompt("Hole "+holetoadd + " par?",4);
      		coursestocke.holeendlat[holetoadd-1]=event.latLng.lat();
      		coursestocke.holeendlong[holetoadd-1]=event.latLng.lng();
      		coursestocke.par[holetoadd-1]= parseInt(par);
      		Session.set('courseStocke',coursestocke);
      		Session.set('holetoadd',holetoadd+1);
      		Session.set('instruction',false);
      		if (holetoadd == coursestocke.nbhole) {
      			    Meteor.call('courseInsert', coursestocke, function(error, result) {
      			    	if (error) {
      			    		throwError("Error");
      			    	} else {
      			    		//alert("course added");
      			    	}

      			    	Session.set('addhole',false);
      			    	Session.set('courseStocke',null);
      					Session.set('holetoadd',null);

      			    }
      		);}

      	} else {
      		coursestocke.holestartlat[holetoadd-1]=event.latLng.lat();
      		coursestocke.holestartlong[holetoadd-1]=event.latLng.lng();
      		Session.set('courseStocke',coursestocke);
      		Session.set('instruction',true);
      	}

    });
  });
});