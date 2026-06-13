"use client";
import { useRouter } from 'next/navigation';
import {useForm} from 'react-hook-form';
import React, { useState } from 'react';

type FormData = {
    email: string;
    password: string;
};

const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);
    const [rememberMe, setRememberMe] = useState(false);
    const router = useRouter();

    const {register, handleSubmit, formState:{errors}} = useForm<FormData>();

    const onSubmit = (data:FormData) => {
        
    }
    return (
        <div className='w-full py-10 min-h-[85vh] bg-rgba(169, 27, 169, 0.18)'>
            <h1 className='text-4xl font-Poppins font-semibold text-black text-center'>
                Login
            </h1>
            <p className='text-center text-lg font-medium py-3 text-[#0000005c]'>
                Home . Login
            </p>
        </div>
    )
}

export default Login;