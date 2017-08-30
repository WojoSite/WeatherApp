$(document).ready(function($) {
  console.log("Welcome to WeatherApp!");
  var WeatherApp = {
    init: function(){
      WeatherApp.startEventListeners();
    },
    startEventListeners: function(){
      $('#submit-button').on("click", WeatherApp.getWeatherInfo);
    },
    // Weather Underground API call
    getWeatherInfo: function(){
      var url = "/weather_call";
      var zip_code = $('#zip-input').val();
      if (zip_code.length !== 5){
        alert("Please enter a 5-digit zip code");
        return false
      }
      $.ajax({
        url: url,
        data: {
          zip: zip_code
        },
        method: "GET",
        dataType: "json"
      }).done(function(data){
        console.log(data);
        WeatherApp.displayResults(data);
      }).fail(function(){
        console.log("*** ajax fail ***");
      }).error(function() {
        console.log("*** ajax error ***");
      });
    },

    // Display WUnderground results
    displayResults: function(x){
      $('#display-zip-input').val(x.weather.location.zip);
      if ($('#display-zip-input').val() == x.weather.location.zip) {
        $('#display-submit-button').html("Refresh");
      }
      $('#display-zip-input').click(function(){
        $('#display-submit-button').html("Submit");
      })
      $('#location-display').html(x.weather.location.city);
      $('#state-display').html(x.weather.current_observation.display_location.state_name);
      $('#temp-display').html(x.weather.current_observation.temp_f + "&#176;");
      $('#current-status-display').html(x.weather.current_observation.weather);
      $('#status-image').attr('src', x.weather.current_observation.icon_url);
      $('.input-item').slideUp();
      $('#display-info-container').animate({height: "275px"}, 500).css('border', '1px solid black');
      $('#display-input-container').fadeIn(1000);
      $('#result-container').fadeIn(1000);
      $('#display-submit-button').on("click", WeatherApp.refreshWeatherInfo);
    },

    // Refresh results
    refreshWeatherInfo: function(){
      $('#display-submit-button').off("click");
      WeatherApp.currentZip = null;
      var url = "/weather_call";
      var zip_code = $('#display-zip-input').val();
      if (zip_code.length !== 5){
        alert("Please enter a 5-digit zip code");
        return false
      }
      $.ajax({
        url: url,
        data: {
          zip: zip_code
        },
        method: "GET",
        dataType: "json"
      }).done(function(new_data){
        console.log(new_data);
        WeatherApp.displayResults(new_data);
      }).fail(function(){
        console.log("*** ajax fail ***");
      }).error(function() {
        console.log("*** ajax error ***");
      });
    },
  }
  WeatherApp.init();
});
