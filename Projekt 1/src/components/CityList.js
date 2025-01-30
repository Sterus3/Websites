import React, { useState,} from 'react';
import { Link } from 'react-router-dom';
import './CityList.css';

const CityList = ({ cities }) => {
  const [favoriteCities, setFavoriteCities] = useState(() => {
    const savedFavorites = localStorage.getItem('favoriteCities');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const toggleFavorite = (city) => {
    let updatedFavorites;
    if (favoriteCities.includes(city)) {
      updatedFavorites = favoriteCities.filter(favCity => favCity !== city);
    } else {
      updatedFavorites = [...favoriteCities, city];
    }
    setFavoriteCities(updatedFavorites);
    localStorage.setItem('favoriteCities', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="city-list-container">
      <div className="main-city-list">
        <h2>Wybierz miasto</h2>
        <ul>
          {cities.map((city, index) => (
            <li key={index} className="city-item">
              <div className="city-name">
                <Link to={`/weather/${city}`} className="city-link">
                  {city}
                </Link>
              </div>
              <div className="favorite-btn-container">
                <button
                  className={`favorite-btn ${favoriteCities.includes(city) ? 'active' : ''}`}
                  onClick={() => toggleFavorite(city)}
                  aria-label={`Dodaj ${city} do ulubionych`}
                >
                  {favoriteCities.includes(city) ? '❤️' : '🤍'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar">
        <h3>Ulubione miasta</h3>
        <ul>
          {favoriteCities.length === 0 ? (
            <li>Brak ulubionych miast</li>
          ) : (
            favoriteCities.map((city, index) => (
              <li key={index}>
                <Link to={`/weather/${city}`} className="city-link">{city}</Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default CityList;
