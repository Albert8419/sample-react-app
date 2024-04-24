interface AQIData {
  city: string;
  aqi: number;
  dominentpol: string;
  forecast: Forecast;
}

interface Forecast {
  daily: DailyForecast;
}

interface DailyForecast {
  pm10: AirQualityForecast[];
  pm25: AirQualityForecast[];
  o3: AirQualityForecast[];
}

interface AirQualityForecast {
  avg: number;
  day: string;
  max: number;
  min: number;
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

interface Debug {
  sync: string;
}
