import React from 'react'

type DefaultButtonProp = {
    children: React.ReactNode;
    type: "submit" | "reset" | "button" | undefined
}

const DefaultButton = ({children, type}: DefaultButtonProp) => {
  return (
    <button 
        className='p-2 bg-white text-black rounded-lg hover:bg-gray-200'
        type={type}>
        {children}
    </button>
  )
}

export default DefaultButton