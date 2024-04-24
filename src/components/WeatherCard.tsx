import React, { useState } from "react";
import { WeatherData, getWeatherData } from "../api/actions";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Button,
} from "@nextui-org/react";
import { TiWeatherDownpour, TiWeatherSunny } from "react-icons/ti";

const WeatherCard: React.FC = () => {
  const [data, setData] = useState<WeatherData>();
  const [loadingState, setLoadingState] = useState(false);
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const handleSearch = () => {
    setLoadingState(true);
    getWeatherData(city)
      .then((res) => {
        setError("");
        setData(res);
      })
      .catch((error) => {
        console.error(error);
        setData(undefined);
        setError("Error fetching weather data");
      })
      .finally(() => {
        setLoadingState(false);
      });
  };

  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <div className="flex flex-col w-full p-2 space-y-4">
            <Input
              id="cityname"
              type="text"
              label="City"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
            <Button
              isLoading={loadingState}
              type="submit"
              color="primary"
            >
              Search
            </Button>
          </div>
        </form>
      </CardHeader>
      <Divider />
      {data ? (
        <CardBody>
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold">{data.city}</h1>
            <p className="text-3xl font-bold">{data.temperature}°C</p>
            {data.temperature > 20 ? (
              <TiWeatherSunny className="w-36 h-36" />
            ) : (
              <TiWeatherDownpour className="w-36 h-36" />
            )}
            <p className="text-lg">Humidity: {data.humidity}%</p>
            <p className="text-lg">Wind: {data.wind} km/h</p>
            <p className="text-lg">Rain: {data.rain} %</p>
            <p className="text-lg">AQI: {data.aqi}</p>
            <p className="text-lg">Dominent Pollutant: {data.dominentpol}</p>
            <p className="text-lg">PM10 Avg: {data.pm10avg}</p>
            <p className="text-lg">PM25 Avg: {data.pm25avg}</p>
            <p className="text-lg">O3 Avg: {data.o3avg}</p>

          </div>
        </CardBody>
      ) : (
        <CardBody>
          <div className="flex flex-col items-center">
            <p className="text-xl font-bold">Please enter a city</p>
          </div>
        </CardBody>
      )}
      <Divider />
      <CardFooter>
        <div className="flex flex-col items-left">
          {error && <p className="text-xs text-red-600">{error}</p>}
          {data && (
            <p className="text-xs text-gray-600">Last update successful.</p>
          )}
          {!data && (
            <p className="text-xs text-gray-600">Waiting for input...</p>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default WeatherCard;
