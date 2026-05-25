"use client";
import { User } from '@/app/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

interface HeaderProps {
  user: User | null
}

const Header = ({ user }: HeaderProps) => {
  const user1 = false;
  const pathname = usePathname();
  const navigations = [
    {
      name: 'Home', href: "/", show: true
    },
    {
      name: 'Dashboard', href: "/dashboard", show: true
    },
  ].filter((item) => item.show)

  const getActiveClassName = (href: string) => {
    let isActive = false;
    if (href === "/") {
      isActive = pathname === "/";
    } else if (href === "/dashboard") {
      isActive = pathname.startsWith("/dashboard");
    }

    return `px-3 py-2 rounded text-sm font-medium transition-colors ${isActive ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"
      }`
  }
  return (
    <header className='bg-slate-900 border-b border-slate-700'>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href={"/"} className='font-bold  text-xl text-white'>Team Access</Link>
          <nav className="flex items-center space-x-6">
            {
              navigations.map((navitem) => {
                return <Link href={navitem.href} className={getActiveClassName(navitem.href)}>{navitem.name}</Link>
              })
            }
          </nav>
          {/* user info */}
          <div className="">
            {
              user1 ? <div className='space-x-3'>
                <span className="text-sm text-slate-300">Arvind User</span>
                <button className='px-3 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors cursor-pointer'>logout</button>
              </div> : <div className='space-x-3'>
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
            }
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header