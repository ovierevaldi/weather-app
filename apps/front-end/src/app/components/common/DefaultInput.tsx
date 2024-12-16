'use client'

import React, { useState } from 'react'

type DefaultInputProp = {
  type: React.HTMLInputTypeAttribute,
  autoComplete?: React.HTMLInputAutoCompleteAttribute,
  id: string,
  name: string,
  requiredField?: string
}

const DefaultInput = ({id, name, type, autoComplete, requiredField} : DefaultInputProp) => {
  const [isRequiredFieldShown, setIsRequiredFieldShown] = useState(false);

  const toggleRequiredField = () => {
    setIsRequiredFieldShown(!isRequiredFieldShown)
  }

  return (
    <div className=''>
      <input 
      type={type} 
      autoComplete={autoComplete}
      id={id}
      name={name}
      onFocus={toggleRequiredField}
      onBlur={toggleRequiredField}
      className='p-2 rounded-md shadow-sm bg-[#171717] border-white border w-full'/>
      {
        requiredField && isRequiredFieldShown &&
        <p className='text-sm'>{requiredField}</p>
      }
    </div>
  )
}

export default DefaultInput