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



function showTemperature(response) {
let temperatureElement = document.querySelector("#temperature");
let cityElement = document.querySelector("#city")
let descriptionElement = document.querySelector("#description");
let humidity = document.querySelector("#humidity");
let wind = document.querySelector("#wind");
let dateElement = document.querySelector("#date");
let iconElement = document.querySelector("#icon")

temperatureElement.innerHTML = `${Math.round(response.data.main.temp)}`
cityElement.innerHTML = response.data.name;
descriptionElement.innerHTML= response.data.weather[0].description;
humidity.innerHTML = response.data.main.humidity;
wind.innerHTML = Math.round(response.data.wind.speed);
dateElement.innerHTML= formatDate(response.data.dt * 1000)
iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
iconElement.setAttribute("alt",response.data.weather[0].description);
}


let apiKey = "22600970cc1e19a65b9eea57b485b5ac";
let city = "Scandiano"
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`


axios.get(apiUrl).then(showTemperature)