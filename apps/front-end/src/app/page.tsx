'use client'

import { useEffect, useState } from "react";
import SelectCity from "./components/SelectCity";
import WeatherCard from "./components/WeatherCard";
import CityList from "@/configs/CityList";
import { getUserData } from "@/libs/CookieProvider";
import { UserData } from "@/types/UserData";
import ApiProvider from "@/libs/ApiProvider";
import Forecast from "./components/Forecast";
import toast from "react-hot-toast";
import { GeoLocation } from "@/types/WeatherData";

export default function Home() {
  const [selectedCity, setSelectedCity] = useState(CityList[0]);
  const [userCookie, setUserCookie] = useState<null | UserData>(null);
  const [userData, setUserData] = useState<null | UserData>(null);
  const [currentLocation, setCurrentLocation] = useState<GeoLocation | null>(null);
  const [cityNameOnGeo, setCityNameOnGeo] = useState('');

  useEffect(() => {
    const userCookie = getUserData();
    setUserCookie(userCookie);
  }, [])

  useEffect(() => {
    const fetchUserData = async () => {
        if(userCookie){
         try {
            const data = await ApiProvider.getUserData(userCookie.id);
            setUserData(data);
         } catch (error) {
            const err = error as Error;
            toast.error(err.message)
         }
        }
    };
    fetchUserData();
  }, [userCookie]);

  const changeCity = (city: string) => {
    setSelectedCity(city);
  };

  const changeLocation = (location: GeoLocation) => {
    setCurrentLocation(location)
  }

  return (
    <main className="space-y-8 p-4 max-w-7xl mx-auto">
      <div>
        <SelectCity 
          value={selectedCity} 
          onCityChanged={changeCity} onLocationChanged={changeLocation} cityGeoLocation={cityNameOnGeo}/>
      </div>
     <div className="space-y-12">
      <div>
          <p className='text-2xl lg:text-3xl font-bold mb-4'>Current</p>
          <div className="">
            <WeatherCard selectedCity={selectedCity} favCityList={userData?.favourite_cities || []} currentLocation={currentLocation} cityDetectedOnGeo={(location) => {setCityNameOnGeo(location)}}/>
          </div>
        </div>
        <div>
          <p className='text-2xl lg:text-3xl font-bold mb-4'>Forecast <span className="text-xl font-normal">{`(Next 3 Days)`}</span> </p>
          <Forecast selected_city={selectedCity}/>
        </div>
     </div>
    </main>
  );
}
