var feedSubscription;

// Handle for launch screen possibly dismissed from app-body.js
dataReadyHold = null;

// Global subscriptions
// ajc: I don't think I need these it looks like I am already subscribed 
/*
if (Meteor.isClient) {
  Meteor.subscribe('news');
  Meteor.subscribe('bookmarkCounts');
  feedSubscription = Meteor.subscribe('feed');
  Meteor.subscribe('ajcRoute');
}
*/

Router.configure({
  layoutTemplate: 'appBody',
  notFoundTemplate: 'notFound'
});

Router.route('home', {
  path: '/'
});

Router.route('aTemplate');

//Router.route('recipes');

//Router.route('bookmarks');

//Router.route('about');
/*
Router.route('recipe', {
  path: '/recipes/:name'
});
*/
/*
Router.route('recipe', {
  path: '/recipes/:name',
    onRun: function(){
        console.log("You triggered 'onRun' for 'recipe' route.");
        //this.next();
    },
    onRerun: function(){
        console.log("You triggered 'onRerun' for 'recipe' route.");
    },
    onBeforeAction: function(){
        console.log("You triggered 'onBeforeAction' for 'recipe' route.");
    },
    onAfterAction: function(){
        console.log("You triggered 'onAfterAction' for 'recipe' route.");
    },
    onStop: function(){
        console.log("You triggered 'onStop' for 'recipe' route.");
    }
});
*/

/*
Router.onBeforeAction( function(pause){
	console.log("You triggered 'onBeforeAction' for: " + Router.current().path); 
	console.log(pause);
	//Router.stop();
	//this.stop();
	pause();
	} );

var go = Router.go; // cache the original Router.go method
Router.go = function () {
	//console.log("You triggered 'Router.go' for: " + Router.current().path); 
	//console.log(this); 
	//console.log(arguments); 
	// update the database
	Meteor.call("setCurrentRoute", arguments);
	go.apply(this, arguments);
};
*/