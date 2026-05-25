"use client";

import { User } from '@/app/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  user: User | null;
}

const Header = ({ user }: HeaderProps) => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigations = [
    {
      name: 'Home',
      href: '/',
      show: true,
    },
    {
      name: 'Dashboard',
      href: '/dashboard',
      show: true,
    },
  ].filter((item) => item.show);

  const getActiveClassName = (href: string) => {
    let isActive = false;

    if (href === '/') {
      isActive = pathname === '/';
    } else if (href === '/dashboard') {
      isActive = pathname.startsWith('/dashboard');
    }

    return `
      px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
      ${
        isActive
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30'
          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
      }
    `;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-white"
          >
            Team Access
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-3 md:flex">
            {navigations.map((navitem) => (
              <Link
                key={navitem.href}
                href={navitem.href}
                className={getActiveClassName(navitem.href)}
              >
                {navitem.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden items-center md:flex">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-300">
                  Arvind User
                </span>

                <button className="rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-red-600">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-blue-900/30 transition-all duration-200 hover:bg-blue-500"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="rounded-xl border border-blue-400/30 bg-white/5 px-4 py-2 text-sm font-medium text-blue-100 backdrop-blur-sm transition-all duration-200 hover:bg-white/10"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center justify-center rounded-lg p-2 text-slate-300 transition hover:bg-slate-800 md:hidden"
          >
            {mobileMenuOpen ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`overflow-hidden transition-all duration-300 md:hidden ${
            mobileMenuOpen
              ? 'max-h-500px py-4'
              : 'max-h-0'
          }`}
        >
          <div className="space-y-3 border-t border-slate-800 pt-4">
            
            {/* Mobile Nav */}
            <nav className="flex flex-col gap-2">
              {navigations.map((navitem) => (
                <Link
                  key={navitem.href}
                  href={navitem.href}
                  className={getActiveClassName(navitem.href)}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {navitem.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Auth */}
            <div className="flex flex-col gap-3 pt-4">
              {user ? (
                <>
                  <span className="text-sm text-slate-300">
                    Arvind User
                  </span>

                  <button className="w-full rounded-xl bg-red-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-red-600">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="w-full rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-medium text-white shadow-lg shadow-blue-900/30 transition hover:bg-blue-500"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    className="w-full rounded-xl border border-blue-400/30 bg-white/5 px-4 py-3 text-center text-sm font-medium text-blue-100 backdrop-blur-sm transition hover:bg-white/10"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;