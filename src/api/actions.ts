import axios, { AxiosError } from "axios";

// Update API_URL to point to the AQI API endpoint
const API_URL = "https://silver-chainsaw-55x4pgvxg7rfj5g-3000.app.github.dev/api";

// Modify WeatherData interface to include AQI-related fields
interface WeatherData {
  city: string;
  temperature: number;
  humidity: number;
  wind: number;
  rain: number;
  aqi: number; // Add AQI field
}

// Fetch weather data including AQI
export const getWeatherData = async (city: string): Promise<WeatherData> => {
  return new Promise<WeatherData>((resolve, reject) => {
    axios
      .get(`${API_URL}/weather/${city}`)
      .then((res) => {
        // Fetch AQI data here if available in the API response
        const { temperature, humidity, wind, rain, aqi } = res.data;
        resolve({
          city: city,
          temperature,
          humidity,
          wind,
          rain,
          aqi, // Assign AQI field
        });
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response?.status === 404) {
            reject("City not found");
          } else {
            // It's a good practice to reject with an Error object
            reject(axiosError.message);
          }
        } else {
          // Handle non-Axios errors
          reject("An unknown error occurred");
        }
      });
  });
};
