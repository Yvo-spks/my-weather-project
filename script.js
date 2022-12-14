function formatDate(timestamp){
  let date = new Date(timestamp);
  let hours = date.getHours();
   if (hours < 10) {
  hours = `0${hours}`;
 }

  let minutes = date.getMinutes();
   if (minutes < 10) {
  minutes = `0${minutes}`;
 }

   let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  let day = days[date.getDay()];
   return `${day} ${hours}:${minutes}`; 
   

}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed","Thur","Fri", "Sat"];

  return days[day];

}

function displayForecast(response) {
let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHtml= `<div class="row">`;
  let days= ["Thurs","Fri", "Sat", "Sun", "Mon"];
  forecast.forEach(function(forecastDay, index){
    if(index < 6) {

    forecastHtml= forecastHtml + `
    <div class="col-2">
       ${formatDay(forecastDay.dt)} <br>
        <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
            alt="" width=45>
            <br>
            
                ${Math.round(forecastDay.temp.max)}°|${Math.round(forecastDay.temp.min)}° <br>

            </div> `;
            }

     });
  

    forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML= forecastHtml;

}

function getForecast(coordinates) {
  
let apiKey = "22600970cc1e19a65b9eea57b485b5ac";
let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast)
}

function showTemperature(response) {
let temperatureElement = document.querySelector("#temperature");
let cityElement = document.querySelector("#city")
let descriptionElement = document.querySelector("#description");
let humidity = document.querySelector("#humidity");
let wind = document.querySelector("#wind");
let dateElement = document.querySelector("#date");
let iconElement = document.querySelector("#icon")



celsiusTemperature = response.data.main.temp

temperatureElement.innerHTML = Math.round(celsiusTemperature);
cityElement.innerHTML = response.data.name;
descriptionElement.innerHTML= response.data.weather[0].description;
humidity.innerHTML = response.data.main.humidity;
wind.innerHTML = Math.round(response.data.wind.speed);
dateElement.innerHTML= formatDate(response.data.dt * 1000)
iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
iconElement.setAttribute("alt",response.data.weather[0].description);

getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "22600970cc1e19a65b9eea57b485b5ac";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
axios.get(apiUrl).then(showTemperature)
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value)
  
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenhietLink.classList.add("active");
let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
 temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showcelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenhietLink.classList.remove("active");
temperatureElement.innerHTML = Math.round(celsiusTemperature);
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


let celsiusTemperature = null;

let buttonCurrentLocation = document.querySelector("#current-location-button");
buttonCurrentLocation.addEventListener("click", getCurrentLocation);

let form = document.querySelector("#search-form");
form.addEventListener("submit",handleSubmit);

let fahrenhietLink = document.querySelector("#fahrenheit-link");
fahrenhietLink.addEventListener("click",showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click",showcelsiusTemperature);

search("Rome");