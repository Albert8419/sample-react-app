import React, { useState } from "react";
import { AQIData, getAQIData } from "../api/actions";
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

const AqiCard: React.FC = () => {
  const [data, setData] = useState<AQIData | undefined>();
  const [loadingState, setLoadingState] = useState(false);
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const handleSearch = () => {
    setLoadingState(true);
    getAQIData(city)
      .then((res) => {
        setError("");
        setData(res);
      })
      .catch((error) => {
        console.error(error);
        setData(undefined);
        setError("Error fetching AQI data");
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
            <h1 className="text-3xl font-bold">{city}</h1>
            <p className="text-3xl font-bold">{data.aqi}</p>
            {data.aqi > 50 ? (
              <TiWeatherDownpour className="w-36 h-36" />
            ) : (
              <TiWeatherSunny className="w-36 h-36" />
            )}
            <p className="text-lg">Dominant Pollutant: {data.dominentpol}</p>
            <p className="text-lg">PM10 Avg: {data.forecast.daily.pm10[0]?.avg}</p>
            <p className="text-lg">PM25 Avg: {data.forecast.daily.pm25[0]?.avg}</p>
            <p className="text-lg">O3 Avg: {data.forecast.daily.o3[0]?.avg}</p>
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

export default AqiCard;
