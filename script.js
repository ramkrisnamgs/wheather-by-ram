// Replace this with your own API key
const apiKey = "7a59b87496b1b5bc1298c8d22bde943c";

// Get the weather element from the HTML document
const weather = document.getElementById("weather");

// Define a function to fetch and display the weather data
function getWeather() {
  // Get the user's current location using the Geolocation API
  navigator.geolocation.getCurrentPosition(function(position) {
    // Get the latitude and longitude from the position object
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    // Construct the API URL with the parameters
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly,daily,alerts&appid=${apiKey}`;

    // Use the fetch API to get the weather data from the URL
    fetch(url)
      .then(function(response) {
        // Check if the response is ok
        if (response.ok) {
          // Return the response as JSON
          return response.json();
        } else {
          // Throw an error with the status text
          throw new Error(response.statusText);
        }
      })
      .then(function(data) {
        // Get the current weather data from the JSON object
        let temp = data.current.temp; // Temperature in Celsius
        let feels_like = data.current.feels_like; // Feels like temperature in Celsius
        let humidity = data.current.humidity; // Humidity in percentage
        let wind_speed = data.current.wind_speed; // Wind speed in meters per second
        let weather_main = data.current.weather[0].main; // Weather condition (e.g. Clouds, Rain, etc.)
        let weather_icon = data.current.weather[0].icon; // Weather icon code (e.g. 01d, 02n, etc.)

        // Display the weather data in the HTML element
        weather.innerHTML = `
          <p>Current weather: ${weather_main}</p>
          <img src="https://openweathermap.org/img/wn/${weather_icon}.png" alt="${weather_main}">
          <p>Temperature: ${temp} °C</p>
          <p>Feels like: ${feels_like} °C</p>
          <p>Humidity: ${humidity} %</p>
          <p>Wind speed: ${wind_speed} m/s</p>
        `;
      })
      .catch(function(error) {
        // Display the error message in the HTML element
        weather.innerHTML = `<p>Error: ${error.message}</p>`;
      });
  });
}

// Call the function when the script is loaded
getWeather();