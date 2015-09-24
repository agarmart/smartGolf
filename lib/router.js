Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {    return [Meteor.subscribe('messages')];  }
  
});


Router.route('/', {name: 'dashboard'});
Router.route('/messages', {name: 'messagesList'});



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







Router.onBeforeAction(requireLogin, {only: ['messagesList','dashboard']});