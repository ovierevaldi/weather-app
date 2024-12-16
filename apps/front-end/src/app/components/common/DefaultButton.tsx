import React from 'react'

type DefaultButtonProp = {
    children: React.ReactNode;
    type: "submit" | "reset" | "button" | undefined
    isDisabled: boolean
}

const DefaultButton = ({children, type, isDisabled}: DefaultButtonProp) => {
  return (
    <button 
        className='p-2 bg-white text-black rounded-lg hover:bg-gray-200 disabled:bg-gray-200'
        disabled={isDisabled}
        type={type}>
        {children}
    </button>
  )
}

export default DefaultButton