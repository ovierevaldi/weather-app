'use client'
import { useState } from "react"
import { FaStar } from "react-icons/fa"

type FavCityBtnProp = {
    isFav: boolean;
    onFavClicked: (state: boolean) => void;
}

const FavCityBtn = ({isFav, onFavClicked} : FavCityBtnProp) => {
    const [isFavourite, setIsFavourite] = useState(isFav);

    const setFavorite = (state: boolean) => {
        setIsFavourite(state);
        onFavClicked(state)
    };

  return (
    <button 
        className="border rounded-full p-1 hover:scale-105"
        onClick={() => setFavorite(!isFavourite)}>
        <FaStar size={30} color={isFavourite ? 'yellow' : 'white'}/>
    </button>
  )
}

export default FavCityBtn