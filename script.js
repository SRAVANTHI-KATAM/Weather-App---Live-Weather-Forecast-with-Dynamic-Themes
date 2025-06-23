const apiKey = "87f58183d7177c24a35e5c294ab04836";
const weatherResult = document.getElementById("weatherResult");
const container = document.getElementById("container");
const body = document.getElementById("body");

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    weatherResult.innerHTML = "Please enter a city name.";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error("City not found or API key invalid");
      return res.json();
    })
    .then(data => {
      const { name, main, weather, wind } = data;
      const condition = weather[0].main.toLowerCase();

      // Theme switching based on condition
      body.className = ""; // Reset
      if (condition.includes("cloud")) {
        body.classList.add("cloudy");
      } else if (condition.includes("rain")) {
        body.classList.add("rainy");
      } else if (condition.includes("clear") || condition.includes("sun")) {
        body.classList.add("sunny");
      }

      weatherResult.innerHTML = `
        <h2>${name}</h2>
        <p><strong>${weather[0].description}</strong></p>
        <p>🌡️ Temp: ${main.temp} °C</p>
        <p>💧 Humidity: ${main.humidity}%</p>
        <p>🌬️ Wind: ${wind.speed} m/s</p>
      `;
    })
    .catch(err => {
      weatherResult.innerHTML = err.message;
    });
}
