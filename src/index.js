

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
    console.log(cityInputElement.value);
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = `${cityInputElement.value}`;
    search(cityInputElement.value);
}

function search(city){
    let apiKey = "33ab5beffc1f84edf84d559d33e4f095";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}


let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("New York");