var searched_location_list = $("#searched_location");
var locations = [];
var key = "fe19897d62524787142ce36a5083a059";

// Time format
function day_format(date) {
  const date1 = new Date();
  console.log(date1);
  const month = date.getMonth() + 1;
  var day = date.getDate();

  const formatted_date =
    date.getFullYear() + "/" + (month < 10 ? "0" : "") + month + s;
  "/" + (day < 10 ? "0" : "") + day;
  return formatted_date;
}

init();

// Defining an init function that stors the search history in the local storage
function init() {
  var stored_locations = JSON.parse(localStorage.getItem("locations"));
  if (stored_locations !== null) {
    locations = stored_locations;
  }
  display_locations();
}

// Defining a function for storing data in an array from the local storage
function store_location() {
  localStorage.setItem("locations", JSON.stringify(locations));
  console.log(localStorage);
}

function display_locations() {
  searched_location_list.empty();

  for (let i = 0; i < locations.length; i++) {
    var location = locations[i];

    var searched_location_li = $("<li>").text(location);
    searched_location_li.attr("id", "list_of_location");
    searched_location_li.attr("location_searched_data", location);
    searched_location_li.attr("class", "searched_location_group");
    console.log(searched_location_li);
    searched_location_list.prepend(searched_location_li);
  }
  if (!location) {
    return;
  } else {
    // get_weather_report(location);
  }
}

// When the search button is clicked
$("#search_location_btn").on("click", function (event) {
  event.preventDefault();

  // From the input box, this line will retrieve the city
  var location_being_searched = $("#input_value").val().trim();

  // If the location is not searched before, then search and return from the function
  if (location_being_searched === "") {
    return;
  }
  locations.push(location_being_searched);

  display_locations();
  store_location();
});

var currentDate =
  moment().format("dddd") + " " + moment().format("Do MMM YYYY");
var presentHour = moment().format("h:mm:ss a");

// The date and the time
var interval = setInterval(function () {
  var thisHour = moment();
  $("#currentDay").html(
    thisHour.format("YYYY MMMM DD") +
      " " +
      thisHour.format("dddd").substring(0, 3).toUpperCase()
  );
  $("#currentDay").html(
    currentDate + " " + thisHour.format("hh:mm:ss A") + " " + "Weather"
  );
}, 100);
