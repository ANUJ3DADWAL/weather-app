import React from "react";

const SearchBar = ({ city, setCity, fetchWeather }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && fetchWeather(city)}
        placeholder="Enter city name"
      />
      <button onClick={() => fetchWeather(city)}>Search</button>
    </div>
  );
};

export default SearchBar;