$(document).ready(function(){

//Firebase config and initialization//
var config = {
  apiKey: "AIzaSyDUwGAUwBQsdVSQryNCHcU2Bax1A1Frr6M",
    authDomain: "first-82321.firebaseapp.com",
    databaseURL: "https://first-82321.firebaseio.com",
    projectId: "first-82321",
    storageBucket: "first-82321.appspot.com",
    messagingSenderId: "3450112775"
};
firebase.initializeApp(config);

var database = firebase.database();

//On-click event for when a train is submitted.
$("#add-train").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainStart = $("#first-train-time-input").val().trim();
  var trainFrequency = $("#frequency-input").val().trim();

  //Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    start: trainStart,
    frequency: trainFrequency
  };

  //Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log("New train name: " + newTrain.name);
  console.log("New train destination: " + newTrain.destination);
  console.log("New train start: " + newTrain.start);
  console.log("New train frequency: " + newTrain.frequency + "min.");

  // Alert
  alert("Train successfully added");

  //Clears all of the text-boxes after train submitted.
  $("#name-input").val("");
  $("#destination-input").val("");
  $("#first-train-time-input").val("");
  $("#frequency-input").val("");
});

//Creates Firebase event for adding trains to the database and a row in the html when a user adds an entry.
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainStart = childSnapshot.val().start;
  var trainFrequency = childSnapshot.val().frequency;

  //Log train info
  console.log("Train name: " + trainName);
  console.log("Train destination: " + trainDestination);
  console.log("Train start: " + trainStart);
  console.log("Train frequency: " + trainFrequency + "min.");

  //Time converstions for train time
    firstTimeConverted = moment(trainStart, "hh:mm").subtract(1, "years");
    currentTime = moment();
    diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    tRemainder = diffTime % trainFrequency;
    minutesTilTrain = trainFrequency - tRemainder;
    nextTrain = moment().add(minutesTilTrain, "minutes");
    nextTrainFormatted = moment(nextTrain).format("hh:mm");

  console.log("Next train arrival: " + nextTrainFormatted);

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainFrequency + "</td><td>" + nextTrainFormatted + "</td><td>" + minutesTilTrain + "</td><td>");
});

}); //end of document ready