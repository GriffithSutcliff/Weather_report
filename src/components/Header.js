import React, { useState } from 'react';

function Header() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const handleInputChange = (event) => {
      setCity(event.target.value);
      fetchWeatherData(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (city.trim() !== '') {
            fetchWeatherData(city);
          }
    };

    const fetchWeatherData = (city) => {
    fetch(`http://api.weatherapi.com/v1/current.json?key=e4e3e0e269e54db8b3490405242503&q=${city}&aqi=no`)
          .then(response => response.json())
          .then(data => {
            setWeatherData(data);
          })
          .catch(error => console.error('Ошибка при получении данных о погоде:', error));
      };
      //<h2>Погода в городе {weatherData.location.name}</h2>
  return (
    <div className='info'>
        <form onSubmit={handleSubmit}>
        <input className='city' placeholder='Введите название города' value={city} onChange={handleInputChange}></input>
        </form>
        <div className='weather'>
        <h2>Погода в городе {weatherData && weatherData.location &&(weatherData.location.name)}</h2>
          <p>Температура: {weatherData && weatherData.location &&(`${weatherData.current.temp_c}°C`)}</p>
          <p>Ощущается как:{weatherData && weatherData.location &&(`${weatherData.current.feelslike_c}°C`)}</p>
          <p>Ветер: {weatherData && weatherData.location &&(`${Math.floor(weatherData.current.wind_kph / 3600 * 1000)}м/с`)}</p>
        </div>
      <div className='background'></div>
    </div>
  )
}

export default Header