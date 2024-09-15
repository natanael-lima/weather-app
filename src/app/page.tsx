"use client";

import {
  IoSunny, // Sol
  IoMoon, // Luna
  IoRainy, // Lluvia
  IoCloudy, // Nublado
  IoThunderstorm, // Tormenta
  IoSnow, // Nieve
  IoPartlySunny, // Parcialmente soleado
  IoWater, // Agua para Humedad
  IoShieldCheckmark, // para UV Index
  IoCloudyOutline
} from 'react-icons/io5';
import { TbMist } from "react-icons/tb"; // Neblina

import { FaLocationDot } from "react-icons/fa6";
import { GiWaterDrop } from "react-icons/gi";
import { useState, useEffect } from 'react';
import { getWeatherByCity, WeatherDTO } from '../api/weatherService';

// Definir los posibles tipos de descripción de clima
// Definir los posibles tipos de descripción de clima
type WeatherDescription =
  | 'clear sky'
  | 'few clouds'
  | 'scattered clouds'
  | 'broken clouds'
  | 'shower rain'
  | 'rain'
  | 'thunderstorm'
  | 'snow'
  | 'mist'
  | 'fog'
  | 'hail'
  | 'dust'
  | 'sand';

// Mapa de íconos
const iconMap: { [key in WeatherDescription]: JSX.Element } = {
  "clear sky": <IoSunny className="w-5 h-5 text-yellow-300" />,
  "few clouds": <IoPartlySunny className="w-5 h-5 text-white" />,
  "scattered clouds": <IoCloudy className="w-5 h-5 text-gray-200" />,
  "broken clouds": <IoCloudy className="w-5 h-5 text-gray-200" />,
  "shower rain": <IoRainy className="w-5 h-5 text-blue-300" />,
  "rain": <IoRainy className="w-5 h-5 text-blue-500" />,
  "thunderstorm": <IoThunderstorm className="w-5 h-5 text-purple-500" />,
  "snow": <IoSnow className="w-5 h-5 text-white" />,
  "mist": <IoCloudyOutline className="w-5 h-5 text-gray-300" />,
  "fog": <IoCloudyOutline className="w-5 h-5 text-gray-300" />,
  "hail": <IoSnow className="w-5 h-5 text-white" />,
  "dust": <IoCloudyOutline className="w-5 h-5 text-brown-400" />,
  "sand": <IoCloudyOutline className="w-5 h-5 text-yellow-600" />, // Utilizando nublado para arena
};

// Mapa de íconos
const iconMaps: { [key in WeatherDescription]: JSX.Element } = {
  "clear sky": <IoSunny className="w-32 h-32 text-yellow-300" />,
  "few clouds": <IoPartlySunny className="w-32 h-32 text-yellow-300" />,
  "scattered clouds": <IoCloudy className="w-32 h-32 text-gray-200" />,
  "broken clouds": <IoCloudy className="w-32 h-32 text-gray-200" />,
  "shower rain": <IoRainy className="w-32 h-32 text-blue-300" />,
  "rain": <IoRainy className="w-32 h-32 text-blue-500" />,
  "thunderstorm": <IoThunderstorm className="w-32 h-32 text-purple-500" />,
  "snow": <IoSnow className="w-32 h-32 text-white" />,
  "mist": <IoCloudyOutline className="w-32 h-32 text-gray-300" />,
  "fog": <IoCloudyOutline className="w-32 h-32 text-gray-300" />,
  "hail": <IoSnow className="w-32 h-32 text-white" />,
  "dust": <IoCloudyOutline className="w-32 h-32 text-brown-400" />,
  "sand": <IoCloudyOutline className="w-32 h-32 text-yellow-600" />, // Utilizando nublado para arena
};


// Íconos para temperatura

