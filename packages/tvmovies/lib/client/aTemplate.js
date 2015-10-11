if (Meteor.isClient) {
  
	//Meteor.subscribe("TVMovies");
 
		// This code only runs on the client
	Template.aTemplate.helpers({
		tVMovies: function () {
			return TVMovies.find({}, {sort: {startTime: 1}});
		},
		dbMovieList: function ( headingDate ){
			var start = new Date(headingDate);
			var end = new Date(headingDate);
			end.setDate(end.getDate() + 1);
			//console.log(start);
			//console.log(end);

//			return TVMovies.find({startTime: new Date("Sun Oct 11 2015 17:15:00 GMT-0400 (Eastern Daylight Time)")}, {sort: {startTime: 1}});
			return TVMovies.find({startTime: { $gte : start, $lt: end }}, {sort: {startTime: 1}});
		},
		getDates: function() {
			//var startDates = TVMovies.find({}, {sort: {displayStartDate: 1}, fields: {displayStartDate: 1}}).fetch();
			var startDates = TVMovies.find({}, {sort: {startTime: 1}, fields: {startTime: 1}}).fetch();
			
			return _.uniq( startDates, true, function (record){ 
//						return record.displayStartDate();
						record.headingDate = record.startTime.toLocaleDateString();
						return record.headingDate;
					})
		},
		//displayDate: function
		movieCount: function () {
			return TVMovies.find({}).count();
		}
	/*,
    hideCompleted: function () {
      return Session.get("hideCompleted");
    },
    incompleteCount: function () {
      return Tasks.find({checked: {$ne: true}}).count();
    },
	myUserDetails: function () {
		return Meteor.user();
	}*/
	});

/*  
   Template.body.events({
    "submit .new-task": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
 
      // Get value from form element
      var text = event.target.text.value;
 
      // Insert a task into the collection
      Meteor.call("addTask", text);
 
      // Clear form
      event.target.text.value = "";
    },
    "change .hide-completed input": function (event) {
      Session.set("hideCompleted", event.target.checked);
    }
  });
  
  Template.task.helpers({
    isOwner: function () {
      return this.owner === Meteor.userId();
    }
  });
 
  Template.task.events({
    "click .toggle-checked": function () {
      // Set the checked property to the opposite of its current value
      Meteor.call("setChecked", this._id, ! this.checked);
    },
    "click .delete": function () {
      Meteor.call("deleteTask", this._id);
    },
    "click .toggle-private": function () {
      Meteor.call("setPrivate", this._id, ! this.private);
    }
  });
*/
}
