import "./App.css";
import { useState, useEffect } from "react";
import search_icon from "./assets/search.png";
import clear_icon from "./assets/clear.png";
import cloud_icon from "./assets/cloud.png";
import drizzle_icon from "./assets/drizzle.png";
import snow_icon from "./assets/snow.png";
import wind_icon from "./assets/wind.png";
import humidity_icon from "./assets/humidity.png";

async function getWeather(BASE_URL) {
  const response = await fetch(BASE_URL);
  const data = await response.json();
  return data;
}

function App() {
  const [location, setLocation] = useState("");
  const [data, setData] = useState({});

  const API_KEY = "40af37337beaf7618d40a2396a8ed468";
  const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;

  useEffect(() => {
    getWeather(BASE_URL).then((fetchedData) => {
      setData(fetchedData);
    });
  }, [location]);

  const getWeatherIcon = (weatherId) => {
    switch (weatherId) {
      case "Clear":
        return clear_icon;
      case "Clouds":
        return cloud_icon;
      case "Drizzle":
        return drizzle_icon;
      case "Snow":
        return snow_icon;
      case "Wind":
        return wind_icon;
      default:
        return clear_icon; // Default to clear icon
    }
  };

  return (
    <div className="weather">
      <div className="search-bar">
        <input
          type="text"
          value={location}
          id=""
          placeholder="Search"
          onChange={(e) => {
            setLocation(e.target.value);
            console.log(location);
          }}
        />
        <img src={search_icon} alt="search" />
      </div>
      <div className="align">
        <img
          src={
            data.weather && data.weather[0]
              ? getWeatherIcon(data.weather[0].main)
              : clear_icon
          }
          alt="weather"
          className="weather-icon"
        />
        <div className="content">
          <p className="temperature">
            {data.main && data.main.temp
              ? Math.round(data.main.temp - 273.15)
              : "N/A"}
            ˚C
          </p>
          <p className="location">{data.name}</p>
        </div>
      </div>

      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="humidity" />
          <div>
            <p>{data.main?.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind_icon} alt="wind" />
          <div>
            <p>
              {data.wind && data.wind.speed ? `${data.wind.speed} KMPH` : "N/A"}
            </p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
