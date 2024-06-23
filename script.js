// Replace 'YOUR_API_KEY' with your OpenWeatherMap API key
// Replace 'YOUR_API_KEY' with your OpenWeatherMap API key
// Replace 'YOUR_API_KEY' with your OpenWeatherMap API key
const apiKey = '4f04f8da6f88084ce7ba7737f2446e3e';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

function searchWeather() {
  const city = document.getElementById('searchInput').value.trim();
  if (city === '') {
    alert('Please enter a city name');
    return;
  }
  const url = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    })
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      alert('City not found. Please enter a valid city name.');
    });
}

function displayWeather(data) {
  const weatherInfo = document.getElementById('weatherInfo');
  weatherInfo.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p>${data.weather[0].description}</p>
    <p>Temperature: ${data.main.temp} °C</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Wind Speed: ${data.wind.speed} m/s</p>
    <i class="weather-icon fas fa-3x fa-${getWeatherIcon(data.weather[0].icon)}"></i>
  `;
}

function getWeatherIcon(iconCode) {
  switch (iconCode) {
    case '01d':
      return 'sun';
    case '01n':
      return 'moon';
    case '02d':
    case '02n':
      return 'cloud-sun';
    case '03d':
    case '03n':
      return 'cloud';
    case '04d':
    case '04n':
      return 'cloud-meatball';
    case '09d':
    case '09n':
      return 'cloud-showers-heavy';
    case '10d':
    case '10n':
      return 'cloud-sun-rain';
    case '11d':
    case '11n':
      return 'bolt';
    case '13d':
    case '13n':
      return 'snowflake';
    case '50d':
    case '50n':
      return 'smog';
    default:
      return 'question-circle';
  }
}
