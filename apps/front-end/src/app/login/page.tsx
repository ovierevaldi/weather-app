import React from 'react'
import DefaultInput from '../components/common/DefaultInput'
import DefaultButton from '../components/common/DefaultButton'
import Link from 'next/link'

const page = () => {
  return (
    <div className='max-w-xl mx-auto space-y-8 border p-4 rounded'>
        <p className='text-center text-3xl font-semibold'>Welcome</p>
        <form className='flex flex-col gap-y-8'>
            <div className='flex flex-col gap-y-2'>
                <label htmlFor='username' className='font-semibold'>Username</label>
                <DefaultInput id='username' name='username' type='text' autoComplete='username'/>
            </div>

            <div className='flex flex-col gap-y-2'>
                <label 
                    className='font-semibold' htmlFor='password'>password
                </label>
                <DefaultInput id='password' name='password' type='password'/>
            </div>

            <DefaultButton type='submit'>
                Login
            </DefaultButton>

            <Link href={'/register'} 
                className='text-center cursor-pointer text-slate-200 hover:underline'>
                    Don't Have Account?
            </Link>
        </form>
    </div>
  )
}

export default page