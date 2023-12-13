const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

function searchWeather() {
    const searchInput = document.getElementById('searchInput').value;

    if (searchInput) {
        const fullUrl = `${apiUrl}?q=${searchInput}&appid=${apiKey}`;

        fetch(fullUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.cod && data.cod !== '404') {
                    displayWeather(data);
                } else {
                    throw new Error(`City not found: ${searchInput}`);
                }
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                alert('Error fetching weather data. Please check the city name and try again.');
            });
    } else {
        alert('Please enter a country to search.');
    }
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = '';

    const cityName = data.name;
    const country = data.sys.country;
    const temperature = (data.main.temp - 273.15).toFixed(2);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    const weatherHtml = `
        <h2>${cityName}, ${country}</h2>
        <p>${description}</p>
        <p>Temperature: ${temperature} &#8451;</p>
        <img src="http://openweathermap.org/img/wn/${icon}.png" alt="${description} icon">
    `;

    weatherInfo.innerHTML = weatherHtml;
}
