import CityList from '@/configs/CityList'
import React from 'react'

type SelectCityProp = {
    value: string;
    onCityChanged: (city: string) => void
}

const SelectCity = ({value, onCityChanged} : SelectCityProp ) => {
    
    const changeCity = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onCityChanged(e.target.value)
    }

  return (
    <div className="flex items-center gap-x-4">
        <p className='font-bold text-lg lg:text-3xl'>Selected Region:</p>
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
  )
}

export default SelectCity