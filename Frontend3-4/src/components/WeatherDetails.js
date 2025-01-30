import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './WeatherDetails.css';

const WeatherDetails = () => {
  const { city } = useParams();
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);
  const [temperatureUnit, setTemperatureUnit] = useState(() => {
    return localStorage.getItem('temperatureUnit') || 'metric';
  });

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const weatherResponse = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
          params: {
            q: `${city},PL`,
            appid: process.env.REACT_APP_WEATHER_API_KEY,
            units: temperatureUnit,
            lang: "pl",
          },
        });
        setWeather(weatherResponse.data);

        const forecastResponse = await axios.get("https://api.openweathermap.org/data/2.5/forecast", {
          params: {
            q: `${city},PL`,
            appid: process.env.REACT_APP_WEATHER_API_KEY,
            units: temperatureUnit,
            lang: "pl",
          },
        });
        setForecast(forecastResponse.data);
      } catch (error) {
        setError("Błąd pobierania danych pogodowych.");
      }
    };

    fetchWeather();
  }, [city, temperatureUnit]);

  const toggleTemperatureUnit = () => {
    const newUnit = temperatureUnit === 'metric' ? 'imperial' : 'metric';
    setTemperatureUnit(newUnit);
    localStorage.setItem('temperatureUnit', newUnit);
  };

  const getRainfall = (forecast) => {
    return forecast.rain ? forecast.rain["3h"] : 0;
  };

  const getSnowfall = (forecast) => {
    return forecast.snow ? forecast.snow["3h"] : 0;
  };

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!weather || !forecast) {
    return <p className="loading-message">Ładowanie danych...</p>;
  }

  return (
    <div className="container">
      <h1>Pogoda w {weather.name}</h1>
      <div className="weather-section">
        <div className="weather-info">
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
          <div>
            <p><strong>Temperatura:</strong> {weather.main.temp}{temperatureUnit === 'metric' ? '°C' : '°F'}</p>
            <p><strong>Warunki:</strong> {weather.weather[0].description}</p>
            <p><strong>Wiatr:</strong> {weather.wind.speed} {temperatureUnit === 'metric' ? 'm/s' : 'mph'} ({weather.wind.deg}°)</p>
            <p><strong>Zachmurzenie:</strong> {weather.clouds.all}%</p>
            <p><strong>Opady:</strong> {getRainfall(weather)} mm deszczu, {getSnowfall(weather)} mm śniegu</p>
          </div>
        </div>
      </div>

      <div className="temperature-toggle">
        <button onClick={toggleTemperatureUnit}>
          Zmień jednostkę temperatury ({temperatureUnit === 'metric' ? '°C' : '°F'})
        </button>
      </div>

      <div className="forecast-section">
        <h2>Prognoza na 5 dni</h2>
        <ul>
          {forecast.list.slice(0, 40).map((item, index) => (
            <li key={index} className="forecast-item">
              <p><strong>Data:</strong> {new Date(item.dt * 1000).toLocaleDateString()}</p>
              <p><strong>Godzina:</strong> {new Date(item.dt * 1000).toLocaleTimeString()}</p>
              <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt={item.weather[0].description} />
              <p><strong>Temp:</strong> {item.main.temp} {temperatureUnit === 'metric' ? '°C' : '°F'}</p><p></p>
              <p><strong>Warunki:</strong> {item.weather[0].description}</p>
              <p><strong>Opady:</strong> {item.pop * 100}%</p>
              <p><strong>Wiatr:</strong> {item.wind.speed} {temperatureUnit === 'metric' ? 'm/s' : 'mph'} ({item.wind.deg}°)</p>
              <p><strong>Opady deszczu:</strong> {getRainfall(item)} mm</p>
              <p><strong>Opady śniegu:</strong> {getSnowfall(item)} mm</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WeatherDetails;
