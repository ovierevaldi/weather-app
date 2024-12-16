'use client'

import Degree, { TemperatureUnit } from "@/configs/Degree"
import WindSpeedData, { WindSpeedUnit } from "@/configs/WindSpeedData"
import ApiProvider from "@/libs/ApiProvider"
import { GeoLocation, WeatherDataProps } from "@/types/WeatherData"
import Image from "next/image"
import { useEffect, useState } from "react"
import WindSpeed from "./WindSpeed"
import Loading from "./common/Loading"
import ErrorApi from "./common/ErrorApi"
import FavCityBtn from "./FavCityBtn"
import { PostFavouriteCity, UserCookie} from "@/types/UserData"
import toast from "react-hot-toast"
import { getUserData, setUserData } from "@/libs/CookieProvider"
import DateFormat from "@/libs/DateFormat"

type WeatherCardProps = {
    selectedCity: string;
    favCityList: string[];
    currentLocation: GeoLocation | null;
    cityDetectedOnGeo: (location: string) => void;
}

const WeatherCard = ({selectedCity, favCityList, currentLocation, cityDetectedOnGeo}: WeatherCardProps) => {
    const [weatherData, setWeatherData] = useState<WeatherDataProps | null>(null);
    const [isLoadApi, setIsLoadApi] = useState(false);
    const [isErrorApi, setIsErrorApi] = useState(false);
    const [refetchApi, setRefetchApi] = useState(0);
    const [selectedDegree] = 
    useState<TemperatureUnit>(Degree.celcius);
    const [selectedWindSpeed] = 
    useState<WindSpeedUnit>(WindSpeedData.kph);
    const [postFavourite, setPostFavourite] = useState<{isPost: boolean; value: boolean}>({isPost: false, value: false});
    const [prevLocation, setPrevLocation] = useState(currentLocation);
    const [prevSelectedCity, setPrevSelectedCity] = useState('');

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
            
            if(prevLocation !== currentLocation && currentLocation != null){
                setWeatherData(await ApiProvider.getCurrentWeather(currentLocation) as WeatherDataProps);
                setPrevLocation(currentLocation);
            }
            else if(prevSelectedCity !== selectedCity){
                setWeatherData(await ApiProvider.getCurrentWeather(selectedCity) as WeatherDataProps);
                setPrevSelectedCity(selectedCity);
            };

            setIsErrorApi(false);
    
          } catch (error) {
            if(error)
                setIsErrorApi(true);
          } finally{
            setIsLoadApi(false)
          }
        };
        getWeather();

    }, [refetchApi, selectedCity, currentLocation, prevLocation, prevSelectedCity]);

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

    }, [postFavourite, selectedCity]);

    useEffect(() => {
        const setLocationOnGeo = () => {
            if(weatherData?.location.name)
                cityDetectedOnGeo(weatherData?.location.name)
        };
        setLocationOnGeo();
    }, [currentLocation, cityDetectedOnGeo, weatherData?.location.name])


    return (
        <div>
            {
                weatherData && !isLoadApi && !isErrorApi && 
                <div>
                    <p className="text-center text-3xl font-bold mb-4">{weatherData.location.name}</p>
                </div>
            }    
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
                    {
                       <p className='text-center text-xl font-bold'> {DateFormat().getDayName(weatherData.location.localtime)}, <span>{weatherData.location.localtime.split(' ')[1]}</span></p>
                    }
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