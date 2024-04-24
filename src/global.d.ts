interface WeatherData {
  city: string;
  temperature: number;
  humidity: number;
  wind: number;
  rain: number;
  aqi: number;
  idx: number;
  attributions: Attribution[];
  dominentpol: string;
  iaqi: IAQI;
  time: Time;
  forecast: Forecast;
  debug: Debug;
}

interface Attribution {
  url: string;
  name: string;
  logo?: string;
}

interface IAQI {
  co: AQIValue;
  h: AQIValue;
  no2: AQIValue;
  o3: AQIValue;
  p: AQIValue;
  pm10: AQIValue;
  pm25: AQIValue;
  so2: AQIValue;
  t: AQIValue;
  w: AQIValue;
}

interface AQIValue {
  v: number;
}

interface Time {
  s: string;
  tz: string;
  v: number;
  iso: string;
}

interface Forecast {
  daily: DailyForecast;
}

interface DailyForecast {
  o3: AirQualityForecast[];
  pm10: AirQualityForecast[];
  pm25: AirQualityForecast[];
  uvi: AirQualityForecast[];
}

interface AirQualityForecast {
  avg: number;
  day: string;
  max: number;
  min: number;
}

interface Debug {
  sync: string;
}
