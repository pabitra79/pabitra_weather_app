import React, { useEffect, useState } from "react";
import "./App.css";
import hot from "./assets/hotbg.jpg";
import cold from "./assets/newcold.jpg";
import Descriptions from "./components/Descriptions";
import { getFormattedWeatherData } from "./WeatherServiceApi";

function App() {
  const [city, setCity] = useState("paris");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(hot);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);
      if (data === null) {
        return;
      }
      setWeather(data);
      const threshold = units === "metric" ? 20 : 40;
      if (data.temp <= threshold) setBg(cold);
      else setBg(hot);
    };
    fetchWeatherData();
  }, [units, city]);

  const handleUnitClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelcius = currentUnit === "C";
    button.innerText = isCelcius ? "°F" : "°C";
    setUnits(isCelcius ? "metric" : "imperial");
  };
  const enterKeyDown = (e) => {
    if (e.keycode === 13) {
      setCity(e.currentTarget.value);
    }
  };
  // ddd

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather && (
          <div className="conatiner">
            <div className="section section_inputs">
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={enterKeyDown}
                type="text"
                name="city"
                placeholder="Enter city name"
              ></input>
              <button onClick={(e) => handleUnitClick(e)}>°F</button>
            </div>
            <div className="section section_temparature">
              <div className="icon">
                <h3> {`${weather.name},${weather.country}`}</h3>
                <img
                  src="https://openweathermap.org/img/wn/02d@2x.png"
                  alt=" weatherIcon"
                />
                <h3>{weather.description}</h3>
              </div>
              <div className="Temperature">
                <h2>{`${weather.temp.toFixed()} °${
                  units === "metric" ? "C" : "F"
                } `}</h2>
              </div>
            </div>
            <Descriptions weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  );
}
export default App;
