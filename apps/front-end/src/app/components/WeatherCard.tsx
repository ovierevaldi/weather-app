'use client'

import Degree, { TemperatureUnit } from "@/configs/Degree"
import WindSpeedData, { WindSpeedUnit } from "@/configs/WindSpeedData"
import ApiProvider from "@/libs/ApiProvider"
import { WeatherDataProps } from "@/types/WeatherData"
import Image from "next/image"
import { useEffect, useState } from "react"
import WindSpeed from "./WindSpeed"
import CityList from "@/configs/CityList"
import SelectCity from "./SelectCity"
import Loading from "./common/Loading"
import ErrorApi from "./common/ErrorApi"

type WeatherCardProps = {
    data: WeatherDataProps
}

const WeatherCard = () => {
    const [weatherData, setWeatherData] = useState<WeatherDataProps | null>(null);
    const [isLoadApi, setIsLoadApi] = useState(false);
    const [isErrorApi, setIsErrorApi] = useState(false);
    const [refetchApi, setRefetchApi] = useState(0);
    const [selectedCity, setSelectedCity] = useState(CityList[0]);
    const [selectedDegree, setSelectedDegree] = 
    useState<TemperatureUnit>(Degree.celcius);
    const [selectedWindSpeed, setSelectedWindSpeed] = 
    useState<WindSpeedUnit>(WindSpeedData.kph);

    const changeCity = (city: string) => {
        console.log(city)
        setSelectedCity(city);
    };

    const retryFetchApi = () => {
        return setRefetchApi(refetchApi + 1);
    }

    useEffect(() =>{
        const getWeather = async () => {
          try {
            setIsLoadApi(true);
    
            setWeatherData(await ApiProvider.getCurrentWeather(selectedCity) as WeatherDataProps);

            setIsErrorApi(false)
    
          } catch (error) {
              console.log(error);
              setIsErrorApi(true);
              alert('Cannot get weather data');
          } finally{
            setIsLoadApi(false)
          }
        };
        getWeather();

      }, [refetchApi, selectedCity]);

    return (
        <div className="p-4">
            {
                isLoadApi && <Loading /> 
            }
            {
                isErrorApi && 
                <ErrorApi handleBtnClick={retryFetchApi}/>
            }
            {
                weatherData && !isLoadApi && !isErrorApi &&
                <div className="space-y-4">
                    <SelectCity value={selectedCity} onCityChanged={changeCity}/>

                   <div className="border rounded-lg p-4">
                    <div className="flex items-center">
                        <Image 
                            src={ApiProvider.getCurrentWeatherIcon(weatherData.current.condition.icon)} 
                            alt="Weather Icon" 
                            width={100} 
                            height={100}>
                        </Image>
                        <p>
                            {weatherData.current.condition.text}
                        </p>
                    </div>

                    <div className="text-5xl mb-4">
                        {weatherData.current.temp_c} <span>{'\u00B0'}{selectedDegree.symbol}</span>
                    </div>

                    <div>
                            Humidity: <span className="font-bold text-lg">{weatherData.current.humidity}</span>
                    </div>

                    <div className="flex items-center">
                        Wind Speed: 
                        <WindSpeed value_kph={
                            weatherData.current.wind_kph
                        } value_mph={weatherData.current.gust_mph} selected_value={selectedWindSpeed}/>
                    </div>

                   
                   </div>
                </div>
            }
        </div>
    )
}

export default WeatherCard