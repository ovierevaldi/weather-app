'use client'

import Degree, { TemperatureUnit } from "@/configs/Degree"
import WindSpeedData, { WindSpeedUnit } from "@/configs/WindSpeedData"
import ApiProvider from "@/libs/ApiProvider"
import { WeatherDataProps } from "@/types/WeatherData"
import Image from "next/image"
import { useEffect,useState } from "react"
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
    const [postFavourite, setPostFavourite] = useState(false);


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

            setIsErrorApi(false)
    
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
                        
                        toast.success("Favourite City Added!")
                    } catch (error) {
                        if(error)
                            toast.error('Cannot Set Favourite.')
                    }
                }

                // Update User Favourite
                else{
                    try {
                        await ApiProvider.updateFavouriteCity({id: userData.id, data: {...data}});
                        toast.success("New Favourite City Added")
                    } catch (error) {
                        if(error)
                            toast.error('Cannot Add Favourite City')
                    }
                };

                setPostFavourite(false);
            }
        };

        setFavourite(postFavourite)
    }, [postFavourite, selectedCity])

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
                            <FavCityBtn isFav={isFavCity()} onFavClicked={(state) => setPostFavourite(state)} />
                        </div>
                
                </div>
            }
        </div>
    )
}

export default WeatherCard