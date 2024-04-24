import { useState, FormEvent } from "react";
import { getAQIData } from "../api/actions";
import "./AqiCard.css"; 

// Define the shape of your AQI data as an interface
interface AqiData {
  aqi: number;
  dominentpol: string;
  forecast: {
    daily: {
      pm10: Array<{ avg: number }>;
      pm25: Array<{ avg: number }>;
      o3: Array<{ avg: number }>;
    }
  };
}

const AqiCard = () => {
  const [data, setData] = useState<AqiData | null>(null);
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const [city, setCity] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoadingState(true);
    try {
      const res = await getAQIData(city); // You should ensure getAQIData returns a type that matches AqiData
      setError("");
      setData(res);
    } catch (error: any) {
      console.error(error.message); // Log the error message
      setData(null);
      setError("Error fetching AQI data");
    } finally {
      setLoadingState(false);
    }
  };

  return (
    <div className="aqi-card">
      {/* Top Section: Last Update Status or Error Message */}
      <div className="aqi-top-section">
        {data && <p>Latest site readings</p>}
        {error && <p className="aqi-error">{error}</p>}
      </div>
      
      {/* Middle Section: AQI Value and Details or Prompt */}
      <div className="aqi-middle-section">
        {data ? (
          <>
            <div className="aqi-value-city-wrapper">
              <div className="aqi-city-name">{city}</div>
              <div className="aqi-value">{data.aqi}</div>
            </div>
            <div className="aqi-details">
              <p>Dominant Pollutant: {data.dominentpol}</p>
              <p>PM10 Avg: {data.forecast.daily.pm10[0]?.avg}</p>
              <p>PM25 Avg: {data.forecast.daily.pm25[0]?.avg}</p>
              <p>O3 Avg: {data.forecast.daily.o3[0]?.avg}</p>
            </div>
          </>
        ) : (
          <p className="aqi-prompt">Please enter a city</p>
        )}
      </div>
      
      {/* Bottom Section: Search */}
      <div className="aqi-bottom-section">
        <form onSubmit={handleSearch} className="aqi-search-form">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="aqi-search-input"
            placeholder="Enter city name..."
          />
          <button type="submit" className={`aqi-search-button ${loadingState ? 'loading' : ''}`}>
            {loadingState ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AqiCard;