export default function Home() {
  const [weather, setWeather] = useState<WeatherDTO | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cityName, setCityName] = useState('San Salvador de Jujuy'); // Por defecto "San Salvador de Jujuy"

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const weatherData = await getWeatherByCity(cityName);
        setWeather(weatherData);
        setError(null); // Limpiar el error si la búsqueda es exitosa
      } catch (err: any) {
        let errorMessage = '¡Ups! No pudimos encontrar esa ubicación. Por favor revisa la ortografía y vuelve a intentarlo.';
        setError(errorMessage);
      }
    };
  
    if (cityName) {
      fetchWeather();
    }
  }, [cityName]);
  
  useEffect(() => {
    if (error) {
      // Set a timer to clear the error after 5 seconds
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
  
      // Clear the timer if the component unmounts or error changes
      return () => clearTimeout(timer);
    }
  }, [error]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const newCity = form.elements.namedItem('city') as HTMLInputElement;
    const cityValue = newCity.value.trim();
    if (cityValue) {
      setCityName(cityValue);
    }
  };

  if (!weather) {
    return <div>Loading...</div>;
  }
  const temperatureInCelsius = Math.round(weather.temperature);
  // Get the icon based on the weather description
   const currentIcon = iconMaps[weather.description.toLowerCase() as WeatherDescription] || <IoCloudyOutline className="w-32 h-32 text-gray-200" />;

  console.log('Temperature in Celsius:', temperatureInCelsius); // Para depuración

  return (
    <section className="min-h-screen bg-teal-300/80 flex justify-center items-center p-4">
      <div className="w-full lg:w-3/6 space-y-4">
        <article className="rounded-lg p-6">
          <header className="flex items-center justify-between">
            <h1 className="text-6xl font-bold text-white">{temperatureInCelsius}°C</h1>
              {currentIcon} {/* Icono más grande */}
          </header>
          <p className="text-xl text-white mt-2 capitalize ">{weather.description}</p>
          <div className="mt-2">
            <p className="text-lg text-teal-100 flex items-center mb-2">
              {cityName}
              <FaLocationDot size={15} className="ml-2" /> {/* Alineado con el texto */}
            </p>
            <form onSubmit={handleSearch} className="flex items-center border border-teal-300/50 rounded-lg overflow-hidden w-80">
              <input
                type="text"
                name="city"
                placeholder="Search location"
                className="px-2 py-1 border-none outline-none w-full text-teal-800"
              />
              <button type="submit" className="bg-teal-600/80 text-teal-100 px-4 py-1 hover:bg-teal-600">
                Search
              </button>
            </form>
              {error && (
                <div className="text-red-500 mt-4 p-4 bg-red-100 rounded-lg border border-red-300">
                  {error}
                </div>
              )}

              {!weather && !error && (
                <div>Loading...</div>
              )}
          </div>
        </article>
        <section>
          <article className="bg-teal-600/50 rounded-lg p-6">
              <ul className="grid grid-cols-4 gap-4">
                {/* Encabezados de columna */}
                <li className="font-semibold text-white flex justify-center  items-center">Day</li>
                <li className="font-semibold text-white flex justify-center">Precipitation</li>
                <li className="font-semibold text-white flex justify-center  items-center">Icons</li>
                <li className="font-semibold text-white flex justify-center  items-center">Temperature</li>

                {/* Datos */}
                {weather.dailyForecasts.map((forecast) => {
                  const dayName = new Date(forecast.date).toLocaleDateString('en-US', { weekday: 'long' });
                  const icon = iconMap[forecast.description.toLowerCase() as WeatherDescription] || <IoCloudy className="w-5 h-5" />;

                  return (
                    <>
                      {/* Día */}
                      <li className="text-white flex justify-center ">{dayName}</li>
                      
                      {/* Precipitación */}
                      <li className="flex justify-center  items-center text-white">
                        <GiWaterDrop className="w-4 h-4 text-teal-100/50 mr-2" />
                        <span className='text-teal-100/60'>{forecast.cloudCover}%</span>
                      </li>
                      
                      {/* Íconos */}
                      <li className="flex justify-center  items-center space-x-2">
                        {icon}
                        <IoMoon className="w-5 h-5 text-yellow-300" />
                      </li>
                      
                      {/* Temperaturas */}
                      <li className="flex justify-center text-white ">
                        <span className='font-bold'>{Math.round(forecast.tempMax)}°C</span> / 
                        <span className='font-bold'>{Math.round(forecast.tempMin)}°C</span>
                      </li>
                    </>
                  );
                })}
              </ul>
          </article>
        </section>

        <section>
          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <li className="bg-teal-600/50 rounded-lg p-4 flex flex-col items-center">
              <IoSunny className="w-8 h-8 text-white mb-2" />
              <h2 className="text-lg font-semibold text-white">Feels like</h2>
              <p className="text-2xl text-white">{Math.round(weather.feelsLike)}°C</p>
            </li>
            <li className="bg-teal-600/50 rounded-lg p-4 flex flex-col items-center">
              <IoWater className="w-8 h-8 text-white mb-2" />
              <h2 className="text-lg font-semibold text-white">Humidity</h2>
              <p className="text-2xl text-white">{weather.humidity}%</p>
            </li>
            <li className="bg-teal-600/50 rounded-lg p-4 flex flex-col items-center">
              <IoCloudy className="w-8 h-8 text-white mb-2" />
              <h2 className="text-lg font-semibold text-white">Cloud Cover</h2>
              <p className="text-2xl text-white">{weather.cloudCover}%</p>
            </li>
            <li className="bg-teal-600/50 rounded-lg p-4 flex flex-col items-center">
              <IoShieldCheckmark className="w-8 h-8 text-white mb-2" />
              <h2 className="text-lg font-semibold text-white">UV Index</h2>
              <p className="text-2xl text-white">N/A</p> {/* No UV index in current data */}
            </li>
          </ul>
        </section>
      </div>
    </section>

  );
}
