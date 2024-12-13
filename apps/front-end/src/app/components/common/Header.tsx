import { NavHeaderProp } from '@/types/UI-Types';
import Link from 'next/link'
import React from 'react'
import { FaStar } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";

const Header = () => {
    const listNavigation: NavHeaderProp[] = [
        {name: 'Home', url: '/', icon: <IoMdHome size={22}/>},
        {name: 'Fav Cities', url: '/favourite', icon:  <FaStar size={20} color='orange'/>}
    ];

  return (
    <div className='p-4 gap-x-4 flex justify-between border-b md:px-6'>
        {
            listNavigation.map(nav => 
            <Link
                key={nav.name}
                href={nav.url} 
                className='px-4 py-3 bg-white text-black rounded flex items-center gap-x-2 hover:scale-105 ease-linear duration-100'>
                <span> {nav.name} </span>
                {nav.icon}
            </Link>)
        }
    </div>
  )
}

export default Header