 // Replace with your API key
 const weatherApiKey = '39ea414a0d39495fa2d41341231004';

 // Define the location for which you want to fetch the weather data
 const city = 'College Park';
 const region = 'Maryland';
 const country = 'USA';

 // Fetch and display the weather data
 function fetchWeather() {
     $.getJSON(`https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${city},${region},${country}`, function (data) {
         $('#location').text(`${data.location.name}, ${data.location.region}`);
         $('#temperature').text(`${Math.round(data.current.temp_f)}°F (${Math.round(data.current.temp_c)}°C)`);
         $('#condition').text(`${data.current.condition.text}`);
         $('#weather-icon').attr('src', `https:${data.current.condition.icon}`);
     });
 }

 fetchWeather();