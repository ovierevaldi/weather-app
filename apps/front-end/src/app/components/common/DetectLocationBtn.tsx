import { GeoLocation } from '@/types/WeatherData';
import React from 'react'
import toast from 'react-hot-toast';
import { CiLocationOn } from "react-icons/ci";

type DetectLocationBtnProp = {
  onLocationChanged: (location: GeoLocation) => void;
  location?: string
}

const DetectLocationBtn = ({onLocationChanged, location} : DetectLocationBtnProp )=> {

  const detectLocation = () => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          onLocationChanged({latitude, longitude})
      }, (error) => {
        console.error(`Error Code: ${error.code}, Message: ${error.message}`);
      })
    }
    else{
      toast.error('Geolocation is not supported by this browser')
    }
  }

  return (
    <div className=' flex items-center p-4 rounded gap-x-4'>
      <div>
        <p>Auto Detect:</p>
        {
          location && <p>{location}</p>
        }
      </div>
      <button onClick={detectLocation} className='p-2 bg-white rounded-lg hover:bg-slate-100 hover:scale-105 duration-100'>
        <CiLocationOn size={25} className='text-black'/>
      </button> 
    </div>
  )
}

export default DetectLocationBtn