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

$("#signupButton").click(function(){
	$("#loginButton").remove();
	$("#noAccount").remove();
	$("#signupButton").remove();
	$("form").append("<input type='text' id='email' placeholder='Email'>");
	$("form").append("<button id='createAccount'>Create Account</button>");

	$("#createAccount").click(function(event){
		//note that event.preventDefault() is necessary even when it's not explicityly labelled a submit button
		event.preventDefault();
		var name = $("#username").val();
		var password = $("#password").val();
		var email = $("#email").val();
		console.log("name is: " + name + " password is: " + password + " email is: " + email);

		var user = new Parse.User();
		user.set("username", name);
		user.set("password", password);
		user.set("email", email);

		user.signUp(null, {
  success: function(user) {
  	alert("Account successfully created!");
  },
  error: function(user, error) {

    alert("Error: " + error.code + " " + error.message);
  }
});
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
				if (activityPath.image !== undefined) {
					var imagePath = activityPath.image.url();	
				};
					function showActivityHeader() {
						$(".activityList").empty();
						$(".activityList").append("<img id='backButton' src='images/back-arrow.png'>");
						$(".activityList").append("<img id='editButton' src='images/edit-icon.png'>");
						$(".activityList").append("<li id='activityTitle' class='activityInList'>"+activityPath.name+ "</li>");

						$("#backButton").click(function(){
							findActivities();
						});
						$("#editButton").click(function(){
							beginEditingMode();
						});
					}
					showActivityHeader();
					
				function showStaticActivityBody(){
					if (imagePath !== undefined) {
					$(".activityList").append("<img src='" + imagePath+"'class='activityImage'></img>");
					};

					if (activityPath.creator) {$(".activityList").append("<li >" + "Created by: " + activityPath.creator +"</li>")};
					if (activityPath.link) {$(".activityList").append("<li>" + activityPath.link + "</li>")};
					if (activityPath.location) {$(".activityList").append("<li>" + activityPath.location + "</li")};
					if (activityPath.phoneNumber) {$(".activityList").append("<li>" + activityPath.phoneNumber + "</li>")};
					console.log(activityPath.description);
					if (activityPath.description){$(".activityList").append("<textarea value=>" + activityPath.description+"</textarea>")};		
				}
				showStaticActivityBody();
				
								  
				
				function beginEditingMode(){
					showActivityHeader();
					$("#editButton").remove();
					$("#backButton").after("<img id='saveButton'src='images/save-icon.png'>");
					$(".activityList").append("<input type=text value='" + "Created by: " + (activityPath.creator || "") +"'></input>" +
										  "<input id='linkField' type=text placeholder='Link' value='" + (activityPath.link || "") +"'></input>" +
										  "<input id='locationField' type=text placeholder='Location' value='" + (activityPath.location || "") +"'></input>" +
										  "<input id='phoneNumberField' type=text placeholder='Phone Number'value='" + (activityPath.phoneNumber || "")+"'></input>" +
										  "<textarea id='descriptionField' placeholder='Description'>"+ (activityPath.description || "")+ "</textarea>");
					$("#saveButton").click(function(){
						saveObjectToParse();
						showActivityHeader();
						showStaticActivityBody();
					});
				}		

				function saveObjectToParse(){
					console.log(activityPath.objectId);
					var LocalActivity = Parse.Object.extend("Activity");
					var localActivity = new LocalActivity();
					localActivity.id = activityPath.objectId;
					localActivity.set("linkField", $("#linkField").val());
					localActivity.set("locationField", $("#locationField").val());
					localActivity.set("phoneNumberField", $("#phoneNumberField").val());
					localActivity.set("descriptionField", $("#descriptionField").val());
					localActivity.save(null, { 
						success: function(localActivity){
							console.log("save successful");
						}, 

						error: function(localActivity, error){
							console.log(error.description);
					}});
					

				}	

					$("#editButton").click(function(){
						beginEditingMode();
					});
			});
		},
		error: function(error){
			alert("Oops!" + error.toString());
		}
	});
};

				






