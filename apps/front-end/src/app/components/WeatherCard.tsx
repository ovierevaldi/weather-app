'use client'

import Degree, { TemperatureUnit } from "@/configs/Degree"
import WindSpeedData, { WindSpeedUnit } from "@/configs/WindSpeedData"
import ApiProvider from "@/libs/ApiProvider"
import { WeatherDataProps } from "@/types/WeatherData"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import WindSpeed from "./WindSpeed"
import CityList from "@/configs/CityList"
import SelectCity from "./SelectCity"
import Loading from "./common/Loading"
import ErrorApi from "./common/ErrorApi"
import FavCityBtn from "./FavCityBtn"
import { PostFavouriteCity, UserCookie, UserData } from "@/types/UserData"
import toast from "react-hot-toast"
import { getUserData, setUserData } from "@/libs/CookieProvider"

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
    const [postFavourite, setPostFavourite] = useState(false);
    const hasMounted = useRef(false);

    const changeCity = (city: string) => {
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

    useEffect(() => {
        const setFavourite = async (state: boolean) => {
            if(state === true){
                const data: PostFavouriteCity = {
                    city: selectedCity,
                    value: state
                };
                
                const userData = getUserData() as UserCookie;
                // Create new User
                if(!userData){
                    try {
                        const result = await ApiProvider.createUser(data);
                        if(result.data){
                            setUserData({id: result.data.user_id});
                        }
                        
                        toast.success("Added Favourite")
                    } catch (error) {
                        toast.error('Cannot Set Favourite')
                    }
                }
                // Update User Favourite
                else{
                    try {
                        await ApiProvider.updateFavouriteCity({id: userData.id, data: {...data}});
                        toast.success("New Favourite City Added")
                    } catch (error) {
                        toast.error('Cannot Add Favourite City')
                    }
                };

                setPostFavourite(false);
            }
        };

        setFavourite(postFavourite)
    }, [postFavourite])

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

                   <div className="border rounded-lg p-4 relative">
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

                    <div className="absolute top-0 right-0 translate-y-2 -translate-x-2">
                        <FavCityBtn onFavClicked={(state) => setPostFavourite(state)}/>
                    </div>
                
                   </div>
                </div>
            }
        </div>
    )
}

export default WeatherCard