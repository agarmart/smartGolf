Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {    return [Meteor.subscribe('gamesToUpload'),Meteor.subscribe('messages')];  }
  
});


Router.route('/', {name: 'dashboard'});
Router.route('/messages', {name: 'messagesList'});
Router.route('/stats', {name: 'stats'});
Router.route('/games', {name: 'games'});
Router.route('/createnewcourse', {name: 'newcourse'});
Router.route('/messages/new', {name: 'messageNew'});
Router.route('/gamestoppload', {name: 'gamesToUpload'});




Router.route('/messages/:_id', {  
  name: 'readMessage',  
  data: function() { return Messages.findOne(this.params._id); }
}); 

var requireLogin = function() {
    if (! Meteor.user()) {     
       if (Meteor.loggingIn()) {     
            this.render(this.loadingTemplate);        
        } else {
            this.render('discoverSmartGolf'); 
        }    
    } else {
        this.next();    
    }
}







Router.onBeforeAction(requireLogin, {only: ['messagesList','dashboard','stats','games','newcourse','messageNew','gamesToUpload']});

Router.onBeforeAction(function() {
  GoogleMaps.load({key : 'AIzaSyDFtBNSI9udHcqrFIlRZXTpwBqhNZoHAMo'});
  this.next();
}, { only: ['newcourse'] });

