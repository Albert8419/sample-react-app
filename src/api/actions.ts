import axios from "axios";

const API_BASE_URL = "https://silver-chainsaw-55x4pgvxg7rfj5g-3000.app.github.dev/api";

export interface AQIData {
  aqi: number;
  dominentpol: string;
  forecast: {
    daily: {
      pm10: { avg: number; day: string; max: number; min: number; }[];
      pm25: { avg: number; day: string; max: number; min: number; }[];
      o3: { avg: number; day: string; max: number; min: number; }[];
    }
  };
}

export interface WeatherData {
  city: string;
  temperature: number;
  humidity: number;
  wind: number;
  rain: number;
  aqi: number;
  dominentpol: string;
  pm10avg: number;
  pm25avg: number;
  o3avg: number;
}

const fetchAQIData = async (city: string): Promise<AQIData> => {
  const response = await axios.get(`${API_BASE_URL}/aqi/${city}`);
  return response.data.data;
};

export const getWeatherData = async (city: string): Promise<WeatherData> => {
  try {
    const weatherResponse = await axios.get(`${API_BASE_URL}/weather/${city}`);
    const { temperature, humidity, wind, rain } = weatherResponse.data;
    const aqiData = await fetchAQIData(city);
    const { aqi, dominentpol } = aqiData;
    const pm10avg = aqiData.forecast.daily.pm10.find(d => d.day === "2024-04-25")?.avg || 0;
    const pm25avg = aqiData.forecast.daily.pm25.find(d => d.day === "2024-04-25")?.avg || 0;
    const o3avg = aqiData.forecast.daily.o3.find(d => d.day === "2024-04-25")?.avg || 0;

    return {
      city: city,
      temperature,
      humidity,
      wind,
      rain,
      aqi,
      dominentpol,
      pm10avg,
      pm25avg,
      o3avg,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.status === 404 ? "City not found" : error.message;
      throw new Error(message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
