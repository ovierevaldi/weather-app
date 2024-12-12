'use client';

import Degree, { TemperatureUnit } from '@/configs/Degree';
import ApiProvider from '@/libs/ApiProvider';
import { WeatherDataProps } from '@/types/WeatherData';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import toast from 'react-hot-toast';
import { getUserData } from '@/libs/CookieProvider';

type FavCityBarProp = {
    city_name: string;
    onCityDeleted: () => void;
}


const FavCityBar = ({city_name, onCityDeleted} : FavCityBarProp) => {
    const [weatherData, setWeatherData] = useState<WeatherDataProps | null>(null);

    const [selectedDegree] = 
    useState<TemperatureUnit>(Degree.celcius);

    const [isLoading, setIsLoading] = useState(false);
    
    const removeFavCity = async () => {

        const data = {
            city: city_name,
            value: false
        };

        const userCookie = getUserData();
        if(userCookie){
            try {
                await ApiProvider.updateFavouriteCity({id: userCookie.id, data: data});
                toast.error(`${city_name} Deleted`);
                onCityDeleted();

            } catch (error) {
                if(error)
                    toast.error('Cannot Remove City')
            }
        }
    };
    
    useEffect(() => {
        const getCityWeather = async () => {
            try {
                setIsLoading(true);
                setWeatherData(await ApiProvider.getCurrentWeather(city_name) as WeatherDataProps);
            } catch (error) {
                if(error)
                    toast.error('Cannot get city weather');
            } finally{
                setIsLoading(false);
            }
        };

        getCityWeather();
    },[city_name])

  return (
   <div>
        
        <div className='flex bg-white text-black justify-evenly py-1 rounded-lg items-center'>
            
            <div className='text-2xl w-1/4 text-center'>
                {city_name}
            </div>

            {
                !weatherData && !isLoading &&
                <p className='text-red-500'>Failed to fetch data...</p>
            }
            {
                isLoading &&
                <p>Loading...</p>
            }
            {
                weatherData && 
                <div className='flex items-center gap-x-4 w-2/4 justify-center'>
                    <div className="flex items-center">
                        <Image 
                            src={ApiProvider.getCurrentWeatherIcon(weatherData.current.condition.icon)} 
                            alt="Weather Icon" 
                            width={70} 
                            height={70}>
                        </Image>
                        <p className='text-2xl'>
                            {weatherData.current.condition.text}
                        </p>
                    </div>
                    <div className="text-3xl">
                        {weatherData.current.temp_c} <span>{'\u00B0'}{selectedDegree.symbol}</span>
                    </div>
                </div>
            }
            <div className='flex gap-x-4 w-1/4 justify-end px-4'>
                {/* <button className='bg-slate-400 p-2 rounded'>
                    <IoIosRefresh size={30} color='white'/>
                </button> */}
                <button
                    onClick={removeFavCity}
                    className='bg-red-500 rounded-md p-2'>
                    <MdDelete size={30} color='white'/>
                </button>
            </div>
        </div>
   </div>
  )
}

export default FavCityBar