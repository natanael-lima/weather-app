"use client";

import { useState, useEffect } from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { GiWaterDrop } from "react-icons/gi";
import Footer from '@/components/Footer';
import { getWeatherByCity, WeatherDTO } from '../api/weatherService';
import clearSky from '../assets/clear_sky.png'
import fewClouds from '../assets/few_clouds.png'
import cloudyWithLightning from '../assets/cloudy_with_lightning.png'
import foggyDay from '../assets/foggy_day.png'
import heavyRain from '../assets/heavy_rain.png'
import lightRain from '../assets/light_rain.png'
import lightSnow from '../assets/light_snow.png'
import overcast from '../assets/overcast.png'
import partlyCloudy from '../assets/partly_cloudy.png'
import partlyCloudyWithRain from '../assets/partly_cloudy_with_rain.png'
import rain from '../assets/rain.png'
import snow from '../assets/snow.png'
import thunderstorm from '../assets/thunderstorm.png'
import windy from '../assets/windy.png'

import clearSkyGif from '../assets/clear_sky.svg'
import heavyRainGif from '../assets/heavy_rain.svg'
import lightRainGif from '../assets/light_rain.svg'
import overcastGif from '../assets/overcast.svg'
import partlyCloudyGif from '../assets/partly_cloudy.svg'
import snowGif from '../assets/snow.svg'
import thunderstormGif from '../assets/thunderstorm.svg'

import luna from '../assets/luna.png'
import moon from '../assets/moon.png'
import {
  IoCloudy, // Nublado
  IoWater, // Agua para Humedad
} from 'react-icons/io5';
import { FaWind } from "react-icons/fa6";// para viento
import { GiStripedSun } from "react-icons/gi";// para UV Index
import { BsThermometerSun } from "react-icons/bs";

  type WeatherDescriptions =
  // Grupo 2xx: Tormentas
  | 'thunderstorm with light rain'      // Tormenta con lluvia ligera
  | 'thunderstorm with rain'            // Tormenta con lluvia
  | 'thunderstorm with heavy rain'      // Tormenta con lluvia intensa
  | 'light thunderstorm'                // Tormenta ligera
  | 'thunderstorm'                      // Tormenta
  | 'heavy thunderstorm'                // Tormenta intensa
  | 'ragged thunderstorm'               // Tormenta irregular
  | 'thunderstorm with light drizzle'   // Tormenta con llovizna ligera
  | 'thunderstorm with drizzle'         // Tormenta con llovizna
  | 'thunderstorm with heavy drizzle'   // Tormenta con llovizna intensa
  // Grupo 3xx: Llovizna
  | 'light intensity drizzle'           // Llovizna de intensidad ligera
  | 'drizzle'                           // Llovizna
  | 'heavy intensity drizzle'           // Llovizna de intensidad fuerte
  | 'light intensity drizzle rain'      // Lluvia con llovizna de intensidad ligera
  | 'drizzle rain'                      // Lluvia con llovizna
  | 'heavy intensity drizzle rain'      // Lluvia con llovizna de intensidad fuerte
  | 'shower rain and drizzle'           // Lluvia y llovizna
  | 'heavy shower rain and drizzle'     // Lluvia fuerte y llovizna
  | 'shower drizzle'                    // Llovizna en forma de lluvia
  // Grupo 5xx: Lluvia
  | 'light rain'                        // Lluvia ligera
  | 'moderate rain'                     // Lluvia moderada
  | 'heavy intensity rain'              // Lluvia de intensidad fuerte
  | 'very heavy rain'                   // Lluvia muy fuerte
  | 'extreme rain'                      // Lluvia extrema
  | 'freezing rain'                     // Lluvia helada
  | 'light intensity shower rain'       // Lluvia en forma de ducha de intensidad ligera
  | 'shower rain'                       // Lluvia en forma de ducha
  | 'heavy intensity shower rain'       // Lluvia en forma de ducha de intensidad fuerte
  | 'ragged shower rain'                // Lluvia en forma de ducha irregular
  // Grupo 6xx: Nieve
  | 'light snow'                        // Nieve ligera
  | 'snow'                              // Nieve
  | 'heavy snow'                        // Nieve intensa
  | 'sleet'                             // Aguanieve
  | 'light shower sleet'                // Aguanieve ligera
  | 'shower sleet'                      // Aguanieve en forma de ducha
  | 'light rain and snow'               // Lluvia ligera y nieve
  | 'rain and snow'                     // Lluvia y nieve
  | 'light shower snow'                 // Nieve ligera en forma de ducha
  | 'shower snow'                       // Nieve en forma de ducha
  | 'heavy shower snow'                 // Nieve intensa en forma de ducha
  // Grupo 7xx: Atmósfera
  | 'mist'                              // Neblina
  | 'smoke'                             // Humo
  | 'haze'                              // Calima
  | 'sand/dust whirls'                  // Remolinos de arena/polvo
  | 'fog'                               // Niebla
  | 'sand'                              // Arena
  | 'dust'                              // Polvo
  | 'volcanic ash'                      // Ceniza volcánica
  | 'squalls'                           // Chubascos
  | 'tornado'                           // Tornado
  // Grupo 800: Despejado
  | 'clear sky'                         // Cielo despejado
  // Grupo 80x: Nubes
  | 'few clouds'               // Pocas nubes (11-25%)
  | 'scattered clouds'         // Nubes dispersas (25-50%)
  | 'broken clouds'            // Nubes rotas (51-84%)
  | 'overcast clouds'         // Nublado (85-100%)

