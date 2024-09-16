import React from 'react'
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
// Props para el componente
interface GifProviderProps {
    description: WeatherDescriptions;
}

export default function WeatherGif({ description }: GifProviderProps) {

    const weatherGifs: Record<WeatherDescriptions, { src: string }> = {
        // Tormentas
        'thunderstorm with light rain': { src: '../assets/thunderstorm.svg' },
        'thunderstorm with rain': { src: './assets/thunderstorm.svg' },
        'thunderstorm with heavy rain': { src: '/assets/thunderstorm.svg' },
        'light thunderstorm': { src: '/assets/thunderstorm.svg' },
        'thunderstorm': { src: '/assets/thunderstorm.svg' },
        'heavy thunderstorm': { src: '/assets/thunderstorm.svg' },
        'ragged thunderstorm': { src: '/assets/thunderstorm.svg' },
        'thunderstorm with light drizzle': { src: '/assets/thunderstorm.svg' },
        'thunderstorm with drizzle': { src: '/assets/thunderstorm.svg' },
        'thunderstorm with heavy drizzle': { src: '/assets/thunderstorm.svg' },
      
        // Llovizna
        'light intensity drizzle': { src: '/assets/light_rain.svg' },
        'drizzle': { src: '/assets/light_rain.svg' },
        'heavy intensity drizzle': { src: '/assets/light_rain.svg' },
        'light intensity drizzle rain': { src: '/assets/light_rain.svg' },
        'drizzle rain': { src: '/assets/light_rain.svg' },
        'heavy intensity drizzle rain': { src: '/assets/heavy_rain.svg' },
        'shower rain and drizzle': { src: '/assets/light_rain.svg' },
        'heavy shower rain and drizzle': { src: '/assets/heavy_rain.svg' },
        'shower drizzle': { src: '/assets/light_rain.svg' },
      
        // Lluvia
        'light rain': { src: '/assets/light_rain.svg' },
        'moderate rain': { src: '/assets/light_rain.svg' },
        'heavy intensity rain': { src: '/assets/heavy_rain.svg' },
        'very heavy rain': { src: '/assets/heavy_rain.svg' },
        'extreme rain': { src: '/assets/heavy_rain.svg' },
        'freezing rain': { src: '/assets/snow.svg' },
        'light intensity shower rain': { src: '/assets/light_rain.svg' },
        'shower rain': { src: '/assets/light_rain.svg' },
        'heavy intensity shower rain': { src: '/assets/heavy_rain.svg' },
        'ragged shower rain': { src: '/assets/heavy_rain.svg' },
      
        // Nieve
        'light snow': { src: '/assets/snow.svg' },
        'snow': { src: '/assets/snow.svg' },
        'heavy snow': { src: '/assets/snow.svg' },
        'sleet': { src: '/assets/snow.svg' },
        'light shower sleet': { src: '/assets/snow.svg' },
        'shower sleet': { src: '/assets/snow.svg' },
        'light rain and snow': { src: '/assets/snow.svg' },
        'rain and snow': { src: '/assets/snow.svg' },
        'light shower snow': { src: '/assets/snow.svg' },
        'shower snow': { src: '/assets/snow.svg' },
        'heavy shower snow': { src: '/assets/snow.svg' },
      
        // Atmósfera
        'mist': { src: '/assets/overcast.svg' },
        'smoke': { src: '/assets/overcast.svg' },
        'haze': { src: '/assets/overcast.svg' },
        'sand/dust whirls': { src: '/assets/overcast.svg' },
        'fog': { src: '/assets/overcast.svg' },
        'sand': { src: '/assets/overcast.svg' },
        'dust': { src: '/assets/overcast.svg' },
        'volcanic ash': { src: '/assets/overcast.svg' },
        'squalls': { src: '/assets/overcast.svg' },
        'tornado': { src: '/assets/thunderstorm.svg' },
      
        // Cielo
        'clear sky': { src: '/assets/clear_sky.svg' },
        'few clouds': { src: '/assets/partly_cloudy.svg' },
        'scattered clouds': { src: '/assets/partly_cloudy.svg' },
        'broken clouds': { src: '/assets/partly_cloudy.svg' },
        'overcast clouds': { src: '/assets/overcast.svg' },
      };
      const gif = weatherGifs[description as WeatherDescriptions];
  return (
    <div>
        {gif ? (
        <img src={gif.src} alt={description} className="w-48 h-48" />
        ) : (
        <p>No GIF available</p>
        )}
    </div>
  )
}

