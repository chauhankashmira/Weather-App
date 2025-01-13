
const API_KEY = '3f77cdfab167bb5fa7718395108a214e'; // Replace with your OpenWeatherMap API key

async function getWeather() {
    const city = document.getElementById('city').value.trim();
    const weatherDetails = document.getElementById('weather-details');

    if (!city) {
        weatherDetails.innerHTML = "<p>Please enter a city name.</p>";
        return;
    }

    weatherDetails.innerHTML = "<p>Loading...</p>";

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("City not found. Please check the city name.");
            }
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const { name, main, weather } = data;

        weatherDetails.innerHTML = `
            <p><strong>City:</strong> ${name}</p>
            <p><strong>Temperature:</strong> ${main.temp}°C</p>
            <p><strong>Condition:</strong> ${weather[0].description}</p>
        `;
    } catch (error) {
        weatherDetails.innerHTML = `<p>${error.message}</p>`;
    }
}