// Mapa de íconos usando imágenes
const iconMaps: { [key in WeatherDescriptions]: JSX.Element } = {
  // Tormentas
  'thunderstorm with light rain': <img src={thunderstorm.src} alt="Thunderstorm with Light Rain" className="w-5 h-5" />,
  'thunderstorm with rain': <img src={thunderstorm.src} alt="Thunderstorm with Rain" className="w-5 h-5" />,
  'thunderstorm with heavy rain': <img src={thunderstorm.src} alt="Thunderstorm with Heavy Rain" className="w-5 h-5" />,
  'light thunderstorm': <img src={thunderstorm.src} alt="Light Thunderstorm" className="w-5 h-5" />,
  'thunderstorm': <img src={thunderstorm.src} alt="Thunderstorm" className="w-5 h-5" />,
  'heavy thunderstorm': <img src={thunderstorm.src} alt="Heavy Thunderstorm" className="w-5 h-5" />,
  'ragged thunderstorm': <img src={thunderstorm.src} alt="Ragged Thunderstorm" className="w-5 h-5" />,
  'thunderstorm with light drizzle': <img src={cloudyWithLightning.src} alt="Thunderstorm with Light Drizzle" className="w-5 h-5" />,
  'thunderstorm with drizzle': <img src={thunderstorm.src} alt="Thunderstorm with Drizzle" className="w-5 h-5" />,
  'thunderstorm with heavy drizzle': <img src={thunderstorm.src} alt="Thunderstorm with Heavy Drizzle" className="w-5 h-5" />,

  // Llovizna
  'light intensity drizzle': <img src={lightRain.src} alt="Light Intensity Drizzle" className="w-5 h-5" />,
  'drizzle': <img src={lightRain.src} alt="Drizzle" className="w-5 h-5" />,
  'heavy intensity drizzle': <img src={lightRain.src} alt="Heavy Intensity Drizzle" className="w-5 h-5" />,
  'light intensity drizzle rain': <img src={lightRain.src} alt="Light Intensity Drizzle Rain" className="w-5 h-5" />,
  'drizzle rain': <img src={lightRain.src} alt="Drizzle Rain" className="w-5 h-5" />,
  'heavy intensity drizzle rain': <img src={heavyRain.src} alt="Heavy Intensity Drizzle Rain" className="w-5 h-5" />,
  'shower rain and drizzle': <img src={rain.src} alt="Shower Rain and Drizzle" className="w-5 h-5" />,
  'heavy shower rain and drizzle': <img src={heavyRain.src} alt="Heavy Shower Rain and Drizzle" className="w-5 h-5" />,
  'shower drizzle': <img src={lightRain.src} alt="Shower Drizzle" className="w-5 h-5" />,

  // Lluvia
  'light rain': <img src={lightRain.src} alt="Light Rain" className="w-5 h-5" />,
  'moderate rain': <img src={rain.src} alt="Moderate Rain" className="w-5 h-5" />,
  'heavy intensity rain': <img src={heavyRain.src} alt="Heavy Intensity Rain" className="w-5 h-5" />,
  'very heavy rain': <img src={heavyRain.src} alt="Very Heavy Rain" className="w-5 h-5" />,
  'extreme rain': <img src={heavyRain.src} alt="Extreme Rain" className="w-5 h-5" />,
  'freezing rain': <img src={snow.src} alt="Freezing Rain" className="w-5 h-5" />,
  'light intensity shower rain': <img src={lightRain.src} alt="Light Intensity Shower Rain" className="w-5 h-5" />,
  'shower rain': <img src={rain.src} alt="Shower Rain" className="w-5 h-5" />,
  'heavy intensity shower rain': <img src={heavyRain.src} alt="Heavy Intensity Shower Rain" className="w-5 h-5" />,
  'ragged shower rain': <img src={rain.src} alt="Ragged Shower Rain" className="w-5 h-5" />,

  // Nieve
  'light snow': <img src={lightSnow.src} alt="Light Snow" className="w-5 h-5" />,
  'snow': <img src={snow.src} alt="Snow" className="w-5 h-5" />,
  'heavy snow': <img src={snow.src} alt="Heavy Snow" className="w-5 h-5" />,
  'sleet': <img src={snow.src} alt="Sleet" className="w-5 h-5" />,
  'light shower sleet': <img src={snow.src} alt="Light Shower Sleet" className="w-5 h-5" />,
  'shower sleet': <img src={snow.src} alt="Shower Sleet" className="w-5 h-5" />,
  'light rain and snow': <img src={partlyCloudyWithRain.src} alt="Light Rain and Snow" className="w-5 h-5" />,
  'rain and snow': <img src={rain.src} alt="Rain and Snow" className="w-5 h-5" />,
  'light shower snow': <img src={lightSnow.src} alt="Light Shower Snow" className="w-5 h-5" />,
  'shower snow': <img src={snow.src} alt="Shower Snow" className="w-5 h-5" />,
  'heavy shower snow': <img src={snow.src} alt="Heavy Shower Snow" className="w-5 h-5" />,

  // Atmósfera
  'mist': <img src={foggyDay.src} alt="Mist" className="w-5 h-5" />,
  'smoke': <img src={foggyDay.src} alt="Smoke" className="w-5 h-5" />,
  'haze': <img src={foggyDay.src} alt="Haze" className="w-5 h-5" />,
  'sand/dust whirls': <img src={foggyDay.src} alt="Sand/Dust Whirls" className="w-5 h-5" />,
  'fog': <img src={foggyDay.src} alt="Fog" className="w-5 h-5" />,
  'sand': <img src={foggyDay.src} alt="Sand" className="w-5 h-5" />,
  'dust': <img src={foggyDay.src} alt="Dust" className="w-5 h-5" />,
  'volcanic ash': <img src={foggyDay.src} alt="Volcanic Ash" className="w-5 h-5" />,
  'squalls': <img src={windy.src} alt="Squalls" className="w-5 h-5" />,
  'tornado': <img src={windy.src} alt="Tornado" className="w-5 h-5" />,

  // Despejado
  'clear sky': <img src={clearSky.src} alt="Clear Sky" className="w-5 h-5" />,

  // Nubes
  'few clouds': <img src={fewClouds.src} alt="Few Clouds (11-25%)" className="w-5 h-5" />,
  'scattered clouds': <img src={partlyCloudy.src} alt="Scattered Clouds (25-50%)" className="w-5 h-5" />,
  'broken clouds': <img src={partlyCloudy.src} alt="Broken Clouds (51-84%)" className="w-5 h-5" />,
  'overcast clouds': <img src={overcast.src} alt="Broken Clouds (51-84%)" className="w-5 h-5" />,
};

