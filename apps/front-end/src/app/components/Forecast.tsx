import Degree, { TemperatureUnit } from '@/configs/Degree';
import ApiProvider from '@/libs/ApiProvider';
import { ForecastWeatherProp } from '@/types/WeatherData';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import WindSpeed from './WindSpeed';
import WindSpeedData, { WindSpeedUnit } from '@/configs/WindSpeedData';
import Loading from './common/Loading';

type ForecastProp = {
    selected_city: string;
    day_amount?: number;
}

const Forecast = ({selected_city, day_amount = 4} : ForecastProp) => {
    const [forecastData, setForecastData] = useState<ForecastWeatherProp | null>(null);
    const [selectedDegree] = useState<TemperatureUnit>(Degree.celcius);
    const [selectedWindSpeed] = useState<WindSpeedUnit>(WindSpeedData.kph);
    const [isFetchingApi, setIsFetchingApi] = useState(false);

    useEffect(() => {
        const forecastData = async () => {
            setIsFetchingApi(true);
            const response = await ApiProvider.getForecastData(selected_city, day_amount);
            setForecastData(response?.data as ForecastWeatherProp);
            setIsFetchingApi(false);
        };

        forecastData();
    }, [selected_city])

  return (
    <div>
        {
            forecastData && !isFetchingApi && 
            <div className='flex justify-between flex-wrap gap-y-8'>
                {
                    forecastData.forecast.forecastday.map((f_data, index) =>{
                        if(index != 0){
                            return(
                            <div key={index} className='border px-8 py-6 rounded-lg w-full space-y-2 max-w-xl mx-auto'>
                                <p className='text-center text-xl font-bold'>{f_data.date}</p>
                                <div className='flex items-center justify-center'>
                                    <Image 
                                        src={ApiProvider.getCurrentWeatherIcon(f_data.day.condition.icon)} 
                                        alt="Weather Icon" 
                                        width={100} 
                                        height={100}>
                                    </Image>
                                    <p className='font-semibold'>
                                        {f_data.day.condition.text}
                                    </p>
                                </div>
                                <div className='flex items-center'>
                                    <span>Avg Temp:&nbsp;</span>
                                    <span className='text-2xl font-semibold text-center'>
                                        {f_data.day.avgtemp_c} <span>{'\u00B0'}{selectedDegree.symbol}</span>
                                    </span>
                                </div>
                                <div>
                                    Avg Humidity:&nbsp;<span className="font-medium text-xl">{f_data.day.avghumidity}</span>
                                </div>

                                <div className="flex items-center">
                                    <span>Max Wind Speed: &nbsp;
                                    </span>
                                    <WindSpeed value_kph={
                                        f_data.day.maxwind_kph
                                    } value_mph={f_data.day.maxwind_mph} selected_value={selectedWindSpeed}/>
                                </div>
                            </div>) 
                        }
                    })
                }
            </div>
        }
        {
            isFetchingApi && <Loading />
        }
    </div>
  )
}

export default Forecast