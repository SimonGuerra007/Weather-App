import React from 'react'
import { useState } from 'react'
import './css/Weather.css'


const Weather = ({weatherInfo, setCityName, cityName, searchCityByName}) => {
    const [changeDegreeReading, setChangeDegreeReading] = useState(false);

    const kelvinToCelsius = (weatherInfo?.main.temp - 273.15).toFixed(1)
    const kelvinToFahrenheit = (((weatherInfo?.main.temp - 273.15) * 9/5) + 32).toFixed(1)

    const toggleStateBoolean = () => {
        setChangeDegreeReading(!changeDegreeReading)
    }

    const searchCity = (e) => {
        setCityName(e.target.value)
    }

    const submitCity = (e) => {
        e.preventDefault();
        searchCityByName()
    }
    
    const toggleInfoDegreeReading = changeDegreeReading ? kelvinToFahrenheit : kelvinToCelsius

  return (
    <section className='text-black text-center  flex flex-col justify-center items-center'>

        <section className='navbar'>
            <h1 className='text-2xl text-white mb-4'>Weather App</h1>
            <nav className='rounded-[3px]'>
                <form onSubmit={submitCity}>
                    <input onChange={searchCity} className='rounded-[3px] py-1 px-9 text-center' type="text" placeholder='Busca una ciudad' />
                </form>
            </nav>
        </section>

        <div className='flex flex-col gap-9'>
            <h2 className='my-8'>{weatherInfo?.name}: {weatherInfo?.sys.country}</h2>

            <div className='weather_info'>
                {/* superior section */}
                <section className='bg-white/30 p-3 rounded-2xl flex flex-col justify-center items-center'>
                    <h4 className='text-xl'>{weatherInfo?.weather[0].description}</h4>
                    <div className='flex justify-between items-center gap-5'>
                        <span className='text-6xl'>{toggleInfoDegreeReading} {changeDegreeReading ? 'F' : 'C'}°</span>
                        <div className='text-5xl'>
                            <img src={`https://openweathermap.org/img/wn/${weatherInfo?.weather[0].icon}@2x.png`} alt="" />
                        </div>
                    </div>
                </section>

                {/* inferior section */}
                <section className='weather_info--op'>
                    <article className='flex justify-between items-center gap-1'>
                        <div>
                            <img src="public\icons\icon1.png" alt="" />
                        </div>
                        <span>{weatherInfo?.wind.speed}m/s</span>
                    </article>
                    <article className='flex justify-between items-center gap-1 px-2'>
                        <div>
                            <img src="public\icons\icon2.png" alt="" />
                        </div>
                        <span>{weatherInfo?.main.humidity}%</span>
                    </article>
                    <article className='flex justify-between items-center gap-1 -50'>
                        <div>
                            <img src="public\icons\icon3.png" alt="" />
                        </div>
                        <span>{weatherInfo?.main.pressure}hPa</span>
                    </article>
                </section>
            </div>

            <div>
            <button onClick={toggleStateBoolean} className='bg-white/30 transition hover:bg-slate-400 px-6 py-1 rounded-full'>Change to {changeDegreeReading ? 'C' : 'F'}°</button>
            </div>
        </div>
    </section>
  )
}

export default Weather