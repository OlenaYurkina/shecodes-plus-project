//In your project, display the current date and time using JavaScript: Tuesday 16:00
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  function padTo2Digits(num) {
    return String(num).padStart(2, "0");
  }
  let hoursAndMinutes =
    padTo2Digits(date.getHours()) + ":" + padTo2Digits(date.getMinutes());
  let currentDay = days[date.getDay()];

  let formatedDate = `${currentDay}, ${hoursAndMinutes}`;
  return formatedDate;
}

let currentDate = document.querySelector("#date-right");
currentDate.innerHTML = formatDate(new Date());

function formatCalendar(date) {
  let calendarYear = date.getFullYear();
  let calendarDate = date.getDate();
  if (calendarDate < 10) {
    calendarDate = `0${calendarDate}`;
  }

  let months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  let calendarMonth = months[date.getMonth()];

  let formatCalendar = `${calendarDate}.${calendarMonth}.${calendarYear}`;
  return formatCalendar;
}

let currentCalendar = document.querySelector("#date-left");

currentCalendar.innerHTML = formatCalendar(new Date());

//Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
               <div class="weather-day"> <strong> ${formatDay(
                 forecastDay.dt
               )} </strong> </div>
               <div class="weather-day-icon"> <img src="http://openweathermap.org/img/wn/${
                 forecastDay.weather[0].icon
               }@2x.png" alt="" width="55"/> </div>
               <div class="weather-day-temp">  ${Math.round(
                 forecastDay.temp.eve
               )}??C  </div>
            </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getApiWeather(city) {
  let apiKey = "589d4e7caa7d5afe2a7829afb0f2fcbf";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTemperature);
}

function getForecast(coordinates) {
  let apiKey = "589d4e7caa7d5afe2a7829afb0f2fcbf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let temp = Math.round(response.data.main.temp);
  celsiusTemp = response.data.main.temp;
  let showTemp = document.querySelector("#main-temperature");
  showTemp.innerHTML = `${temp}`;
  let wind = Math.round(response.data.wind.speed);
  let showWind = document.querySelector("#main-wind");
  showWind.innerHTML = `${wind}`;
  let humidity = Math.round(response.data.main.humidity);
  let showHumidity = document.querySelector("#main-humidity");
  showHumidity.innerHTML = `${humidity}`;
  let description = response.data.weather[0].description;
  let showDescription = document.querySelector("#main-description");
  showDescription.innerHTML = `${description}`;

  let iconMainElement = document.querySelector("#icon-main");
  iconMainElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function searchCity(event) {
  event.preventDefault();

  let mainCity = document.querySelector("#main-city");
  let cityInput = document.querySelector("#city-input");
  getApiWeather(cityInput.value);
  if (cityInput.value) {
    mainCity.innerHTML = `${cityInput.value}`;
  } else {
    mainCity.innerHTML = null;
  }
}
let formCity = document.querySelector("#search-city");
formCity.addEventListener("submit", searchCity);

function displayCurrentForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
               <div class="weather-day"> <strong>  ${formatDay(
                 forecastDay.dt
               )}  </strong> </div>
               <div class="weather-day-icon"> <img src="http://openweathermap.org/img/wn/${
                 forecastDay.weather[0].icon
               }@2x.png" alt="" width="55"/> </div>
               <div class="weather-day-temp">  ${Math.round(
                 forecastDay.temp.eve
               )}??C </div>
            </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getCurrentForecast(coordinates) {
  let apiKey = "589d4e7caa7d5afe2a7829afb0f2fcbf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCurrentForecast);
}

function showCurrentTemperature(response) {
  let currentTemperature = Math.round(response.data.main.temp);
  let showTemp = document.querySelector("#main-temperature");
  showTemp.innerHTML = `${currentTemperature}`;
  let currentCity = response.data.name;
  let targetCity = document.querySelector("#main-city");
  targetCity.innerHTML = `${currentCity}`;
  let currentWind = Math.round(response.data.wind.speed);
  let targetWind = document.querySelector("#main-wind");
  targetWind.innerHTML = `${currentWind}`;
  let currentHumidity = Math.round(response.data.main.humidity);
  let targetHumidity = document.querySelector("#main-humidity");
  targetHumidity.innerHTML = `${currentHumidity}`;
  let currentDescription = response.data.weather[0].description;
  console.log(currentDescription);
  let targetDescription = document.querySelector("#main-description");
  targetDescription.innerHTML = `${currentDescription}`;
  let iconMainElement = document.querySelector("#icon-main");
  iconMainElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getCurrentForecast(response.data.coord);
}

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "589d4e7caa7d5afe2a7829afb0f2fcbf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showCurrentTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentPosition);

function showFarenheitTemp(event) {
  event.preventDefault();
  let farenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let tempElement = document.querySelector("#main-temperature");
  tempElement.innerHTML = Math.round(farenheitTemp);
  celsiusLink.classList.remove("active");
  farenheitLink.classList.add("active");
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#main-temperature");
  tempElement.innerHTML = Math.round(celsiusTemp);
  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
}

let farenheitLink = document.querySelector("#farenheit-temp");
farenheitLink.addEventListener("click", showFarenheitTemp);

let celsiusLink = document.querySelector("#celsius-temp");
celsiusLink.addEventListener("click", showCelsiusTemp);

let celsiusTemp = null;

getApiWeather("Lisbon");
