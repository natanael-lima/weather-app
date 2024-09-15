"use client";

import {
  WiDaySunny,
  WiNightClear,
  WiCloudy,
  WiRain,
  WiThunderstorm,
  WiSnow,
  WiFog,
  WiStrongWind,
  WiRainMix,
  WiDaySunnyOvercast,
  WiNightAltCloudy,
  WiDayRain,
  WiNightRain,
  WiDaySnow,
  WiNightSnow,
  WiDayThunderstorm,
  WiNightThunderstorm,
  WiDayFog,
  WiNightFog,
  WiDayHaze,
  WiNightAltPartlyCloudy,
  WiNightSleet,
  WiDaySleet,
  WiNightAltRainMix,
  WiDayCloudyHigh,
  WiNightCloudyHigh,
} from 'react-icons/wi';
import { FaLocationDot } from "react-icons/fa6";
import { GiWaterDrop } from "react-icons/gi";
import { useState, useEffect } from 'react';
import { getWeatherByCity, WeatherDTO } from '../api/weatherService';

export default function Home() {
  const [weather, setWeather] = useState<WeatherDTO | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cityName, setCityName] = useState('San Salvador de Jujuy'); // Por defecto "San Salvador de Jujuy"

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const weatherData = await getWeatherByCity(cityName);
        setWeather(weatherData);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchWeather();
  }, [cityName]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const newCity = form.elements.namedItem('city') as HTMLInputElement;
    const cityValue = newCity.value.trim();
    if (cityValue) {
      setCityName(cityValue);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!weather) {
    return <div>Loading...</div>;
  }
  const temperatureInCelsius = Math.round(weather.temperature);
  console.log('Temperature in Celsius:', temperatureInCelsius); // Para depuración

  return (
    <section className="min-h-screen bg-teal-300/80 flex justify-center items-center p-4">
      <div className="w-full lg:w-3/6 space-y-4">
        <article className="rounded-lg p-6">
          <header className="flex items-center justify-between">
          <h1 className="text-6xl font-bold text-white">{temperatureInCelsius}°C</h1>

            <WiDayCloudyHigh className="w-32 h-32 text-white" /> {/* Icono más grande */}
          </header>
          <p className="text-xl text-white mt-2">{weather.description}</p>
          <div className="mt-2">
            <p className="text-lg text-teal-100 flex items-center mb-2">
              {cityName}
              <FaLocationDot size={15} className="ml-2" /> {/* Alineado con el texto */}
            </p>
            <form onSubmit={handleSearch} className="flex items-center border border-teal-300 rounded-lg overflow-hidden w-80">
              <input
                type="text"
                name="city"
                placeholder="Search location"
                className="px-2 py-1 border-none outline-none w-full"
              />
              <button type="submit" className="bg-teal-500 text-white px-4 py-1">
                Search
              </button>
            </form>
          </div>
        </article>
        <section>
            <article className="bg-teal-600/50 rounded-lg p-6">
              <ul className="space-y-4">
                  {weather.dailyForecasts.map((forecast) => (
                    <li key={forecast.date} className="flex justify-between items-center text-white w-full">
                      <div className="text-lg font-semibold text-right">{new Date(forecast.date).toLocaleDateString()}</div>
                      <div className="flex items-center">
                        <GiWaterDrop className="w-6 h-6 text-teal-200/50 mr-2" />
                        <span>{forecast.cloudCover}%</span>
                      </div>
                      <div className="flex space-x-2">
                        <WiDaySunny className="w-8 h-8 text-yellow-300" />
                        <WiNightClear className="w-8 h-8 text-gray-200" />
                      </div>
                      <div className="flex space-x-2">
                        <span>{Math.round(forecast.tempMax - 273.15)}°C</span>
                        <span>{Math.round(forecast.tempMin - 273.15)}°C</span>
                      </div>
                    </li>
                  ))}
              </ul>
            </article>
        </section>

        <section>
          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <li className="bg-teal-600/50 rounded-lg p-4 flex flex-col items-center">
              <WiDayThunderstorm className="w-8 h-8 text-white mb-2" />
              <h2 className="text-lg font-semibold text-white">Feels like</h2>
              <p className="text-2xl text-white">{Math.round(weather.feelsLike - 273.15)}°C</p>
            </li>
            <li className="bg-teal-600/50 rounded-lg p-4 flex flex-col items-center">
              <WiNightClear className="w-8 h-8 text-white mb-2" />
              <h2 className="text-lg font-semibold text-white">Humidity</h2>
              <p className="text-2xl text-white">{weather.humidity}%</p>
            </li>
            <li className="bg-teal-600/50 rounded-lg p-4 flex flex-col items-center">
              <WiDayCloudyHigh className="w-8 h-8 text-white mb-2" />
              <h2 className="text-lg font-semibold text-white">Cloud Cover</h2>
              <p className="text-2xl text-white">{weather.cloudCover}%</p>
            </li>
            <li className="bg-teal-600/50 rounded-lg p-4 flex flex-col items-center">
              <WiDaySunny className="w-8 h-8 text-white mb-2" />
              <h2 className="text-lg font-semibold text-white">UV Index</h2>
              <p className="text-2xl text-white">N/A</p> {/* No UV index in current data */}
            </li>
          </ul>
        </section>
      </div>
    </section>

  );
}
