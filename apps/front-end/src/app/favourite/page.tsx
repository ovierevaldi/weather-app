'use client';

import React, { useEffect, useState } from 'react'
import FavCityBtn from '../components/FavCityBtn';
import ApiProvider from '@/libs/ApiProvider';
import { UserData } from '@/types/UserData';
import { getUserData } from '@/libs/CookieProvider';
import FavCityBar from '../components/common/FavCityBar';

const FavouriteCities = () => {
  const [userData, setUserData] = useState<undefined | UserData>(undefined);


  useEffect(() => {
    const getFavouriteCities = async () => {
      const userCookie = getUserData();

      if(userCookie){
        const userData = await ApiProvider.getUserFavouriteCity(userCookie.id);
        setUserData(userData)
      }
    };

    getFavouriteCities();
  }, [])

  return (
    <div>
      {
        !userData && 
        <div>
          <p className='text-center font-bold text-4xl mb-4'>There's no favourite</p>

          <div className='text-center flex items-center justify-center'>Try clicking &nbsp; <FavCityBtn showToats={false} isFav={true} onFavClicked={() => {}}/> &nbsp; button to add your favourite city here</div>
        </div>
      }{
        userData && 
        <div>
          <div className='items-center flex justify-center gap-x-4 mb-8'>
            <p className='text-center text-2xl font-bold'>Your Favourite Cities </p>
            <FavCityBtn showToats={false} isFav={true} onFavClicked={() => {}}/>
          </div>
           {/* <div className='flex justify-evenly mb-4'>
              <p className='font-bold text-center'>City</p>
              <p className='font-bold text-center'>Status</p>
          </div> */}
          <div className='space-y-6'>
            {
              userData.favourite_cities.map(value => 
              <FavCityBar key={value} city_name={value}/>
            )
            }
          </div>
        </div>
      }
    </div>
  )
}

export default FavouriteCities