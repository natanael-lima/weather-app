import Image from "next/image";
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

export default function Home() {
  return (
    <section className="min-h-screen bg-teal-300/80 flex justify-center items-center p-4">
      <div className="w-full lg:w-3/6 space-y-4">
        <article className="rounded-lg p-6">
          <header className="flex items-center justify-between">
            <h1 className="text-6xl font-bold text-white">23°</h1>
            <WiDayCloudyHigh className="w-32 h-32 text-white" /> {/* Icono más grande */}
          </header>
          <p className="text-xl text-white mt-2">Cloudy</p>
          <div className="mt-2">
            <p className="text-lg text-teal-100 flex items-center mb-2">
              New York, NY
              <FaLocationDot size={15} className="ml-2" /> {/* Alineado con el texto */}
            </p>
            <form className="flex items-center border border-teal-300 rounded-lg overflow-hidden w-80">
              <input
                type="text"
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
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                  <li key={day} className="flex justify-between items-center text-white w-full">
                    {/* Día de la semana */}
                    <div className="text-lg font-semibold text-right">{day}</div>
                    
                    {/* Porcentaje de gotas (Humedad) */}
                    <div className="flex items-center">
                      <GiWaterDrop className="w-6 h-6 text-teal-200/50 mr-2" />
                      <span>60%</span>
                    </div>

                    {/* Dos íconos del clima */}
                    <div className="flex space-x-2">
                      <WiDaySunny className="w-8 h-8 text-yellow-300" />
                      <WiNightThunderstorm className="w-8 h-8 text-gray-200" />
                    </div>

                    {/* Temperaturas máxima y mínima */}
                    <div className="flex space-x-2">
                      <span>24°</span>
                      <span>18°</span>
                    </div>
                  </li>
                ))}
              </ul>
            </article>
        </section>

        <section>
          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <li className="bg-teal-600/50 rounded-lg p-4  flex flex-col items-center">
              <WiDayThunderstorm className="w-8 h-8 text-white mb-2" />
              <h2 className="text-lg font-semibold text-white">Feels like</h2>
              <p className="text-2xl text-white">25°</p>
            </li>
            <li className="bg-teal-600/50 rounded-lg p-4  flex flex-col items-center">
              <WiNightClear className="w-8 h-8 text-white mb-2" />
              <h2 className="text-lg font-semibold text-white">Humidity</h2>
              <p className="text-2xl text-white">65%</p>
            </li>
            <li className="bg-teal-600/50 rounded-lg p-4 flex flex-col items-center">
              <WiDayCloudyHigh className="w-8 h-8 text-white mb-2" />
              <h2 className="text-lg font-semibold text-white">Cloud Cover</h2>
              <p className="text-2xl text-white">80%</p>
            </li>
            <li className="bg-teal-600/50 rounded-lg p-4  flex flex-col items-center">
              <WiDaySunny className="w-8 h-8 text-white mb-2" />
              <h2 className="text-lg font-semibold text-white">UV Index</h2>
              <p className="text-2xl text-white">3</p>
            </li>
          </ul>
        </section>
      </div>
    </section>

  );
}
