'use client'

import React, { useEffect, useState } from 'react'
import DefaultInput from '../components/common/DefaultInput'
import DefaultButton from '../components/common/DefaultButton'
import Link from 'next/link'
import { RegisUserErrorApiProp, RegisUserProp } from '@/types/UserData'
import FormValidation from '@/libs/FormValidation'
import ApiProvider from '@/libs/ApiProvider'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { setUserData } from '@/libs/CookieProvider'

const page = () => {
     const [errorForm, setErrorForm] = useState({username: '', password: ''});
        const [isSubmittingForm, setIsSubmittingForm] = useState(false);
        
    const router = useRouter();

    const submitForm: React.FormEventHandler = async (e) => {
        e.preventDefault();
        const userData = new FormData(e.target as HTMLFormElement);
        const formValues = Object.fromEntries(userData.entries()) as RegisUserProp ;
        
        const validationResult = FormValidation().registerValidation(formValues);
        
        if(!validationResult.isSuccess && validationResult.errors){
            setErrorForm({
                username: validationResult.errors.username[0],
                password: validationResult.errors.password[0]
            })
        }
        else{
            setErrorForm({password: '', username: ''});
            const result = await login(validationResult.data as RegisUserProp);
            
            if(result.isSuccess){
                setUserData({id: result.data?.data.payload.id, username: result.data?.data.payload.username});
                router.push('/')
            }
        }
    };

    const login = async (userData: RegisUserProp) => {
        try {
            setIsSubmittingForm(true);
            const user = await ApiProvider.loginUser(userData);
            toast.success('Login Success');
            return {isSuccess: true, data: user}
        } catch (error) {
            const err = error as RegisUserErrorApiProp
            toast.error(err.message);
            return {isSuccess: false, data: null}
        } finally{
            setIsSubmittingForm(false);
        }
    }

  return (
    <div className='max-w-xl mx-auto space-y-8 border p-4 rounded'>
        <p className='text-center text-3xl font-semibold'>Welcome</p>
        <form onSubmit={submitForm} className='flex flex-col gap-y-8'>
            <div className='flex flex-col gap-y-2'>
                <label htmlFor='username' className='font-semibold'>Username</label>
                <DefaultInput id='username' name='username' type='text' autoComplete='username'/>
                {
                    errorForm.username && <p className='text-red-500 text-sm'>{errorForm.username}</p>
                }
            </div>

            <div className='flex flex-col gap-y-2'>
                <label 
                    className='font-semibold' htmlFor='password'>password
                </label>
                <DefaultInput id='password' name='password' type='password'/>
                {
                    errorForm.username && <p className='text-red-500 text-sm'>{errorForm.username}</p>
                }
            </div>

            <DefaultButton type='submit' isDisabled={isSubmittingForm}>
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