"use client";
import { apiClient } from '@/app/lib/apiClient';
import Link from 'next/link';
import React, { useActionState } from 'react'

export type LoginState = {
    error?: string;
    success?: boolean
}

const Login = () => {
    const [state, loginAction, isPending] = useActionState(
        async (prevState: LoginState, formData: FormData): Promise<LoginState> => {
            const name = formData.get("name") as string;
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;
            const teamCode = formData.get("teamCode") as string;
            try {
                await apiClient.login(email, password)
                window.location.href = "/dashboard";
                return { success: true }
            } catch (error) {
                return {
                    error: error instanceof Error ? error.message : 'Login failed'
                }
            }
        },
        {
            error: undefined,
            success: undefined,
        }
    );
    return (
        <div className='bg-slate-800 p-8 rounded-lg border-slate-700 w-full max-w-md'>
            <form action={loginAction}>
                <div className="text-center  mb-8">
                    <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
                    <p className="mt-2 text-sm text-slate-400">
                        Or  <Link className='font-medium text-blue-400 hover:text-blue-300' href={"/register"}>Sign up do not have account.</Link>
                    </p>
                </div>
                {
                    state.error && (
                        <div className="bg-red-900/50 border border-red-700 text-red-300 px-3 py-3 rounded mb-4">
                            {state.error}
                        </div>
                    )
                }
                <div className="space-y-4">
                    <div>
                        <label htmlFor="" className="block text-sm font-medium text-slate-300 mb-1">
                            Email
                        </label>
                        <input type="email" id='email' name='email' autoComplete='email' required placeholder='Enter your Email' className='w-full px-3 py-2 bg-slate-900 border border-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded' />
                    </div>
                    <div>
                        <label htmlFor="" className="block text-sm font-medium text-slate-300 mb-1">
                            Password
                        </label>
                        <input type="password" id='password' name='password' autoComplete='password' required  className='w-full px-3 py-2 bg-slate-900 border border-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded' placeholder='*************' />
                    </div>
                </div>
                <button type="submit" disabled={isPending} className='w-full mt-6 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer'>
                    {
                        isPending ? "Sign In..." :"Sign In"
                    }
                </button>
            </form>
        </div>
    )
}

export default Login