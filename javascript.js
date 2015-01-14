Parse.initialize("HLh6vGMEIITwBefYZUQ2b6K1uvrzrBEw459Qe0iE", "5Lxv4WecXr7Kt3xvA7D4Kr3l2nJ3LM9lJR2hiCUf");

var Activity = function(name, creator, link, objectId, description, location, phoneNumber, image){
this.name = name;
this.creator = creator;
this.link = link
this.objectId = objectId;
this.description = description;
this.location = location;
this.phoneNumber = phoneNumber;
this.image = image;

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
				var name = results[i].attributes.activityName;
				var creator = results[i].attributes.activityCreator;
				var link = results[i].attributes.linkField;
				var objectId = results[i].id;
				var description = results[i].attributes.descriptionField;
				var location = results[i].attributes.locationField;
				var phoneNumber = results[i].attributes.phoneNumberField;
				var image = results[i].attributes.activityImage;
				var activity = new Activity(name, creator, link, objectId, description, location, phoneNumber,image);
				myActivities.push(activity);
			};
			for (var i = 0; i < myActivities.length; i++) {
				$(".activityList").append("<li class='activityInList' data-activityindex='" + i+"'>"+myActivities[i].name+ "</li>"); 	
			};
			$(".activityList").addClass("activitiesBackground");

			$("li").click(function(){
				var activityPath = myActivities[$(this).data("activityindex")];
				if (myActivities[$(this).data("activityindex")].image !== undefined) {
					var imagePath = myActivities[$(this).data("activityindex")].image.url();	
				};
				
				$(".activityList").empty();
				$(".activityList").append("<img id='backButton' src='images/back-arrow.png'>");
				$(".activityList").append("<img id='editButton' src='images/edit-icon.png'>");
				$(".activityList").append("<li id='activityTitle' class='activityInList'>"+myActivities[$(this).data("activityindex")].name+ "</li>")
				if (imagePath !== undefined) {
					$(".activityList").append("<img src='" + imagePath+"'class='activityImage'></img>");
				};
				$(".activityList").append("<li>" +(activityPath.creator || "") +"</li>" +
										  "<li>" +(activityPath.link || "") +"</li>" +
										  "<li>" +(activityPath.location || "")+"</li>" +
										  "<li>" + (activityPath.phoneNumber || "")+"</li>" +
										  "<textarea value='" + (activityPath.description || "") +"'></textarea>");

				$("#editButton").click(function(){
					$(".activityList").append("<input type=text value='" + (activityPath.creator || "") +"'></input>" +
										  "<input type=text value='" + (activityPath.link || "") +"'></input>" +
										  "<input type=text value='" + (activityPath.location || "") +"'></input>" +
										  "<input type=text value='" + (activityPath.phoneNumber || "")+"'></input>" +
										  "<textarea value='" + (activityPath.description || "") +"'></textarea>");

				});
				
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

				






