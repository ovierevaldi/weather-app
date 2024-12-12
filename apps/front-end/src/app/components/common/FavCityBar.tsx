'use client';

import Degree, { TemperatureUnit } from '@/configs/Degree';
import ApiProvider from '@/libs/ApiProvider';
import { WeatherDataProps } from '@/types/WeatherData';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { IoIosRefresh } from "react-icons/io";
import toast from 'react-hot-toast';

type FavCityBarProp = {
    city_name: string
}


const FavCityBar = ({city_name} : FavCityBarProp) => {
    const [weatherData, setWeatherData] = useState<WeatherDataProps | null>(null);

    const [selectedDegree, setSelectedDegree] = 
    useState<TemperatureUnit>(Degree.celcius);
    
    const removeFavCity = () => {
        toast.error(`${city_name} Deleted`)
    };
    
    useEffect(() => {
        const getCityWeather = async () => {
            setWeatherData(await ApiProvider.getCurrentWeather(city_name) as WeatherDataProps);
        };

        getCityWeather();
    },[])

  return (
   <div>
        
        <div className='flex bg-white text-black justify-evenly py-1 rounded-lg items-center'>
            
            <div className='text-2xl w-1/4 text-center'>
                {city_name}
            </div>

            {
                !weatherData && 
                <p className='text-red-500'>Failed to fetch data...</p>
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