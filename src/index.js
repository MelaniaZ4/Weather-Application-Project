

function formatDate (time){
    let days = [
        "Sunday",
        "Monday", 
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ]
    let date = new Date(time);
    let hours = date.getHours();
    if (hours < 10) {
    hours = `0${hours}`;    
} 
    let minutes = date.getMinutes();
    if (minutes < 10) {
    minutes = `0${minutes}`;
}
    let day = days[date.getDay()];

    return `${day} ${hours}:${minutes}`;
}

function formatHours(timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
    hours = `0${hours}`;    
} 
    let minutes = date.getMinutes();
    if (minutes < 10) {
    minutes = `0${minutes}`;

    return `${hours}:${minutes}`;
}
}

function formatDays(timestamp){
    let date = new Date(timestamp);
    let days = [
        "Sun",
        "Mon", 
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    ]
    let day = days[date.getDay()];

    return `${day}`;
}   

function displayTemperature(response){
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let feelsLikeElement = document.querySelector("#feelsLike");
    let feelsLikeTemperature = Math.round(response.data.main.feels_like);
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#windSpeed");
    let windSpeed = Math.round(response.data.wind.speed);
    let dateElement = document.querySelector("#date");
    let weatherIcon = document.querySelector("#weather-icon");

    celsiusTemperature = response.data.main.temp;
   
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    feelsLikeElement.innerHTML = `${feelsLikeTemperature}`;
    humidityElement.innerHTML = `${response.data.main.humidity}`;
    windSpeedElement.innerHTML = `${windSpeed}`;
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    weatherIcon.setAttribute("src", 
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    weatherIcon.setAttribute("alt", 
    response.data.weather[0].description);
    
}

function handleSubmit(event){
    event.preventDefault(); 
    let cityInputElement = document.querySelector("#city-input");
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = `${cityInputElement.value}`;
    search(cityInputElement.value);
}

function displayForecast(response){
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = null;
    let forecast = null;
    
    for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2">
                        <h3 class="forecast-day">
                            ${formatDays(forecast.dt * 1000)}
                            ${formatHours(forecast.dt * 1000)}
                        </h3>
                        <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="sunny" id="day1-icon">
                        <div class="weather-forecast-temperature">
                            <strong id="temperature-high">
                                ${Math.round(forecast.main.temp_max)}°
                            </strong>   
                            <span id="temperature-low">
                                ${Math.round(forecast.main.temp_min)}°
                            </span>
                        </div>
                    </div>
                    `;
}
    }

function search(city){
    let apiKey = "33ab5beffc1f84edf84d559d33e4f095";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

function convertToCelsius(event){
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    let fahrenheitTemperature = Math.round((celsiusTemperature * 9/5) + 32);
    temperatureElement.innerHTML = fahrenheitTemperature;
    celsiusElement.classList.remove("active");
    fahrenheitElement.classList.add("active");

}

function convertToFahrenheit(event){
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    let celsiusElement = document.querySelector("#celsius");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    celsiusElement.classList.add("active");
    fahrenheitElement.classList.remove("active");
}


let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("New York");


let celsiusTemperature = null
let celsiusElement = document.querySelector("#celsius");
let fahrenheitElement = document.querySelector("#fahrenheit");
fahrenheitElement.addEventListener("click", convertToCelsius);

let celsius = document.querySelector("#celsius");
celsiusElement.addEventListener("click", convertToFahrenheit);
