'use client'

import { useState } from "react"
import toast from "react-hot-toast"
import { FaStar } from "react-icons/fa"

type FavCityBtnProp = {
    isFav?: boolean;
    onFavClicked: (state: boolean) => void;
    showToats?:  boolean;
}

const FavCityBtn = ({isFav = false, onFavClicked, showToats = true} : FavCityBtnProp) => {
    const [isFavourite, setIsFavourite] = useState(isFav);

    const setFavorite = (state: boolean) => {
        setIsFavourite(state);

        if(showToats){
            if(state === true){
                toast.success('Added To Favourite!');
            }
            else{
                toast.error('Removed From Favourite!');
            };
        }

        onFavClicked(state)
    }
  return (
    <button 
        className="border rounded-full p-1 hover:scale-105"
        onClick={() => setFavorite(!isFavourite)}>
        <FaStar size={25} color={isFavourite ? 'yellow' : 'white'}/>
    </button>
  )
}

export default FavCityBtn