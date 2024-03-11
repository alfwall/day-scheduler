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

  function ClearAllPlans() {
    for (var i=0; i<timeBlocks.length; i++) {
      localStorage.setItem(timeBlocks[i], "");
    }
  }

  //var utc = require("dayjs/plugin/utc");
  
  var today = dayjs()
  console.log("TODAY IS: " + today.toString())
  $("#currentDay")[0].textContent = "TODAY: " + today.toString();
  //var today2 = today.add(1, "day").set("hour", 12).set("minute", 30).tz("");
  //console.log("TODAY2 IS: " + today2.toString())

  var previousDate = localStorage.getItem("date-last-used");
  if (previousDate == null) {
    localStorage.setItem("date-last-used", today.format("M-D-YYYY"));
    ClearAllPlans();
  }
  if (today.isAfter(dayjs(previousDate))) {
    for(var i=0; i<timeBlocks.length; i++) {
      $("#" + timeBlocks[i]).children("textarea.description").val("");
    }
    ClearAllPlans();
    localStorage.setItem("date-last-used", today.format("M-D-YYYY"));
  }

  var militaryHour = parseInt(today.format("H")); // Used for actual time checking, no AM/PM
  var pastPresentFutureState = "";
  console.log("military hour is: " + militaryHour);
  var timeBlockContainer = this.querySelector(".container-fluid").children;
  console.log(timeBlockContainer)
  for (var i = 0; i < timeBlockContainer.length; i++) {
    var timeBlock = timeBlockContainer[i];
    var id = parseInt(timeBlock.id.split("-")[1]);
    console.log("id: " + id + "; militaryHour: " + militaryHour);
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
    console.log("Time block " + id + " is in the " + pastPresentFutureState + "!");
  }

  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  h9Text = localStorage.getItem("hour-9");
  h10Text = localStorage.getItem("hour-10");
  h11Text = localStorage.getItem("hour-11");
  h12Text = localStorage.getItem("hour-12");
  h1Text = localStorage.getItem("hour-1");
  h2Text = localStorage.getItem("hour-2");
  h3Text = localStorage.getItem("hour-3");
  h4Text = localStorage.getItem("hour-4");
  h5Text = localStorage.getItem("hour-5");
  $("#hour-9").children("textarea.description").val(h9Text);
  $("#hour-10").children("textarea.description").val(h10Text);
  $("#hour-11").children("textarea.description").val(h11Text);
  $("#hour-12").children("textarea.description").val(h12Text);
  $("#hour-1").children("textarea.description").val(h1Text);
  $("#hour-2").children("textarea.description").val(h2Text);
  $("#hour-3").children("textarea.description").val(h3Text);
  $("#hour-4").children("textarea.description").val(h4Text);
  $("#hour-5").children("textarea.description").val(h5Text);

  //
  // TODO: Add code to display the current date in the header of the page.
});
