function displayTemperature(response){
    console.log(response);
    console.log(response.data.main.temp);
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let feelsLikeElement = document.querySelector("#feelsLike");
    let feelsLikeTemperature = Math.round(response.data.main.feels_like);
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#windSpeed");
    let windSpeed = Math.round(response.data.wind.speed);
    
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    feelsLikeElement.innerHTML = `${feelsLikeTemperature}`;
    humidityElement.innerHTML = `${response.data.main.humidity}`;
    windSpeedElement.innerHTML = `${windSpeed}`;
    
    console.log(response.data.weather[0].description);
}

let apiKey = "33ab5beffc1f84edf84d559d33e4f095";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;

console.log(apiUrl);

axios.get(apiUrl).then(displayTemperature);


