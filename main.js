import "./globals.css";

window.addEventListener("load", () => {
  let temperature = document.querySelector(".weather__temperature");

  async function getLocation() {
    const response = await fetch("https://geolocation-db.com/json/");
    const data = await response.json();
    return data.city;
  }

  async function getWeather(location) {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=c3a589ab814f42b1af174406221401&q=${location}&aqi=no`
    );
    const data = await response.json();
    return data;
  }

  async function getData() {
    const location = await getLocation();
    const weatherData = await getWeather(location);

    if (temperature) {
      console.log(weatherData, "hi");
      temperature.textContent = weatherData.current.temp_c;
    } else {
      temperature.textContent("Temporarily unavailable");
    }
  }

  getData();
});
