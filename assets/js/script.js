// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  $(".saveBtn").on("click", function () {
    var hourID = $(this.parentNode).attr("id");
    var text = $(this.parentNode).children(".description")[0].value;
    localStorage.setItem(hourID, text);
  });

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  // Make it easy to loop through the date sections
  var timeBlocks = [
    "hour-9",
    "hour-10",
    "hour-11",
    "hour-12",
    "hour-13",
    "hour-14",
    "hour-15",
    "hour-16",
    "hour-17"
  ];

  // Helper method to quickly initialize/clear localStorage plans
  function ClearAllPlans() {
    for (var i=0; i<timeBlocks.length; i++) {
      localStorage.setItem(timeBlocks[i], "");
    }
  }
  
  var today = dayjs(); //.add(12, "hour");

  var previousDate = localStorage.getItem("date-last-used");
  if (previousDate == null) {
    //console.log("no previous date!!")
    localStorage.setItem("date-last-used", today.format("M-D-YYYY"));
    ClearAllPlans();
  }
  if (!today.isSame(dayjs(previousDate), "day")) {
    //console.log("today is after last date!");
    for(var i=0; i<timeBlocks.length; i++) {
      $("#" + timeBlocks[i]).children("textarea.description").val("");
    }
    ClearAllPlans();
    localStorage.setItem("date-last-used", today.format("M-D-YYYY"));
  }

  var militaryHour = parseInt(today.format("H")); // Used for actual time checking, no AM/PM
  var pastPresentFutureState = "";
  //console.log("military hour is: " + militaryHour);
  var timeBlockContainer = this.querySelector(".container-fluid").children;
  //console.log(timeBlockContainer)
  for (var i = 0; i < timeBlockContainer.length; i++) {
    var timeBlock = timeBlockContainer[i];
    var id = parseInt(timeBlock.id.split("-")[1]);
    //console.log("id: " + id + "; militaryHour: " + militaryHour);
    if (id < militaryHour) {
      timeBlock.classList.add("past");
      pastPresentFutureState = "past";
    }
    else if (id > militaryHour) {
      timeBlock.classList.add("future");
      pastPresentFutureState = "future";
    }
    else {
      timeBlock.classList.add("present");
      pastPresentFutureState = "present";
    }
    //console.log("Time block " + id + " is in the " + pastPresentFutureState + "!");
  }

  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  for (var i=0; i<timeBlocks.length; i++) {
    timeToSave = timeBlocks[i];
    newText = localStorage.getItem(timeToSave);
    //console.log("saving '" + newText + "' to '" + timeToSave + "'");
    $("#" + timeToSave).children("textarea.description").val(newText);
  }
  //
  // TODO: Add code to display the current date in the header of the page.
  $("#currentDay")[0].textContent = "TODAY: " + today.format("MMMM D, YYYY");
});
