import { useState } from "react";
import PropTypes from "prop-types";
import ClipLoader from "react-spinners/ClipLoader";

const CityList = ({
  currentBtnRef,
  forecastBtnRef,
  setCurrentCity,
  setForecastCity,
}) => {
  const [showList, setShowList] = useState(false);
  const [cityList, setCityList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [activeCity, setActiveCity] = useState(null);

  const handleAllCities = () => {
    setIsConfirmed(false);
    setIsFetching(true);
    fetch("assets/cityList.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
        setCityList(
          sortedData.filter(
            (each) => each.country === "ET" || each.country === "GB"
          )
        );
        setIsFetching(false);
      })
      .catch((error) => {
        console.error("Error fetching city list:", error);
        setIsFetching(false);
      });
  };

  const handleCountry = (city) => {
    setIsConfirmed(true);
    setActiveCity(city);
  };

  const handleCurrentWeather = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentCity(activeCity);
    setIsConfirmed(false);
    setTimeout(() => {
      currentBtnRef.current.click();
    }, 1);
  };
  const handleForecast = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setForecastCity(activeCity);
    setIsConfirmed(false);
    setTimeout(() => {
      forecastBtnRef.current.click();
    }, 1);
  };

  return (
    <div className="mt-5 text-center">
      <button
        onClick={() => {
          if (isConfirmed) setIsConfirmed(false);
          setShowList((prev) => !prev);
          if (!cityList.length) handleAllCities();
        }}
        className="text-lg text-blue-500 hover:text-blue-500/90"
      >
        Do you want to{" "}
        <p className="inline px-1.5 border rounded-full hover:bg-white/20">
          {!showList ? "check" : "hide"}
        </p>{" "}
        some eligible cities?
      </button>
      {isFetching && (
        <div className="flex items-center justify-center">
          <span className="text-blue-900">
            This might take a couple of seconds...
          </span>
          <ClipLoader size={10} color="red" />
        </div>
      )}
      {isConfirmed && (
        <section className="fixed bottom-1 left-[25%] right-[25%] space-x-[15%]">
          <button
            onClick={handleCurrentWeather}
            className="btn-style md:px-3 md:py-1 md:text-base"
          >
            Current Weather
          </button>
          <button
            onClick={handleForecast}
            className="btn-style md:px-3 md:py-1 md:text-base"
          >
            Forecast
          </button>
        </section>
      )}

      {showList && (
        <ul className="grid grid-cols-2 gap-2 mt-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {cityList.map((city, index) => (
            <li
              onClick={() => handleCountry(city.name)}
              key={index}
              className={
                activeCity === city.name
                  ? "border p-2 bg-white/30 rounded-md"
                  : "border p-2 hover:bg-white/20 rounded-md"
              }
            >
              {city.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

CityList.propTypes = {
  currentBtnRef: PropTypes.object,
  forecastBtnRef: PropTypes.object,
  setCurrentCity: PropTypes.func,
  setForecastCity: PropTypes.func,
};

export default CityList;
