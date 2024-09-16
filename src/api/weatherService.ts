const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const apiKey = process.env.API_KEY;

export interface WeatherDTO {
    id: number;
    description: string;
    temperature: number;
    humidity: number;
    uvIndex: number;
    cloudCover: number;
    feelsLike: number;
    tempMin: number;
    tempMax: number;
    windSpeed: number; // Velocidad del viento en km/h
    dailyForecasts: Array<DailyForecast>;
}

interface DailyForecast {
    date: string;
    tempMin: number;
    tempMax: number;
    description: string;
    cloudCover: number; // Cantidad de nubes en porcentaje
    pop: number; // Probabilidad de precipitación en porcentaje
}

export const getWeatherByCity = async (cityName: string): Promise<WeatherDTO> => {
    try {

        //console.log('API_URL:', apiUrl);
        //console.log('API_KEY:', apiKey);
        const response = await fetch(`${apiUrl}?q=${cityName}&appid=${apiKey}&units=metric`);

         // Log the response URL and status
         //console.log('Response URL:', response.url);
         //console.log('Response Status:', response.status);
        if (!response.ok) {
            const errorDetails = await response.json();
            throw new Error(errorDetails.message || 'Failed to fetch weather data');
        }

        const data = await response.json();
        return transformToWeatherDTO(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
};

// Función para convertir metros por segundo a kilómetros por hora
const convertWindSpeedToKmh = (speed: number): number => {
    return speed * 3.6;
  };
const transformToWeatherDTO = (data: any): WeatherDTO => {
    // Define the structure of the accumulator object
    const forecasts: Record<string, DailyForecast> = {};

    data.list.forEach((item: any) => {
        const date = new Date(item.dt * 1000).toISOString().split('T')[0];
        
        if (!forecasts[date]) {
            forecasts[date] = {
                date,
                tempMin: item.main.temp_min,
                tempMax: item.main.temp_max,
                description: item.weather[0].description,
                cloudCover: item.clouds.all,
                pop: item.pop || 0, // Añade esta línea para probabilidad de precipitación
            };
        } else {
            forecasts[date].tempMin = Math.min(forecasts[date].tempMin, item.main.temp_min);
            forecasts[date].tempMax = Math.max(forecasts[date].tempMax, item.main.temp_max);
            forecasts[date].pop = Math.max(forecasts[date].pop, item.pop || 0); // Actualiza probabilidad de precipitación
        }
    });

    const dailyForecasts = Object.values(forecasts).slice(0, 5); // Get forecasts for the next 5 days

    return {
        id: data.city.id,
        description: data.list[0].weather[0].description,
        temperature: data.list[0].main.temp, // Should already be in Celsius
        humidity: data.list[0].main.humidity,
        uvIndex: 0, // No UV index in this endpoint
        cloudCover: data.list[0].clouds.all,
        feelsLike: data.list[0].main.feels_like,
        tempMin: Math.min(...data.list.map((item: any) => item.main.temp_min)),
        tempMax: Math.max(...data.list.map((item: any) => item.main.temp_max)),
        windSpeed: convertWindSpeedToKmh(data.list[0].wind.speed), // Obtener la velocidad del viento del primer elemento
        dailyForecasts,
    };
};