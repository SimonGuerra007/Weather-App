import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Weather from "./components/Weather";
import Loading from "./components/Loading";

function App() {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [loader, setloader] = useState(true);
  const [cityName, setCityName] = useState("");
  const [darkmode, setDarkmode] = useState(false);

  const handleDarkmode = () => {
    setDarkmode(!darkmode);
  };

  const success = (pos) => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    // const cityName = ''

    const API_KEY = "4038953f52bcf2e357b719279a998612";

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

    axios
      .get(url)
      .then(({ data }) => {
        setWeatherInfo(data);
        setloader(false);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const searchCityByName = () => {
    const API_KEY = "4038953f52bcf2e357b719279a998612";

    const url2 = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;

    axios
      .get(url2)
      .then(({ data }) => {
        setWeatherInfo(data);
        setloader(false);
        console.log(data);
      })
      .catch(() => alert("La ciudad escrita no existe"));
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  if (loader) {
    return <Loading />;
  }

  return (
    <main
      className={`min-h-screen flex justify-center items-center ${darkmode ? '[background:radial-gradient(circle,rgb(95,88,142)0%,rgb(44,36,95)80%)]' : '[background:radial-gradient(circle,rgb(213,243,255)0%,rgb(29,176,255)80%)]'}`}
    >
      <Weather
        weatherInfo={weatherInfo}
        setCityName={setCityName}
        cityName={cityName}
        searchCityByName={searchCityByName}
        handleDarkmode={handleDarkmode}
        darkmode={darkmode}
      />
    </main>
  );
}

export default App;
