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

function getApiWeather(city) {
  let apiKey = "589d4e7caa7d5afe2a7829afb0f2fcbf";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
  console.log(apiUrl);
}
function showTemperature(response) {
  let temp = Math.round(response.data.main.temp);
  let showTemp = document.querySelector("#main-temperature");
  showTemp.innerHTML = `${temp}`;
  let wind = Math.round(response.data.wind.speed);
  console.log(wind);
  let showWind = document.querySelector("#main-wind");
  showWind.innerHTML = `${wind}`;
  let humidity = Math.round(response.data.main.humidity);
  console.log(humidity);
  let showHumidity = document.querySelector("#main-humidity");
  showHumidity.innerHTML = `${humidity}`;
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
