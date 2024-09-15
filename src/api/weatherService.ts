const API_URL = process.env.API_URL as string;
const API_KEY = process.env.API_KEY as string;

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
    dailyForecasts: Array<{
        date: string;
        tempMin: number;
        tempMax: number;
        description: string;
        cloudCover: number;
    }>;
}
interface DailyForecast {
    date: string;
    tempMin: number;
    tempMax: number;
    description: string;
    cloudCover: number;
}

export const getWeatherByCity = async (cityName: string): Promise<WeatherDTO> => {
    

    try {
        const response = await fetch(`${API_URL}?q=${cityName}&appid=${API_KEY}&units=metric`);
        
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
            };
        } else {
            forecasts[date].tempMin = Math.min(forecasts[date].tempMin, item.main.temp_min);
            forecasts[date].tempMax = Math.max(forecasts[date].tempMax, item.main.temp_max);
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
        dailyForecasts,
    };
};