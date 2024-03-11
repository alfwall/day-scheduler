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

  // Make it easy to loop through the date sections by using these as ID's
  // with relevant military time values instead of am/pm values.
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
    for (var i = 0; i < timeBlocks.length; i++) {
      localStorage.setItem(timeBlocks[i], "");
    }
  }
  var today = dayjs(); //.add(12, "hour");
  var previousDate = localStorage.getItem("date-last-used");
  // If no previous date exists OR today is a different day, clear the data!
  if (previousDate == null || !today.isSame(dayjs(previousDate), "day")) {
    localStorage.setItem("date-last-used", today.format("M-D-YYYY"));
    ClearAllPlans();
  }
  // Use military time hour for actual time checking, no AM/PM
  var militaryHour = parseInt(today.format("H"));
  var timeBlockContainer = this.querySelector(".container-fluid").children;
  for (var i = 0; i < timeBlockContainer.length; i++) {
    var timeBlock = timeBlockContainer[i];
    var id = parseInt(timeBlock.id.split("-")[1]);
    if (id < militaryHour) {
      timeBlock.classList.add("past");
    }
    else if (id > militaryHour) {
      timeBlock.classList.add("future");
    }
    else {
      timeBlock.classList.add("present");
    }
  }

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  for (var i = 0; i < timeBlocks.length; i++) {
    // Loop through all the time block id's,
    timeToSave = timeBlocks[i];
    // use the id to get the saved text,
    newText = localStorage.getItem(timeToSave);
    // then write that to each related time block.
    $("#" + timeToSave).children("textarea.description").val(newText);
  }

  // TODO: Add code to display the current date in the header of the page.
  $("#currentDay")[0].textContent = "TODAY: " + today.format("MMMM D, YYYY");
});
