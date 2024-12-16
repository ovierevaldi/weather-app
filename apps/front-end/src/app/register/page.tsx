'use client'

import Link from 'next/link'
import React, { useRef, useState } from 'react'
import DefaultButton from '../components/common/DefaultButton'
import DefaultInput from '../components/common/DefaultInput'
import FormValidation from '@/libs/FormValidation'
import { RegisUserErrorProp, RegisUserProp } from '@/types/UserData';

const page = () => {
    const formRef = useRef(null);
    const [errorForm, setErrorForm] = useState({username: '', password: ''});

    const submitForm: React.FormEventHandler = (e) => {
        e.preventDefault();
        const userData = new FormData(e.target as HTMLFormElement);
        const formValues = Object.fromEntries(userData.entries()) as RegisUserProp ;
        
        const validationResult = FormValidation().registerValidation(formValues);

        const pass = userData.get('password') as string;
        const retypePass = userData.get('retype-password') as string;
        
        if(!validationResult.isSuccess && validationResult.errors){
            setErrorForm({
                username: validationResult.errors.username[0],
                password: validationResult.errors.password[0]
            })
        }
        else{
            setErrorForm({password: '', username: ''});
        }
    };

  return (
    <div className='max-w-xl mx-auto space-y-8 border p-4 rounded'>
        <p className='text-center text-3xl font-semibold'>Create Account</p>
        <form ref={formRef} onSubmit={submitForm} 
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

            <DefaultButton type='submit'>
                Register
            </DefaultButton>

            <Link className='text-center cursor-pointer text-slate-200 hover:underline' href={'/login'}>Back to Login</Link>
        </form>
    </div>
  )
}

export default page