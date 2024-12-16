import CityList from '@/configs/CityList'
import React from 'react'
import DetectLocationBtn from './common/DetectLocationBtn';
import { GeoLocation } from '@/types/WeatherData';
import SearchInput from './common/SearchInput';

type SelectCityProp = {
    value: string;
    onCityChanged: (city: string) => void;
    onLocationChanged: (location: GeoLocation) => void;
    cityGeoLocation?: string;
}

const SelectCity = ({value, onCityChanged, onLocationChanged, cityGeoLocation} : SelectCityProp ) => {
    
    const changeCity = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onCityChanged(e.target.value);
    };

    const changeLocation = (location: GeoLocation) => {
        onLocationChanged(location);
    };

    const onCityPicked = (city: string) => {
        onCityChanged(city)
    }

    return (
        <div className='flex justify-between items-center'>
            <div className="flex items-center gap-x-4">
                <p className='font-bold text-lg lg:text-3xl'>Select Region:</p>
                <select
                    value={value}
                    className='p-2 rounded text-black lg:text-2xl'
                    onChange={changeCity}>
                    {
                        CityList.map(city => 
                        <option 
                            key={city}
                            value={city}>
                            {city}
                        </option>)
                    }
                </select>
            </div>
            <SearchInput onCityPicked={onCityPicked}/>
            <DetectLocationBtn location={cityGeoLocation} onLocationChanged={changeLocation}/>

        </div>
    )
}

export default SelectCity