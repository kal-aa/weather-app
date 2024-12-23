import { useRef, useState } from "react";
import CityList from "./component/CityList";
import CurrentWeather from "./component/currentWeather";
import Forecast from "./component/Forecast";

const App = () => {
  const currentBtnRef = useRef(null);
  const forecastBtnRef = useRef(null);
  const [currentCity, setCurrentCity] = useState("");
  const [forecastCity, setForecastCity] = useState("");

  return (
    <div className=" min-h-screen">
      <h1 className="text-4xl font-mono text-center mt-5 bg-slate-50 rounded-full mx-[25%]">Weather App</h1>
      <p className="text-center mt-2 px-[10%] mx-[5%] bg-slate-50 rounded-full">
        Get the latest weather updates and forecasts. The Current Weather
        section provides real-time weather information, while the Forecast
        section offers a 5-day weather outlook with data available in 3-hour
        intervals.
      </p>
      <div className="weather-container">
        <CurrentWeather
          currentBtnRef={currentBtnRef}
          currentCity={currentCity}
          setCurrentCity={setCurrentCity}
        />
        <Forecast
          forecastBtnRef={forecastBtnRef}
          forecastCity={forecastCity}
          setForecastCity={setForecastCity}
        />
      </div>
      <CityList
        currentBtnRef={currentBtnRef}
        forecastBtnRef={forecastBtnRef}
        setCurrentCity={setCurrentCity}
        setForecastCity={setForecastCity}
      />
    </div>
  );
};

export default App;
