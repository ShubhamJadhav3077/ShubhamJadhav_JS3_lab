const input = document.querySelector("input")

input.addEventListener("keypress", setSearch)

function setSearch(event) {
    if (event.keyCode == 13) {
        getDataFromWeatherApi(input.value)
    }
}

function getDataFromWeatherApi(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=7e3f21edee540e6110af347b55eb1ab2`)
        .then(res => res.json())
        .then(res => displayResults(res));
}

function displayResults(weatherData) {
    let city = document.querySelector(".city")
    city.innerText = `${weatherData.name}, ${weatherData.sys.country}`

    let temperature = document.querySelector(".temperature")
    temperature.innerText = `${Math.round(weatherData.main.temp)}°C`


    let now = new Date();
    let date = document.querySelector('.date');
    date.innerText = dateBuilder(now);

    let weather = document.querySelector(".weather")
    weather.innerText = weatherData.weather[0].main

    let hiLow = document.querySelector(".hilow")
    hiLow.innerText = `${Math.round(weatherData.main.temp_min)}°C/ ${Math.round(weatherData.main.temp_max)}°C`


}

function dateBuilder(today) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[today.getDay()];
    let date = today.getDate();
    let month = months[today.getMonth()];
    let year = today.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}