const iconMap: { [key in WeatherDescriptions]: JSX.Element } = {
  // Tormentas
  'thunderstorm with light rain': <img src={thunderstormGif} alt="Thunderstorm with Light Rain" className="w-56 h-56" />,
  'thunderstorm with rain': <img src={thunderstormGif} alt="Thunderstorm with Rain" className="w-56 h-56" />,
  'thunderstorm with heavy rain': <img src={thunderstormGif} alt="Thunderstorm with Heavy Rain" className="w-56 h-56" />,
  'light thunderstorm': <img src={thunderstormGif} alt="Light Thunderstorm" className="w-56 h-56" />,
  'thunderstorm': <img src={thunderstormGif} alt="Thunderstorm" className="w-56 h-56" />,
  'heavy thunderstorm': <img src={thunderstormGif} alt="Heavy Thunderstorm" className="w-56 h-56" />,
  'ragged thunderstorm': <img src={thunderstormGif} alt="Ragged Thunderstorm" className="w-56 h-56" />,
  'thunderstorm with light drizzle': <img src={thunderstormGif} alt="Thunderstorm with Light Drizzle" className="w-56 h-56" />,
  'thunderstorm with drizzle': <img src={thunderstormGif} alt="Thunderstorm with Drizzle" className="w-56 h-56" />,
  'thunderstorm with heavy drizzle': <img src={thunderstormGif} alt="Thunderstorm with Heavy Drizzle" className="w-56 h-56" />,

  // Llovizna
  'light intensity drizzle': <img src={lightRainGif} alt="Light Intensity Drizzle" className="w-56 h-56" />,
  'drizzle': <img src={lightRainGif} alt="Drizzle" className="w-56 h-56" />,
  'heavy intensity drizzle': <img src={lightRainGif} alt="Heavy Intensity Drizzle" className="w-56 h-56" />,
  'light intensity drizzle rain': <img src={lightRainGif} alt="Light Intensity Drizzle Rain" className="w-56 h-56" />,
  'drizzle rain': <img src={lightRainGif} alt="Drizzle Rain" className="w-56 h-56" />,
  'heavy intensity drizzle rain': <img src={heavyRainGif} alt="Heavy Intensity Drizzle Rain" className="w-56 h-56" />,
  'shower rain and drizzle': <img src={lightRainGif} alt="Shower Rain and Drizzle" className="w-56 h-56" />,
  'heavy shower rain and drizzle': <img src={heavyRainGif} alt="Heavy Shower Rain and Drizzle" className="w-56 h-56" />,
  'shower drizzle': <img src={lightRainGif} alt="Shower Drizzle" className="w-56 h-56" />,

  // Lluvia
  'light rain': <img src={lightRainGif} alt="Light Rain" className="w-56 h-56" />,
  'moderate rain': <img src={lightRainGif} alt="Moderate Rain" className="w-56 h-56" />,
  'heavy intensity rain': <img src={heavyRainGif} alt="Heavy Intensity Rain" className="w-56 h-56" />,
  'very heavy rain': <img src={heavyRainGif} alt="Very Heavy Rain" className="w-56 h-56" />,
  'extreme rain': <img src={heavyRainGif} alt="Extreme Rain" className="w-56 h-56" />,
  'freezing rain': <img src={snowGif} alt="Freezing Rain" className="w-56 h-56" />,
  'light intensity shower rain': <img src={lightRainGif} alt="Light Intensity Shower Rain" className="w-56 h-56" />,
  'shower rain': <img src={lightRainGif} alt="Shower Rain" className="w-56 h-56" />,
  'heavy intensity shower rain': <img src={heavyRainGif} alt="Heavy Intensity Shower Rain" className="w-56 h-56" />,
  'ragged shower rain': <img src={heavyRainGif} alt="Ragged Shower Rain" className="w-56 h-56" />,

  // Nieve
  'light snow': <img src={snowGif} alt="Light Snow" className="w-56 h-56" />,
  'snow': <img src={snowGif} alt="Snow" className="w-56 h-56" />,
  'heavy snow': <img src={snowGif} alt="Heavy Snow" className="w-56 h-56" />,
  'sleet': <img src={snowGif} alt="Sleet" className="w-56 h-56" />,
  'light shower sleet': <img src={snowGif} alt="Light Shower Sleet" className="w-56 h-56" />,
  'shower sleet': <img src={snowGif} alt="Shower Sleet" className="w-56 h-56" />,
  'light rain and snow': <img src={snowGif} alt="Light Rain and Snow" className="w-56 h-56" />,
  'rain and snow': <img src={snowGif} alt="Rain and Snow" className="w-56 h-56" />,
  'light shower snow': <img src={snowGif} alt="Light Shower Snow" className="w-56 h-56" />,
  'shower snow': <img src={snowGif} alt="Shower Snow" className="w-56 h-56" />,
  'heavy shower snow': <img src={snowGif} alt="Heavy Shower Snow" className="w-56 h-56" />,

  // Atmosfera
  'mist': <img src={overcastGif} alt="Mist" className="w-56 h-56" />,
  'smoke': <img src={overcastGif} alt="Smoke" className="w-56 h-56" />,
  'haze': <img src={overcastGif} alt="Haze" className="w-56 h-56" />,
  'sand/dust whirls': <img src={overcastGif} alt="Sand/Dust Whirls" className="w-56 h-56" />,
  'fog': <img src={overcastGif} alt="Fog" className="w-56 h-56" />,
  'sand': <img src={overcastGif} alt="Sand" className="w-56 h-56" />,
  'dust': <img src={overcastGif} alt="Dust" className="w-56 h-56" />,
  'volcanic ash': <img src={overcastGif} alt="Volcanic Ash" className="w-56 h-56" />,
  'squalls': <img src={overcastGif} alt="Squalls" className="w-56 h-56" />,
  'tornado': <img src={thunderstormGif} alt="Tornado" className="w-56 h-56" />,

  // Cielo
  'clear sky': <img src={clearSkyGif} alt="Clear Sky" className="w-56 h-56" />,
  'few clouds': <img src={partlyCloudyGif} alt="Few Clouds" className="w-56 h-56" />,
  'scattered clouds': <img src={partlyCloudyGif} alt="Scattered Clouds" className="w-56 h-56" />,
  'broken clouds': <img src={partlyCloudyGif} alt="Broken Clouds" className="w-56 h-56" />,
  'overcast clouds': <img src={overcastGif} alt="Overcast Clouds" className="w-56 h-56" />,
};
const weatherGifs: { [key in WeatherDescriptions]: string } = {
  // Tormentas
  'thunderstorm with light rain': thunderstormGif,
  'thunderstorm with rain': thunderstormGif,
  'thunderstorm with heavy rain': thunderstormGif,
  'light thunderstorm': thunderstormGif,
  'thunderstorm': thunderstormGif,
  'heavy thunderstorm': thunderstormGif,
  'ragged thunderstorm': thunderstormGif,
  'thunderstorm with light drizzle': thunderstormGif,
  'thunderstorm with drizzle': thunderstormGif,
  'thunderstorm with heavy drizzle': thunderstormGif,

  // Llovizna
  'light intensity drizzle': lightRainGif,
  'drizzle': lightRainGif,
  'heavy intensity drizzle': lightRainGif,
  'light intensity drizzle rain': lightRainGif,
  'drizzle rain': lightRainGif,
  'heavy intensity drizzle rain': heavyRainGif,
  'shower rain and drizzle': lightRainGif,
  'heavy shower rain and drizzle': heavyRainGif,
  'shower drizzle': lightRainGif,

  // Lluvia
  'light rain': lightRainGif,
  'moderate rain': lightRainGif,
  'heavy intensity rain': heavyRainGif,
  'very heavy rain': heavyRainGif,
  'extreme rain': heavyRainGif,
  'freezing rain': snowGif,
  'light intensity shower rain': lightRainGif,
  'shower rain': lightRainGif,
  'heavy intensity shower rain': heavyRainGif,
  'ragged shower rain': heavyRainGif,

  // Nieve
  'light snow': snowGif,
  'snow': snowGif,
  'heavy snow': snowGif,
  'sleet': snowGif,
  'light shower sleet': snowGif,
  'shower sleet': snowGif,
  'light rain and snow': snowGif,
  'rain and snow': snowGif,
  'light shower snow': snowGif,
  'shower snow': snowGif,
  'heavy shower snow': snowGif,

  // Atmosfera
  'mist': overcastGif,
  'smoke': overcastGif,
  'haze': overcastGif,
  'sand/dust whirls': overcastGif,
  'fog': overcastGif,
  'sand': overcastGif,
  'dust': overcastGif,
  'volcanic ash': overcastGif,
  'squalls': overcastGif,
  'tornado': thunderstormGif,

  // Cielo
  'clear sky': clearSkyGif,
  'few clouds': partlyCloudyGif,
  'scattered clouds': partlyCloudyGif,
  'broken clouds': partlyCloudyGif,
  'overcast clouds': overcastGif,
};



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

  // Obtén el ícono animated según la descripción del clima.
  const gifUrl = weatherGifs[weather.description as WeatherDescriptions];
  const currentIcon = iconMap[weather.description.toLowerCase() as WeatherDescriptions] || <IoCloudy className="w-56 h-56 text-gray-200" />;

  return (
    <section className="min-h-screen bg-teal-300/80 flex justify-center items-center p-4">
      <div className="w-full lg:w-2/6 space-y-4">
        <article className="rounded-lg p-6">
          <header className="flex items-center justify-between">
            <h1 className="text-8xl font-semibold text-white">{temperatureInCelsius}°</h1>
               {/*{currentIcon} Icono más grande */}
               {gifUrl && <img src={gifUrl.src} alt={weather.description} className="w-56 h-56" />}
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
                <li className="font-semibold text-white flex justify-start">Day</li>
                <li className="font-semibold text-white flex justify-center">Precipitation</li>
                <li className="font-semibold text-white flex justify-center">Visual</li>
                <li className="font-semibold text-white flex justify-end">Temperature</li>

                {/* Datos */}
                {weather.dailyForecasts.map((forecast) => {
                  const dayName = new Date(forecast.date).toLocaleDateString('en-US', { weekday: 'long' });
                  const icon = iconMaps[forecast.description.toLowerCase() as WeatherDescriptions] || <IoCloudy className="w-5 h-5" />;

                  return (
                    <>
                      {/* Día */}
                      <li className="text-white flex justify-start">{dayName}</li>
                      
                      {/* Precipitación */}
                      <li className="flex justify-center  items-center text-white">
                        <GiWaterDrop className="w-3 h-3 text-teal-100/50 mr-1" />
                        <span className='text-teal-100/60 text-sm'>{forecast.cloudCover} %</span>
                      </li>
                      
                      {/* Íconos */}
                      <li className="flex justify-center  items-center space-x-2">
                        {icon}
                        <img src={luna.src} alt="Volcanic Ash" className="w-5 h-5" />
                      </li>
                      
                      {/* Temperaturas */}
                      <li className="flex justify-end text-white ">
                        <span className='font-bold mr-2'>{Math.round(forecast.tempMax)}°</span>
                        <span className='font-bold'>{Math.round(forecast.tempMin)}°</span>
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
              <BsThermometerSun className="w-8 h-8 text-white mb-2" />
              <h2 className="text-lg font-semibold text-white">Feels like</h2>
              <p className="text-2xl text-white">{Math.round(weather.feelsLike)}°C</p>
            </li>
            <li className="bg-teal-600/50 rounded-lg p-4 flex flex-col items-center">
              <IoWater className="w-8 h-8 text-white mb-2" />
              <h2 className="text-lg font-semibold text-white">Humidity</h2>
              <p className="text-2xl text-white">{weather.humidity}%</p>
            </li>
            <li className="bg-teal-600/50 rounded-lg p-4 flex flex-col items-center">
              <FaWind className="w-8 h-8 text-white mb-2" />
              <h2 className="text-lg font-semibold text-white">Wind</h2>
              <p className="text-2xl text-white">{weather.windSpeed} <span className='text-teal-100/60 text-sm'>km/h</span></p>
            </li>
            <li className="bg-teal-600/50 rounded-lg p-4 flex flex-col items-center">
              <GiStripedSun className="w-8 h-8 text-white mb-2" />
              <h2 className="text-lg font-semibold text-white">UV Index</h2>
              <p className="text-2xl text-white">N/A</p> {/* No UV index in current data */}
            </li>
          </ul>
        </section>
        <Footer/>
      </div>
    </section>
  );
}

{/*<li className="bg-teal-600/50 rounded-lg p-4 flex flex-col items-center">
              <IoCloudy className="w-8 h-8 text-white mb-2" />
              <h2 className="text-lg font-semibold text-white">Cloud Cover</h2>
              <p className="text-2xl text-white">{weather.cloudCover}%</p>
            </li>*/}