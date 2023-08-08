import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import Weather from './components/Weather'
import Loading from './components/Loading'

function App() {

  const [weatherInfo, setWeatherInfo] = useState(null)
  const [loader, setloader] = useState(true)
  const [cityName, setCityName] = useState('') 
  
  const success = (pos) => {
    const lat = pos.coords.latitude
    const lon = pos.coords.longitude

    // const cityName = ''

    const API_KEY = '4038953f52bcf2e357b719279a998612'

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`

    axios.get(url)
      .then(({data}) => {
        setWeatherInfo(data)
        setloader(false)
        console.log(data);
      }).catch((err) => console.log(err))
  }

  const searchCityByName = () => {

    const API_KEY = '4038953f52bcf2e357b719279a998612'

    const url2 = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`

    axios.get(url2)
      .then(({data}) => {
        setWeatherInfo(data)
        setloader(false)
        console.log(data);
      }).catch(() => alert('La ciudad escrita no existe'))

  }
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  if (loader) {
    return (
      <Loading />
    )
  }

  
  return (
    <main className='min-h-full'>
      <Weather weatherInfo={weatherInfo} setCityName={setCityName} cityName={cityName} searchCityByName={searchCityByName}/>
    </main>
  )
}

export default App
