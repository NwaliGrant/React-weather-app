import React, { useEffect, useState } from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import humidity_icon from "../assets/humidity.png";

const conditionMap = {
  Clear: clear_icon,
  Clouds: cloud_icon,
  Drizzle: drizzle_icon,
  Rain: rain_icon,
  Snow: snow_icon,
};

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [query, setQuery] = useState("Port Harcourt");

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod !== 200) {
        console.error("Error fetching weather:", data.message);
        setWeatherData(null);
        return;
      }

      setWeatherData(data);
    } catch (err) {
      console.error("Network error:", err);
    }
  };

  useEffect(() => {
    search(query);
  }, []);

  return (
    <div className="weather">
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <img
          src={search_icon}
          alt="Search"
          onClick={() => search(query)}
          style={{ cursor: "pointer" }}
        />
      </div>

      {/* Weather Data */}
      {weatherData && (
        <>
          <img
            src={conditionMap[weatherData.weather[0].main] || clear_icon}
            alt="Weather icon"
            className="weather-icon"
          />
          <p className="temperature">{Math.round(weatherData.main.temp)}°C</p>
          <p className="location">{weatherData.name}</p>

          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="humidity" />
              <div>
                <p>{weatherData.main.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>

            <div className="col">
              <img src={wind_icon} alt="wind" />
              <div>
                <p>{weatherData.wind.speed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
