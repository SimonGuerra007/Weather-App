import React from "react";
import { useState } from "react";
import "./css/Weather.css";

const Weather = ({
  weatherInfo,
  setCityName,
  searchCityByName,
  handleDarkmode,
  darkmode
}) => {
  const [changeDegreeReading, setChangeDegreeReading] = useState(false);

  const kelvinToCelsius = (weatherInfo?.main.temp - 273.15).toFixed(1);
  const kelvinToFahrenheit = (
    ((weatherInfo?.main.temp - 273.15) * 9) / 5 +
    32
  ).toFixed(1);

  const toggleStateBoolean = () => {
    setChangeDegreeReading(!changeDegreeReading);
  };

  const searchCity = (e) => {
    setCityName(e.target.value);
  };

  const submitCity = (e) => {
    e.preventDefault();
    searchCityByName();
  };

  const toggleInfoDegreeReading = changeDegreeReading
    ? kelvinToFahrenheit
    : kelvinToCelsius;

  return (
    <section
      className={`text-white w-[80%] flex flex-col justify-center items-center `}
    >
      <section className="navbar">
        <h1 className="text-2xl text-white mb-4">Weather App</h1>
        <nav className="">
          <form onSubmit={submitCity}>
            <input
              onChange={searchCity}
              className="rounded-[3px] py-1 px-9 text-center"
              type="text"
              placeholder="Busca una ciudad"
            />
          </form>
        </nav>
        <div
          onClick={handleDarkmode}
          className={`h-[30px] w-[60px] rounded-full cursor-pointer bg-white after:block after:content-[''] after:h-[25px] after:w-[25px] after:rounded-full flex p-1 items-center after:transition-all ${darkmode ? 'after:bg-[#53388F] justify-end' : 'after:bg-[#85BCF1] justify-start'}`}
        ></div>
      </section>

      <div
        className={`flex flex-col gap-3 justify-center items-center rounded-[50px] p-[30px] bg-contain bg-no-repeat bg-center`}
      >
        <h2 className={`${darkmode ? 'text-white' : 'text-[#026EED]'}`}>
          {weatherInfo?.name}: {weatherInfo?.sys.country}
        </h2>

        <div className="flex flex-col sm:flex-row justify-center gap-5 bg-inherit">
          {/* superior section */}
          <section className={`p-3 rounded-2xl h-[250px] flex flex-col justify-center items-center transition-all ${darkmode ? 'text-white bg-[#362A84]' : 'text-[#026EED] bg-[#D5F3FF]'}`}>
            <h4 className="text-2xl">{weatherInfo?.weather[0].description}</h4>
            <div className="flex justify-between items-center gap-5">
              <span className="text-6xl">
                {toggleInfoDegreeReading} {changeDegreeReading ? "F" : "C"}°
              </span>
              <div className="text-5xl rounded-full bg-black/30">
                <img
                  src={`https://openweathermap.org/img/wn/${weatherInfo?.weather[0].icon}@2x.png`}
                  alt=""
                />
              </div>
            </div>
          </section>

          {/* inferior section */}
          <section className={`rounded-[10px] p-[10px] flex flex-row sm:flex-col justify-between items-start gap-[3rem] transition-all ${darkmode ? 'bg-[#362A84]' : 'text-[#026EED] bg-[#D5F3FF]'}`}>
            <article className="flex justify-between items-center gap-1">
              <div>
                <img src="public\icons\icon1.png" alt="" />
              </div>
              <span>{weatherInfo?.wind.speed}m/s</span>
            </article>
            <article className="flex justify-between items-center gap-1 px-2">
              <div>
                <img src="public\icons\icon2.png" alt="" />
              </div>
              <span>{weatherInfo?.main.humidity}%</span>
            </article>
            <article className="flex justify-between items-center gap-1 -50">
              <div>
                <img src="public\icons\icon3.png" alt="" />
              </div>
              <span>{weatherInfo?.main.pressure}hPa</span>
            </article>
          </section>
        </div>

        <div>
          <button
            onClick={toggleStateBoolean}
            className={` text-white hover:bg-slate-400 px-6 py-1 rounded-full transition-all ${darkmode ? 'bg-[#7D69F1]' : 'bg-[#38A1D8]'}`}
          >
            Change to {changeDegreeReading ? "C" : "F"}°
          </button>
        </div>
      </div>
    </section>
  );
};

export default Weather;
