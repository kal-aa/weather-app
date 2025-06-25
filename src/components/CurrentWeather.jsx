import { useState } from "react";
import PropTypes from "prop-types";

const CurrentWeather = ({ currentBtnRef, currentCity, setCurrentCity }) => {
  const [currentWeather, setCurrentWeather] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");

  const handleCurrentWeather = (e) => {
    e.preventDefault();
    setIsFetching(true);
    const url = `https://weather-app-backend-iota.vercel.app/currentWeather?city=${currentCity}`;
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => {
            throw new Error(error.error);
          });
        }
        return res.json();
      })
      .then((data) => {
        console.log("Current Weather fetched", data);
        setCurrentWeather(data);
        setError("");
        setIsFetching(false);
      })
      .catch((error) => {
        console.log("Failed to fetch current weather data", error);
        setIsFetching(false);
        setError(error.message);
      });
  };

  return (
    <div className="md:w-1/2">
      <h1 className="text-2xl font-thin">Current Weather</h1>
      <form onSubmit={handleCurrentWeather}>
        <input
          type="text"
          value={currentCity}
          onChange={(e) => setCurrentCity(e.target.value)}
          required
          placeholder="City: e.g. London"
          className="input-style"
        />
        <button
          ref={currentBtnRef}
          disabled={isFetching}
          type="submit"
          className="btn-style"
        >
          {isFetching ? "Fetching.." : "Submit"}
        </button>
        <p className="text-red-600">{error}</p>
      </form>
      {currentWeather && currentWeather.temperature && (
        <ul className="text-center">
          <li>
            <img
              src={`http://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`}
              alt="Weather icon"
              className="w-10 h-10 mx-auto"
            />
          </li>
          <li>Temperature: {currentWeather.temperature} °C</li>
          <li>Description: {currentWeather.description}</li>
          <li>Feels like: {currentWeather.feels_like} °C</li>
        </ul>
      )}
    </div>
  );
};

CurrentWeather.propTypes = {
  currentBtnRef: PropTypes.object,
  currentCity: PropTypes.string,
  setCurrentCity: PropTypes.func,
};

export default CurrentWeather;
