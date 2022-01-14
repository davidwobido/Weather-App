import "./globals.css";

window.addEventListener("load", () => {
  let temperature = document.querySelector(".weather__temperature");
  let description = document.querySelector(".weather__description");
  let feelsLike = document.querySelector(".weather__feels");
  let city = document.querySelector(".location__city");
  let country = document.querySelector(".location__country");
  let icon = document.querySelector(".icon");
  let tempStatus;

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
      const { temp_c, condition, feelslike_c } = weatherData.current;
      temperature.textContent = temp_c;
      description.textContent = condition.text;
      feelsLike.textContent = `Feels like ${feelslike_c} °C`;
      city.textContent = weatherData.location.name;
      country.textContent = weatherData.location.country;
      tempStatus = feelslike_c;
    } else {
      temperature.textContent("Temporarily unavailable");
    }
  }

  function setIcon() {
    console.log("start");
    console.log("tempStatus", tempStatus);

    if (tempStatus) {
      if (tempStatus < 7) {
        icon.textContent = "Beanie";
      } else if (tempStatus >= 7 && tempStatus < 15) {
        icon.textContent = "Jacket";
      } else if (tempStatus >= 15 && tempStatus < 24) {
        icon.textContent = "Pullover";
      } else if (tempStatus >= 24) {
        icon.textContent = "Shirt";
      }
    } else {
      icon.textContent(":-(");
    }
  }

  getData().then(setIcon);
});
