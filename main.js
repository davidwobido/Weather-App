import "./globals.css";

window.addEventListener("load", () => {
  let temperature = document.querySelector(".weather__temperature");
  let description = document.querySelector(".weather__description");
  let feelsLike = document.querySelector(".weather__feels");
  let tempAverage = document.querySelector(".weather_average");
  let tempMax = document.querySelector(".weather__max");
  let tempMin = document.querySelector(".weather__min");
  let city = document.querySelector(".location__city");
  let country = document.querySelector(".location__country");
  let date = document.querySelector(".location__date");
  let icon = document.querySelector(".clothing__icon");
  let text = document.querySelector(".clothing__text");
  let tempStatus;

  async function getLocation() {
    const response = await fetch("https://geolocation-db.com/json/");
    const data = await response.json();
    return data.city;
  }

  async function getWeather(location) {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=c3a589ab814f42b1af174406221401&q=${location}&days=4&aqi=no&alerts=no`
    );
    const data = await response.json();
    return data;
  }

  async function setData() {
    const location = await getLocation();
    const weatherData = await getWeather(location);

    if (temperature) {
      const { temp_c, condition, feelslike_c } = weatherData.current;
      temperature.textContent = `${temp_c}°`;
      description.textContent = condition.text;
      feelsLike.textContent = `${feelslike_c} °C`;
      city.textContent = weatherData.location.name;
      country.textContent = weatherData.location.country;
      tempStatus = feelslike_c;
      date.textContent = weatherData.forecast.forecastday[0].date;
    } else {
      temperature.textContent("Temporarily unavailable");
    }

    function setMinMax() {
      if (temperature) {
        const { maxtemp_c, mintemp_c, avgtemp_c } =
          weatherData.forecast.forecastday[0].day;
        tempAverage.textContent = `${avgtemp_c} °C`;
        tempMax.textContent = `${maxtemp_c} °C`;
        tempMin.textContent = `${mintemp_c} °C`;
      }
    }
    setMinMax();

    function setDescription() {
      if (tempStatus) {
        if (tempStatus < 7) {
          icon.src = "/lib/04_Scarf.svg";
          text.textContent = `You should put on very warm clothes. ${
            weatherData.forecast.forecastday[0].day.daily_will_it_rain
              ? "Don't forget your umbrella."
              : ""
          }`;
        } else if (tempStatus >= 7 && tempStatus < 15) {
          icon.src = "/lib/03_Jacket.svg";
          text.textContent = `You don't need a scarf today, I think. ${
            weatherData.forecast.forecastday[0].day.daily_will_it_rain
              ? "Don't forget your umbrella"
              : ""
          }`;
        } else if (tempStatus >= 15 && tempStatus < 24) {
          icon.src = "/lib/02_Sweater.svg";
          text.textContent = `A Sweater would be the best choice today. ${
            weatherData.forecast.forecastday[0].day.daily_will_it_rain
              ? "Don't forget your umbrella"
              : ""
          }`;
        } else if (tempStatus >= 24) {
          icon.src = "/lib/01_Shirt.svg";
          text.textContent = `Best to wear today: A T-Shirt. ${
            weatherData.forecast.forecastday[0].day.daily_will_it_rain
              ? "Don't forget your umbrella"
              : ""
          }`;
        }
      } else {
        icon.textContent(":-(");
      }
    }
    setDescription();
  }

  setData();
});
