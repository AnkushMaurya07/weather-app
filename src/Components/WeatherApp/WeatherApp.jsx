import React, { useState, useEffect } from 'react';
import style from './WeatherApp.module.css';
import search_icon from '../AssetsIcons/search.png';
import humidity_icon from '../AssetsIcons/humidity.png';
import wind_icon from '../AssetsIcons/wind.png';
import cloud_icon from'../AssetsIcons/cloud.png'

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState({
    humidity: '',
    windSpeed: '',
    temperature: '',
    location: '',
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const api_key = '54115dad8fe91071a100373aff1e7091';

  const search = async () => {
    if (!searchTerm) {
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?appid=${api_key}&q=${searchTerm}&units=Metric`;

      const response = await fetch(url);
      const data = await response.json();

      setWeatherData({

        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: data.main.temp,
        location: data.name,
      });

      // The search suggestions I have given is manual need to update and work oin that one.
      setSuggestions([]);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  // Fetch suggestions when searchTerm changes
  useEffect(() => {
    if (searchTerm) {
      // For this example, I'm using a predefined list of cities.
      const cities = ["London","Lanchesher"]
      const filteredSuggestions = cities.filter((city) =>
        city.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]); // Clear suggestions if the search term is empty
    }
  }, [searchTerm]);

  return (
    
    <section className={style.main}>
      <div className={style.container}>
        <div className={style.top_bar}>
          <input
            id="searchInput"
            className={style.inputtag}
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className={style.clearButton}
              onClick={() => setSearchTerm('')}
            >
              Clear
            </button>
          )}
          <div className={style.imagecontainer} onClick={search}>
            <img className={style.searchimage} src={search_icon} alt="" />
          </div>
        </div>
        {suggestions.length > 0 && (
          <ul className={style.suggestions}>
            {suggestions.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  setSearchTerm(item);
                  setSuggestions([]); // Clear suggestions when a suggestion is clicked
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
        <div className={style.weather_image}>
          <img src={cloud_icon} alt="" />
        </div>
        <div className={style.weather_temp}>
          {`${weatherData.temperature} Deg Celcius`}
        </div>
        <div className={style.weather_location}>{weatherData.location}</div>
        <div className={style.data_container}>
          <div className={style.element}>
            <img src={humidity_icon} alt="" />
            <div className={style.data}>
              <div className={style.humidity_percent}>{`${weatherData.humidity}%`}</div>
              <div className={style.humid}>Humidity</div>
            </div>
          </div>
          <div className={style.element}>
            <img src={wind_icon} alt="" />
            <div className={style.data}>
              <div className={style.wind_rate}>{`${weatherData.windSpeed} km/h`}</div>
              <div className={style.humid}>Wind Speed</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeatherApp;
