const searched_location_list = $("searched_location");
const locations = [];
const key = "fe19897d62524787142ce36a5083a059";

// Time format
function day_format(date) {
  const date = new Date();
  console.log(date);
  const month = date.getMonth() + 1;
  var day = date.getDate();

  const formatted_date =
    date.getFullYear() +
    "/" +
    (month < 10 ? "0" : "") +
    month +
    "/" +
    (day < 10 ? "0" : "") +
    day;
  return formatted_date;
}

init();

// Defining an init function that stors the search history in the local storage
function init() {
  const stored_locations = JSON.parse(localStorage.getItem("location"));
  if (stored_locations !== null) {
    location = stored_locations;
  }
  display_location();
}

// Defining a function for storing data in an array from the local storage
function display_location() {
  localStorage.setItem("locations", JSON.stringify(locations));
  console.log(localStorage);
}
