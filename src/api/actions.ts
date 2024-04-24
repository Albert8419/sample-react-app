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

export const getAQIData = async (city: string): Promise<AQIData> => {
  try {
    const aqiData = await fetchAQIData(city);
    return aqiData;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.status === 404 ? "City not found" : error.message;
      throw new Error(message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
