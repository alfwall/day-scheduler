# Work Day Scheduler

## Description
Saves your plans for today's work! Clears itself when loaded on a different day! Uses starter code from module 5 challenge.

## The Result
[Click here!](https://alfwall.github.io/day-scheduler/)

![Screenshot of the deployed project.](SCREENSHOT_OF_PROJECT_IN_ASSETS)

## TODO
- [x] Get the current day, $("#currentDay").text(today.format("dddd, MMM D, YYYY"))
- [x] Get the current time, apply past/present/future classes to each hour based on current hour.
- [x] LOCAL STORAGE: Store the date whenever saving. If the date has changed, delete everything.
- [x] On load, check localStorage.SavedDate. If null, save today there and create a fresh schedule.
- [x] If new day, erase all plans.
- [x] If same day, recreate that schedule.
- [x] Check the time, get the hour. Style that hour as "Current", everything before as "Past", and after as "Future".


## User Story
AS AN employee with a busy schedule,
I WANT to add important events to a daily planner
SO THAT I can manage my time effectively.

## Acceptance Criteria
GIVEN I am using a daily planner to create a schedule...

WHEN I open the planner, THEN the current day is displayed at the top of the calendar.

WHEN I scroll down, THEN I am presented with time blocks for standard business hours of 9am to 5pm.

WHEN I view the time blocks for that day, THEN each time block is color-coded to indicate whether it is in the past, present, or future.

WHEN I click into a time block, THEN I can enter an event.

WHEN I click the save button for that time block, THEN the text for that event is saved in local storage.

WHEN I refresh the page, THEN the saved events persist.