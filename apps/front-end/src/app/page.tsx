'use client'

import { useEffect, useState } from "react";
import SelectCity from "./components/SelectCity";
import WeatherCard from "./components/WeatherCard";
import CityList from "@/configs/CityList";
import { getUserData } from "@/libs/CookieProvider";
import { UserData } from "@/types/UserData";
import ApiProvider from "@/libs/ApiProvider";
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
    <main>
      <div className="flex">
        <div className="space-y-4">

           <SelectCity 
            value={selectedCity} 
            onCityChanged={changeCity}
            />
          <WeatherCard selectedCity={selectedCity} favCityList={userData?.favourite_cities || []}/>
        </div>
      </div>
    </main>
  );
}
