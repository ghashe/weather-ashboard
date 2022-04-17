var searched_location_list = $("#searched_location");
var locations = [];
var key = "fe19897d62524787142ce36a5083a059";

// Time format
function day_format(date) {
  var date = new Date();
  console.log(date);
  var month = date.getMonth() + 1;
  var day = date.getDate();

  var formatted_date =
    date.getFullYear() +
    "-" +
    (month < 10 ? "0" : "") +
    month +
    "-" +
    (day < 10 ? "0" : "") +
    day;
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
    fetch_weather_report(location);
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

function fetch_weather_report(location_name) {
  var URL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    location_name +
    "&appid=" +
    key;

  $("#today_weather_report_container").empty();
  $.ajax({
    url: URL,
    method: "GET",
  }).then(function (response) {
    location_title = $("<h3>").text("Location:  " + response.name);
    $("#today_weather_report_container").append(location_title);

    var get_tempeture_number = parseInt((response.main.temp * 9) / 5 - 459);
    var location_temperature = $("<p>").text(
      "Tempeture: " + get_tempeture_number + " °F"
    );
    $("#today_weather_report_container").append(location_temperature);
    var location_humidity = $("<p>").text(
      "Humidity: " + response.main.humidity + " %"
    );
    $("#today_weather_report_container").append(location_humidity);
    var location_wind_speed = $("<p>").text(
      "Wind Speed: " + response.wind.speed + " MPH"
    );
    $("#today_weather_report_container").append(location_wind_speed);
    var coord_lon = response.coord.lon;
    var coord_lat = response.coord.lat;

    var RRL_UVI =
      "https://api.openweathermap.org/data/2.5/uvi?appid=" +
      key +
      "&lat=" +
      coord_lat +
      "&lon=" +
      coord_lon;
    $.ajax({
      url: RRL_UVI,
      method: "GET",
    }).then(function (responseuv) {
      var location_uv = $("<span>").text(responseuv.value);
      var location_uvp = $("<p>").text("UV Index: ");
      location_uvp.append(location_uv);
      $("#today_weather_report_container").append(location_uvp);
      console.log(typeof responseuv.value);
    });
    var url_forecast =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      location_name +
      "&appid=" +
      key;
    $.ajax({
      url: url_forecast,
      method: "GET",
    }).then(function (forecast_response) {
      $("#weekly_list_container").empty();
      console.log(forecast_response);
      for (var index_1 = 0, index_2 = 1; index_2 <= 6; index_1 = index_1 + 7) {
        var get_date = forecast_response.list[index_1].dt;
        if (
          forecast_response.list[index_1].dt !=
          forecast_response.list[index_1 + 1].dt
        ) {
          var forcast_div_title = $("<div>");
          var forcast_weather_title_text = "6 Days Weather Forcast";
          var forcast_weather_title = $("<h2>").text(
            forcast_weather_title_text
          );
          forcast_div_title.append(forcast_weather_title);

          var forcast_div = $("<div>");
          forcast_div.attr("class", "report_container_box");
          var d = new Date(0);
          d.setUTCSeconds(get_date);
          var date = d;
          console.log(date);
          var month = date.getMonth() + 1;
          var day = date.getDate();
          var date_format =
            date.getFullYear() +
            "-" +
            (month < 10 ? "0" : "") +
            month +
            "-" +
            (day < 10 ? "0" : "") +
            day;
          var forecast_response_h4 = $("<h6>").text(date_format);

          var img_tag = $("<img>");
          var weather_condition =
            forecast_response.list[index_1].weather[0].main;
          if (weather_condition === "Clouds") {
            img_tag.attr(
              "src",
              "https://img.icons8.com/color/48/000000/cloud.png"
            );
          } else if (weather_condition === "Clear") {
            img_tag.attr(
              "src",
              "https://img.icons8.com/color/48/000000/summer.png"
            );
          } else if (weather_condition === "Rain") {
            img_tag.attr(
              "src",
              "https://img.icons8.com/color/48/000000/rain.png"
            );
          }

          var projected_temperature_k =
            forecast_response.list[index_1].main.temp;
          console.log(weather_condition);
          var get_tempeture_number = parseInt(
            (projected_temperature_k * 9) / 5 - 459
          );
          var projected_temperature = $("<p>").text(
            "Tempeture: " + get_tempeture_number + " °F"
          );
          var projected_humidity = $("<p>").text(
            "Humidity: " + forecast_response.list[index_1].main.humidity + " %"
          );
          forcast_div.append(forecast_response_h4);
          forcast_div.append(img_tag);
          forcast_div.append(projected_temperature);
          forcast_div.append(projected_humidity);
          $("#weekly_list_container").append(forcast_div);
          console.log(forecast_response);
          index_2++;
        }
      }
    });
  });
}
$(document).on("click", "#list_of_location", function () {
  var thisLocation = $(this).attr("location_searched_data");
  fetch_weather_report(thisLocation);
});

var currentDate =
  moment().format("dddd") + " " + moment().format("Do MMM YYYY");
var presentHour = moment().format("h:mm:ss a");

// The date and the time
var interval = setInterval(function () {
  var thisHour = moment();
  $("#todays_date").html(
    thisHour.format("YYYY MMMM DD") +
      " " +
      thisHour.format("dddd").substring(0, 3).toUpperCase()
  );
  $("#todays_date").html(
    currentDate + " " + thisHour.format("hh:mm:ss A") + " " + "Weather"
  );
}, 100);
