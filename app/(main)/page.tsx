import Link from 'next/link';
import React from 'react'

const Home = () => {
    const user = false;
    return (
        <div className='max-w-4xl mx-auto'>
            <h1 className='text-3xl font-bold mb-6 text-white'>
                Team Access Control Demo
            </h1>
            <p className='text-slate-300 mb-8'>
                This is demo showcase next.js 16 access control feature with role based permissions.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* card 1 */}
                <div className="bg-slate-800 p-6 border border-slate-700 rounded-l-lg">
                    <h3>Features Demonstrated</h3>
                    <ul className='list-disc list-inside space-y-1 text-sm text-slate-300'>
                        <li>Role based access control (RABC)</li>
                        <li>Route protection with middlewares</li>
                        <li>Server side permissions checks</li>
                        <li>Client side permissions checks</li>
                        <li>Dynamic route access</li>
                    </ul>
                </div>
                {/* card 2 */}
                <div className="bg-slate-800 p-6 border border-slate-700 rounded-l-lg">
                    <h3>User Roles</h3>
                    <ul className='list-disc list-inside space-y-1 text-sm text-slate-300'>
                        <li><strong className='text-purple-400'>Super Admin : </strong> Full System Access</li>
                        <li><strong className='text-green-400'>Admin : </strong>User & Team managment</li>
                        <li><strong className='text-yellow-400'>Manager: </strong> Team specific management</li>
                        <li><strong className='text-blue-400'>User : </strong> Basic Dashboard</li>
                    </ul>
                </div>
            </div>

            {
                !user ? <div className="max-w-md mx-auto mt-10 rounded-2xl border border-blue-500/30 bg-linear-to-br from-slate-900 via-blue-950 to-slate-900 p-6 shadow-2xl backdrop-blur-md">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20 border border-green-400/30">
                            <span className="text-green-300 text-lg">✓</span>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-white">
                                Welcome back, <strong>Arvind</strong>! You are loggined as {""}
                                <strong className='text-green-200'>USER</strong>
                            </h2>
                        </div>
                    </div>

                    <div className="mt-6 flex gap-4">
                        <Link
                            href="/dashboard"
                            className="flex-1 rounded-xl bg-blue-600 px-4 py-3 text-center font-medium text-white shadow-lg shadow-blue-900/30 transition-all duration-200 hover:bg-blue-500 hover:scale-[1.02] active:scale-100"
                        >
                            Go to Dashboard
                        </Link>
                    </div>
                </div> : <div className="max-w-md mx-auto mt-10 rounded-2xl border border-blue-500/30 bg-linear-to-br from-slate-900 via-blue-950 to-slate-900 p-6 shadow-2xl backdrop-blur-md">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20 border border-green-400/30">
                            <span className="text-green-300 text-lg">✓</span>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-white">
                                Welcome Back
                            </h2>

                            <p className="text-sm text-green-300 mt-1">
                                You are logged in successfully.
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 flex gap-4">
                        <Link
                            href="/login"
                            className="flex-1 rounded-xl bg-blue-600 px-4 py-3 text-center font-medium text-white shadow-lg shadow-blue-900/30 transition-all duration-200 hover:bg-blue-500 hover:scale-[1.02] active:scale-100"
                        >
                            Login
                        </Link>

                        <Link
                            href="/register"
                            className="flex-1 rounded-xl border border-blue-400/30 bg-white/5 px-4 py-3 text-center font-medium text-blue-100 backdrop-blur-sm transition-all duration-200 hover:bg-white/10 hover:border-blue-300/50 hover:scale-[1.02] active:scale-100"
                        >
                            Register
                        </Link>
                    </div>
                </div>
            }
        </div>
    )
}

export default Home