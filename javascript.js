Parse.initialize("HLh6vGMEIITwBefYZUQ2b6K1uvrzrBEw459Qe0iE", "5Lxv4WecXr7Kt3xvA7D4Kr3l2nJ3LM9lJR2hiCUf");

//alert("hey!");
$('#loginButton').click(function(event){
	
	var username = $("#username").val();
	var password = $("#password").val();
	console.log(username);
	console.log(password);

	Parse.User.logIn(username, password, {
  success: function(user) {
    // Do stuff after successful login.
    alert("login worked!");
    $("form").remove();
    findActivities();
  },
  error: function(user, error) {
    // The login failed. Check error to see why.
    alert("oops...login didn't work");
  }
});

});

function findActivities() {
	var activity = Parse.Object.extend("Activity");
	var activityQuery = new Parse.Query(activity);
	activityQuery.find({
		success: function(results){
			alert("found some results");

			var myActivities = [];
			for (var i = 0; i < results.length; i++) {

				myActivities.push(results[i].attributes.activityName);
			};
			console.log(myActivities);
			for (var i = 0; i < myActivities.length; i++) {
				$(".activityList").append("<li>"+myActivities[i] + "</li>"); 	
			};
		},
		error: function(error){
			alert("Oops!" + error);
		}
	});
};
