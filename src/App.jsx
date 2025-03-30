import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import SearchBar from "./components/SearchBar";
import ThemeToggle from "./components/ThemeToggle";
import "./index.css";

const API_KEY = "d26a8e8003f37682d7024ee80aafffe6";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("searchHistory"));
    if (savedHistory) setHistory(savedHistory);
  }, []);

  const fetchWeather = async (cityName) => {
    if (!cityName) return;
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      updateHistory(cityName);
    } catch (err) {
      setError("City not found or API error.");
      setWeather(null);
    }
    setLoading(false);
  };

  const updateHistory = (cityName) => {
    const updatedHistory = [cityName, ...history.filter((c) => c !== cityName)].slice(0, 5);
    setHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  return (
    <div className="app-container">
      <ThemeToggle />
      <h1 className="text-center text-3xl font-bold">Weather Dashboard</h1>
      <SearchBar city={city} setCity={setCity} fetchWeather={fetchWeather} />
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {weather && <WeatherCard weather={weather} />}
      <div className="history">
        <h3>Recent Searches</h3>
        {history.map((c, index) => (
          <button key={index} onClick={() => fetchWeather(c)}>
            {c}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;