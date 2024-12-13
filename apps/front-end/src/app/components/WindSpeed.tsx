import { WindSpeedUnit } from '@/configs/WindSpeedData'
import React from 'react'

type WindSpeedProp = {
    value_kph: number,
    value_mph: number,
    selected_value: WindSpeedUnit
}

const WindSpeed = ({value_kph, value_mph, selected_value} : WindSpeedProp) => {
  return (
    <div className="font-medium text-xl">
        {selected_value.symbol === 'kph' ? value_kph : value_mph} / {selected_value.symbol}    
    </div>
  )
}

export default WindSpeed