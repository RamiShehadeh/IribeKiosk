async function fetchWeather() {
    const apiKey = 'f813af299d2f15042199aaf34029ed6c';
    const city = 'College Park'; // Replace with your desired city
    const units = 'imperial'; // 'metric' for Celsius, 'imperial' for Fahrenheit

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`);
        const data = await response.json();

        if (data.cod === 200) {
            displayWeatherData(data);
        } else {
            console.error('Error fetching weather data:', data.message);
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayWeatherData(data) {
    const weatherDataElement = document.getElementById('weather-data');

    const temp = data.main.temp;
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const cityName = data.name;

    weatherDataElement.innerHTML = `
        <h2>${cityName}</h2>
        <img src="http://openweathermap.org/img/wn/${icon}.png" alt="${description}" />
        <p>${temp}°F</p>
        <p>${description}</p>
    `;
}

document.addEventListener('DOMContentLoaded', fetchWeather);
