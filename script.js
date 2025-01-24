document
  .getElementById("weatherForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const city = document.getElementById("cityInput").value;
    const apiKey = "2177e20fe8b4492dabc03628251801"; // Replace with your WeatherAPI key
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
    const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&aqi=no&alerts=no`;

    // Display loading message
    document.getElementById("weatherResult").innerHTML = "<p>Loading...</p>";
    document.getElementById("forecastResult").innerHTML = "";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.location) {
          const weatherData = `
                    <h2>${data.location.name}, ${data.location.country}</h2>
                    <p>Temperature: ${data.current.temp_c} °C</p>
                    <p>Weather: ${data.current.condition.text}</p>
                    <p>Humidity: ${data.current.humidity}%</p>
                    <p>Wind Speed: ${data.current.wind_kph} kph</p>
                    <img src="${data.current.condition.icon}" alt="${data.current.condition.text}">
                `;
          document.getElementById("weatherResult").innerHTML = weatherData;
        } else {
          document.getElementById(
            "weatherResult"
          ).innerHTML = `<p>${data.error.message}</p>`;
        }
      })
      .catch((error) => {
        document.getElementById(
          "weatherResult"
        ).innerHTML = `<p>Error fetching data</p>`;
      });

    fetch(forecastUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.forecast) {
          let forecastData = "<h3>3-Day Forecast</h3>";
          data.forecast.forecastday.forEach((day) => {
            forecastData += `
              <div class="forecast-day">
                <div>${day.date}</div>
                <div>${day.day.avgtemp_c} °C</div>
                <div><img src="${day.day.condition.icon}" alt="${day.day.condition.text}"></div>
              </div>
            `;
          });
          document.getElementById("forecastResult").innerHTML = forecastData;
        }
      })
      .catch((error) => {
        document.getElementById(
          "forecastResult"
        ).innerHTML = `<p>Error fetching forecast data</p>`;
      });
  });
