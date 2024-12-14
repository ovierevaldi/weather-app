'use client'

import Degree, { TemperatureUnit } from "@/configs/Degree"
import WindSpeedData, { WindSpeedUnit } from "@/configs/WindSpeedData"
import ApiProvider from "@/libs/ApiProvider"
import { WeatherDataProps } from "@/types/WeatherData"
import Image from "next/image"
import { useEffect, useState } from "react"
import WindSpeed from "./WindSpeed"
import Loading from "./common/Loading"
import ErrorApi from "./common/ErrorApi"
import FavCityBtn from "./FavCityBtn"
import { PostFavouriteCity, UserCookie} from "@/types/UserData"
import toast from "react-hot-toast"
import { getUserData, setUserData } from "@/libs/CookieProvider"

type WeatherCardProps = {
    selectedCity: string;
    favCityList: string[];
}

const WeatherCard = ({selectedCity, favCityList}: WeatherCardProps) => {
    const [weatherData, setWeatherData] = useState<WeatherDataProps | null>(null);
    const [isLoadApi, setIsLoadApi] = useState(false);
    const [isErrorApi, setIsErrorApi] = useState(false);
    const [refetchApi, setRefetchApi] = useState(0);
    const [selectedDegree] = 
    useState<TemperatureUnit>(Degree.celcius);
    const [selectedWindSpeed] = 
    useState<WindSpeedUnit>(WindSpeedData.kph);
    const [postFavourite, setPostFavourite] = useState<{isPost: boolean; value: boolean}>({isPost: false, value: false});


    const retryFetchApi = () => {
        return setRefetchApi(refetchApi + 1);
    };

    const isFavCity = (): boolean => {
        const result =  favCityList.find(city => city === selectedCity);
        if(result)
            return true;
        else
            return false;
    }

    useEffect(() =>{
        const getWeather = async () => {
          try {
            setIsLoadApi(true);
    
            setWeatherData(await ApiProvider.getCurrentWeather(selectedCity) as WeatherDataProps);

            setIsErrorApi(false);
    
          } catch (error) {
            if(error)
                setIsErrorApi(true);
          } finally{
            setIsLoadApi(false)
          }
        };
        getWeather();

    }, [refetchApi, selectedCity]);

    useEffect(() => {
        const setFavourite = async (state: {isPost: boolean; value: boolean}) => {
            if (state.isPost) {
                const data: PostFavouriteCity = {
                    city: selectedCity,
                    value: state.value
                };
                
                const userData = getUserData() as UserCookie;
                // Create new User
                if(!userData){
                    try {
                        const result = await ApiProvider.createUser(data);
                        if(result.data){
                            setUserData({id: result.data.user_id});
                        }
                        
                        toast.success("Favourite City Added!")
                    } catch (error) {
                        if(error){
                            const err = error as Error;
                            toast.error(err.message)
                        }
                    }
                }
    
                // Update User Favourite
                else{
                    try {
                        console.log(state);
                        const response = await ApiProvider.updateFavouriteCity({id: userData.id, data: {...data}});
                        console.log(response)
                        if(response.value === 'add')
                            toast.success(response.value);
                        else{
                            toast.error(response.value)
                        }
                    } catch (error) {
                        const err = error as Error;
                        toast.error(err.message)
                    }
                };
                setPostFavourite({isPost: false, value: state.value});
            }
        };

        setFavourite(postFavourite);

    }, [postFavourite])

    return (
        <div className="">
            {
                isLoadApi && <Loading /> 
            }
            {
                isErrorApi && 
                <ErrorApi handleBtnClick={retryFetchApi}/>
            }
            {
                weatherData && !isLoadApi && !isErrorApi &&

                <div className="border rounded-lg px-8 py-6 relative space-y-4 max-w-md mx-auto">
                    <div className="flex items-center justify-center">
                        <Image 
                            src={ApiProvider.getCurrentWeatherIcon(weatherData.current.condition.icon)} 
                            alt="Weather Icon" 
                            width={100} 
                            height={100}>
                        </Image>
                        <p className="font-semibold">
                            {weatherData.current.condition.text}
                        </p>
                    </div>

                    <div className="text-5xl text-center font-semibold">
                        {weatherData.current.temp_c} <span>{'\u00B0'}{selectedDegree.symbol}</span>
                    </div>
                    
                    <div className="space-y-2">
                        <div>
                            Humidity:&nbsp;<span className="font-medium text-lg">{weatherData.current.humidity}</span>
                        </div>

                        <div className="flex items-center">
                            Wind Speed:&nbsp;
                            <WindSpeed value_kph={
                                weatherData.current.wind_kph
                            } value_mph={weatherData.current.gust_mph} selected_value={selectedWindSpeed}/>
                        </div>

                        
                    </div>

                    <div className="absolute top-0 right-0 -translate-y-2 -translate-x-2">
                            <FavCityBtn isFav={isFavCity()} onFavClicked={(state) => setPostFavourite({isPost: true, value: state})} />
                        </div>
                
                </div>
            }
        </div>
    )
}

export default WeatherCard