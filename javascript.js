Parse.initialize("HLh6vGMEIITwBefYZUQ2b6K1uvrzrBEw459Qe0iE", "5Lxv4WecXr7Kt3xvA7D4Kr3l2nJ3LM9lJR2hiCUf");

var Activity = function(name, creator, link){
this.name = name;
this.creator = creator;
this.link = link

};
//alert("hey!");
var myActivities = [];
$('#loginButton').click(function(event){
	
	var username = $("#username").val();
	var password = $("#password").val();

	Parse.User.logIn(username, password, {
  success: function(user) {
    // Do stuff after successful login.

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
	myActivities = [];
	$(".activityList").empty();
	if($("#idButton") !== undefined){
		$("#idButton").remove();
	}
	var activity = Parse.Object.extend("Activity");
	var activityQuery = new Parse.Query(activity);
	activityQuery.find({
		success: function(results){

			for (var i = 0; i < results.length; i++) {

				myActivities.push(results[i].attributes);
			};
			console.log(myActivities);
			for (var i = 0; i < myActivities.length; i++) {
				$(".activityList").append("<li class='activityInList' data-activityindex='" + i+"'>"+myActivities[i].activityName+ "</li>"); 	
			};
			$(".activityList").addClass("activitiesBackground");

			$("li").click(function(){
				$(".activityList").empty();
				$(".activityList").append("<li class='activityInList'>"+myActivities[$(this).data("activityindex")].activityName+ "</li>").append("<button id='backButton'>Back</button>");
				$("#backButton").click(function(){
					findActivities();
				});
			});
		},
		error: function(error){
			alert("Oops!" + error);
		}
	});
};



function showActivityDetail(activity){
	console.log("You clicked on " + activity);
}
