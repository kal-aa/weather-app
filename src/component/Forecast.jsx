import { useState } from "react";
import PropTypes from "prop-types";

const Forecast = ({ forecastBtnRef, forecastCity, setForecastCity }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [forecastWeather, setForecasetWeather] = useState([]);
  const [error, setError] = useState("");
  const handleForecast = (e) => {
    e.preventDefault();
    setIsFetching(true);

    fetch(
      `https://weather-app-backend-iota.vercel.app/forecast?city=${forecastCity}`
    )
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.error);
          });
        }
        return response.json();
      })
      .then((data) => {
        setForecasetWeather(data);
        setIsFetching(false);
        setError("");
      })
      .catch((error) => {
        console.error("Error fetching the forecast:", error);
        setIsFetching(false);
        setError(error.message);
      });
  };
  return (
    <div className="md:w-1/2">
      <h1 className="text-2xl font-thin">5-Day Forecast</h1>
      <form onSubmit={handleForecast}>
        <input
          type="text"
          value={forecastCity}
          onChange={(e) => setForecastCity(e.target.value)}
          required
          placeholder="City: e.g. London"
          className="input-style"
        />
        <button
          ref={forecastBtnRef}
          type="submit"
          disabled={isFetching}
          className="btn-style"
        >
          {isFetching ? "Fetching.." : "Submit"}
        </button>
        <p className="text-red-600">{error}</p>
      </form>
      <ul className="grid md:grid-cols-2">
        {forecastWeather.map((item, index) => (
          <li
            key={index}
            className="mt-2 text-center rounded-full hover:bg-white/10"
          >
            <img
              src={`http://openweathermap.org/img/wn/${item.icon}.png`}
              className="mx-auto"
            />
            <p className="text-sm font-bold">{item.date}</p>
            <p>{item.temperature} °C</p>
            <p>{item.description}</p>
            <p>Feels like: {item.feels_like} °C</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

Forecast.propTypes = {
  forecastBtnRef: PropTypes.object,
  forecastCity: PropTypes.string,
  setForecastCity: PropTypes.func,
};

export default Forecast;
