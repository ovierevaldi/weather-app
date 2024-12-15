export type WeatherDataProps = {
    current: WeatherProp;
    location: LocationProp;
};

type WeatherProp = {
    cloud: number;
    dewpoint_c: number;
    dewpoint_f: number;
    feelslike_c: number;
    feelslike_f: number;
    gust_kph: number;
    gust_mph: number;
    humidity: number;
    heatindex_c: number;
    heatindex_f: number;
    is_day: number;
    last_updated: string;
    last_updated_epoch: number;
    precip_in: number;
    precip_mm: number;
    pressure_in: number;
    pressure_mb: number;
    temp_c: number;
    temp_f: number;
    uv: number;
    vis_km: number;
    vis_miles: number;
    wind_degree: number;
    wind_dir: string;
    wind_kph: number;
    wind_mph: number;
    windchill_c: number;
    windchill_f: number;
    condition: Condition;
}

type Condition = {
    text: string;
    icon: string;
    code: number;
}

type LocationProp = {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
};

type SummaryWeatherProp = {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    avgtemp_c: number;
    avgtemp_f: number;
    maxwind_mph: number;
    maxwind_kph: number;
    totalprecip_mm: number;
    totalprecip_in: number;
    totalsnow_cm: number;
    avgvis_km: number;
    avgvis_miles: number;
    avghumidity: number;
    daily_will_it_rain: number;
    daily_chance_of_rain: number;
    daily_will_it_snow: number;
    daily_chance_of_snow: number;
    condition: Condition;
    uv: number;
};

export type ForecastWeatherProp = {
    current: WeatherProp;
    forecast: Forecast;
    location: LocationProp;
    
};

type Forecast = {
    forecastday: ForecastDay[]
}

type ForecastDay = {
    astro: AstronomyProp;
    date: string;
    date_epoch: number;
    day: SummaryWeatherProp;
    hour: HourlyWeatherProp[]
}

type HourlyWeatherProp = {
    time_epoch: number;
    time: string;
    current: WeatherProp
};

type AstronomyProp = {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    moon_phase: string;
    moon_illumination: number;
    is_moon_up: number;
    is_sun_up: number;
};

export type GeoLocation = {
    latitude: number;
    longitude: number;
}

