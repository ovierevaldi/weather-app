'use client'

import { deleteUserData, getUserData } from '@/libs/CookieProvider'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaUser } from 'react-icons/fa'
import { FaPowerOff } from 'react-icons/fa'

const UserProfileBtn = () => {
    const [username, setUsername] = useState('');
    const [isHover, setIsHover] = useState(false);
    const [refetch, setRefetch] = useState(0)
    
    useEffect(() => {
        const getUsername= () => {
            const userData = getUserData();
            if(userData){
                setUsername(userData.username)
            }
        }
        getUsername();
    }, [refetch]);
    
    
    const logoutUser = () => {
        deleteUserData();
        setUsername('');
        toast.success("User logged out")
        setRefetch(refetch + 1)
    }

  return (
    <Link href={'/login'}>
        <button
            onClick={() => {
                if(isHover && username){
                    logoutUser();
                }
            }}
        onMouseEnter={() => setIsHover(!isHover)}
        onMouseLeave={() => setIsHover(!isHover)}
        className={`px-4 py-3 bg-white text-black rounded hover:scale-105 ease-linear duration-100 ${username ? 'hover:bg-red-500' : ''}`}>
        {
            !username && 
            <div className='flex items-center gap-x-2'>
                <span className='lg:text-xl'> Login </span>
                <FaUser size={20} color='black' />
            </div>
            
        }
        {
            username && 
                <div>
                {
                    !isHover && 
                    <div className='flex items-center gap-x-2'>
                        <span className='lg:text-xl'> {username} </span>
                        <FaUser size={20} color='black' />
                    </div>
                }
                {
                    isHover && 
                    <div className='flex items-center gap-x-2'>
                        <span className='lg:text-xl text-white'> Logout? </span>
                        <FaPowerOff size={20} color='white' />
                    </div>
                }
            </div>
        }
    </button>
    </Link>
  )
}

export default UserProfileBtn