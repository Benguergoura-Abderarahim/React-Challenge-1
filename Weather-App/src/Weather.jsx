import { useEffect } from "react";
import { secondsToTime } from "./utils"; // Importing utility function from utils.js

// make an arrow function for our previous js code as we use useEffect(): display initial render for the page
const Forecast = () => {
  useEffect(() => {
    const weatherButton = document.getElementById("get-weather-btn");
    let cityList;
    let option;

    fetch(
      "https://raw.githubusercontent.com/lmfmaier/cities-json/master/cities500.json"
    )
      .then((response) => response.json())
      .then((data) => {
        const filteredCities = data.filter((city) => city.pop > 1000000);
        cityList = document.getElementById("city-list");

        filteredCities.forEach((city) => {
          option = document.createElement("option");
          const latitude = parseFloat(city.lat).toFixed(4);
          const longitude = parseFloat(city.lon).toFixed(4);
          option.value = `${latitude}, ${longitude}`;
          option.textContent = city.name;
          cityList.appendChild(option);
        });

        weatherButton.addEventListener("click", () => {
          const selectedCity = cityList.value.split(",");
          const latitude = parseFloat(selectedCity[0]).toFixed(4);
          const longitude = parseFloat(selectedCity[1]).toFixed(4);

          fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,is_day,cloud_cover,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,apparent_temperature,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration`
          )
            .then((response) => response.json())
            .then((weatherData) => {
              const currentWeather = weatherData.current;
              const isDayText = currentWeather.is_day
                ? 'Yes <i class="fa-regular fa-sun"></i>'
                : 'No <i class="fa-regular fa-moon"></i>';
              let cloudCoverLabel;
              if (currentWeather.cloud_cover >= 65) {
                cloudCoverLabel = '<i class="fa-solid fa-cloud"></i>';
              } else if (currentWeather.cloud_cover >= 35) {
                cloudCoverLabel = '<i class="fa-solid fa-cloud-sun"></i>';
              } else {
                cloudCoverLabel = '<i class="fa-solid fa-sun"></i>';
              }

              const currentWeatherData = `<b>Temperature <i class="fa-solid fa-temperature-full"></i>: </b> ${currentWeather.temperature_2m}°C<br>
                <b>Apparent Temperature <i class="fa-solid fa-temperature-high"></i>: </b> ${currentWeather.apparent_temperature}°C<br>
                <b>Is Day: </b> ${isDayText}<br>
                <b>Cloud Cover ${cloudCoverLabel} : </b> ${currentWeather.cloud_cover} <br>
                <b>Wind Speed <i class="fa-solid fa-wind"></i> : </b> ${currentWeather.wind_speed_10m} m/s<br>
                <b>Wind Direction <i class="fa-solid fa-location-arrow"></i> : </b> ${currentWeather.wind_direction_10m}°<br>`;
              document.getElementById("current-weather").innerHTML =
                currentWeatherData;

              const daily = weatherData.daily;
              const forecastContainer = document.getElementById("forecast");
              forecastContainer.innerHTML = "";

              daily.time.forEach((timestamp, index) => {
                const forecastItem = document.createElement("div");
                forecastItem.classList.add("forecast-item");
                forecastItem.innerHTML = `<u><b>Date:</b> ${timestamp}</u><br>
                <b>Max Temperature <i class="fa-solid fa-temperature-full"></i> :</b> ${
                  daily.temperature_2m_max[index]
                }°C<br>
                <b>Min Temperature <i class="fa-solid fa-temperature-empty"></i> :</b> ${
                  daily.temperature_2m_min[index]
                }°C<br>
                <b>Apparent Max Temperature <i class="fa-solid fa-temperature-high"></i> :</b> ${
                  daily.apparent_temperature_max[index]
                }°C<br>
                <b>Apparent Min Temperature <i class="fa-solid fa-temperature-low"></i> :</b> ${
                  daily.apparent_temperature_min[index]
                }°C<br>
                <b>Sunrise <span class="mdi mdi-weather-sunset-up"></span> :</b> ${
                  daily.sunrise[index]
                }<br>
                <b>Sunset <span class="mdi mdi-weather-sunset-down"></span> :</b> ${
                  daily.sunset[index]
                }<br>
                <b>Daylight Duration <i class="fa-solid fa-hourglass-start"></i> :</b> ${secondsToTime(
                  daily.daylight_duration[index]
                )} <br>
                <b>Sunshine Duration <i class="fa-solid fa-hourglass-end"></i> :</b> ${secondsToTime(
                  daily.sunshine_duration[index]
                )} `;
                forecastContainer.appendChild(forecastItem);
              });
            })
            .catch((error) => {
              console.error("Error fetching weather data:", error);
            });
        });
      })
      .catch((error) => {
        console.error("Error fetching city data:", error);
      });
  }, []); // []: called dependency, empty means effect runs only once after initial render -optional argument to useEffect-

  return null; // Render nothing directly from this component
};

export default Forecast;
