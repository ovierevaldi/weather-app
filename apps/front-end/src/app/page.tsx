'use client'

import { useEffect, useState } from "react";
import SelectCity from "./components/SelectCity";
import WeatherCard from "./components/WeatherCard";
import CityList from "@/configs/CityList";
import { getUserData } from "@/libs/CookieProvider";
import { UserData } from "@/types/UserData";
import ApiProvider from "@/libs/ApiProvider";
import Forecast from "./components/Forecast";
import DetectLocationBtn from "./components/common/DetectLocationBtn";
export default function Home() {
  const [selectedCity, setSelectedCity] = useState(CityList[0]);

  const [userData, setUserData] = useState<null | UserData>(null);

  useEffect(() => {
    const userData = getUserData();
    setUserData(userData)
  }, [])

  useEffect(() => {
    const fetchUserData = async () => {
        if(userData){
          const data = await ApiProvider.getUserData(userData.id);
          setUserData(data);
        }
    };
    fetchUserData();
    
  }, [userData])

  const changeCity = (city: string) => {
    setSelectedCity(city);
  };
  

  return (
    <main className="space-y-8 p-4 max-w-7xl mx-auto">
      <div>
        <SelectCity 
          value={selectedCity} 
          onCityChanged={changeCity} />
        {/* <DetectLocationBtn /> */}
      </div>
     <div className="space-y-12">
      <div>
          <p className='text-2xl lg:text-3xl font-bold mb-4'>Current</p>
          <div className="">
            <WeatherCard selectedCity={selectedCity} favCityList={userData?.favourite_cities || []}/>
          </div>
        </div>
        <div>
          <p className='text-2xl lg:text-3xl font-bold mb-4'>Forecast</p>
          <Forecast selected_city={selectedCity}/>
        </div>
     </div>
    </main>
  );
}
