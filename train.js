var trainLink= new Firebase("https://train-schedule.firebaseio.com/");

$("#addTrain").on("click", function(){
	// capture values of input
	var trainName= $("#trainName").val().trim() 
	var destination= $("#destination").val().trim()
	var firstTime= $("#firstTime").val().trim()
	var frequency= $("#frequency").val().trim()
	// empty train vals
	$("#trainName").val('') 
	$("#destination").val('')
	$("#firstTime").val('')
	$("#frequency").val('')
	// create new train input
	var newTrain = {
		name:  trainName,
		dest: destination,
		first: firstTime,
		freq: frequency
	}
	// push the newest train to firebase
	trainLink.push(newTrain);


});

trainLink.on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

	// Store everything into a variable.
	var trainName = childSnapshot.val().name;
	var destination = childSnapshot.val().dest;
	var firstTime = childSnapshot.val().first;
	var frequency = childSnapshot.val().freq;

	var firstTimeConverted = moment(firstTime,"hh:mm");
		console.log(firstTimeConverted);

		// Current Time
		var currentTime = moment();
		console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

		// Difference between the times
		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		console.log("DIFFERENCE IN TIME: " + diffTime);

		var tRemainder = diffTime % frequency; 

		var minTill = frequency - tRemainder;
		var nextTrain = moment().add(minTill, "minutes")
		var nextCon = moment(nextTrain).format("hh:mm")

	$(".trains").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextCon + "</td><td>" + minTill + "</td><td>");
});

