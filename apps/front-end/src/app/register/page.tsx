'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import DefaultButton from '../components/common/DefaultButton'
import DefaultInput from '../components/common/DefaultInput'
import FormValidation from '@/libs/FormValidation'
import { RegisUserErrorApiProp, RegisUserErrorProp, RegisUserProp } from '@/types/UserData';
import ApiProvider from '@/libs/ApiProvider'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

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
            const result = await postUserData(validationResult.data as RegisUserProp);
            if(result){
                router.push('/login')
            }
        }
    };

    const postUserData = async (userData: RegisUserProp) => {
        try {
            setIsSubmittingForm(true);
            await ApiProvider.registerUser(userData);
            toast.success('Success Create user');
            return true
        } catch (error) {
            const err = error as RegisUserErrorApiProp
            toast.error(err.message);
            return false
        } finally{
            setIsSubmittingForm(false);
        }
    }

  return (
    <div className='max-w-xl mx-auto space-y-8 border p-4 rounded'>
        <p className='text-center text-3xl font-semibold'>Create Account</p>
        <form onSubmit={submitForm} 
            className='flex flex-col gap-y-8'>
            <div className='flex flex-col gap-y-2'>
                <label htmlFor='username' className='font-semibold'>Username</label>
                <DefaultInput id='username' name='username' type='text' autoComplete='username' requiredField={!errorForm.username ? 'Min 8 Characters' : ''}/>
                {
                    errorForm.username && <p className='text-red-500 text-sm'>{errorForm.username}</p>
                }
            </div>

            <div className='flex flex-col gap-y-2'>
                <label 
                    className='font-semibold' htmlFor='password'>Password
                </label>
                <DefaultInput id='password' name='password' type='password' requiredField={!errorForm.password ? 'Min 8 Characters' : ''}/>
                {
                    errorForm.password && <p className='text-red-500 text-sm'>{errorForm.password}</p>
                }
            </div>

            <DefaultButton 
                type='submit'
                isDisabled={isSubmittingForm}>
                Register
            </DefaultButton>

            <Link className='text-center cursor-pointer text-slate-200 hover:underline' href={'/login'}>Back to Login</Link>
        </form>
    </div>
  )
}

export default page