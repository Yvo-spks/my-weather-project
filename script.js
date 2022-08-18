function searchResult(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-cities");
  let cityTitle = document.querySelector("#city-name");
  let date = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let day = days[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();

  let currentDate = document.querySelector("#current-date");

  if (searchInput.value) {
    cityTitle.innerHTML = `${searchInput.value}`;
    currentDate.innerHTML = ` ${day} ${hours} : ${minutes}`;
  }
}

let searchIcon = document.querySelector("#search-icon");
searchIcon.addEventListener("click", searchResult);

function formatDate(timestamp) {
 let currentDate = new Date(timestamp);
 let hours = currentDate.getHours();
 if (hours < 10) {
  minutes = `0${hours}`;
 }
 let minutes = currentDate.getMinutes();
 if (minutes < 10) {
  minutes = `0${minutes}`;
 }
 let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
 let day =days[currentDate.getDay()];

 return `${day} ${hours}:${minutes}`; 
}

function showTemperature(response) {

  let currentTempElement = document.querySelector("#change-temp");
  currentTempElement.innerHTML = `${Math.round(response.data.main.temp)} °C`;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);

  let currentCity = document.querySelector("#city-name");
  currentCity.innerHTML = `${response.data.name}`;

  let description = document.querySelector("#temperature-description");
  description.innerHTML = `${response.data.weather[0].main}`;

  let currentDateElement = document.querySelector("#current-date");
  currentDateElement.innerHTML= formatDate(response.data.dt * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  
}
function searchLocation(position) {
  let apiKey = "22600970cc1e19a65b9eea57b485b5ac";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let buttonCurrentLocation = document.querySelector("#current-location-button");
buttonCurrentLocation.addEventListener("click", getCurrentLocation);

function showCity(position) {
  let cityName = document.querySelector("#search-cities");
  let city = cityName.value;
  let apiKey = "22600970cc1e19a65b9eea57b485b5ac";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperature);
}
function searchCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCity);
}

let buttonSearch = document.querySelector("#search-icon");
buttonSearch.addEventListener("click", searchCity);
