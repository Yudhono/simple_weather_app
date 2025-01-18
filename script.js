document
  .getElementById("weatherForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const city = document.getElementById("cityInput").value;
    const apiKey = "2177e20fe8b4492dabc03628251801"; // Replace with your WeatherAPI key
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    // Display loading message
    document.getElementById("weatherResult").innerHTML = "<p>Loading...</p>";

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
  });
