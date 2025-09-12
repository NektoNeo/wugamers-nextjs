'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Мероприятия', href: '#events' },
  { name: 'О проекте', href: '#about' },
  { name: 'Участникам', href: '#participants' },
  { name: 'Партнёрам', href: '#partners' },
  { name: 'Контакты', href: '#contacts' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card-strong border-b border-primary-200/20 backdrop-blur-xl">
      <nav className="container-width" aria-label="Global">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-3 group">
              <div className="relative">
                <img 
                  src="/logo.svg" 
                  alt="WU GAMERS Logo" 
                  className="h-10 w-auto transition-all duration-300 group-hover:scale-110 group-hover:brightness-110"
                  style={{ 
                    filter: 'hue-rotate(270deg) saturate(1.6) brightness(1.3) contrast(1.1)',
                    dropShadow: '0 2px 8px rgba(124, 109, 241, 0.3)'
                  }}
                />
                <div className="absolute inset-0 bg-primary-400/25 rounded-full blur-lg scale-150 opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </div>
              <span className="heading-primary text-xl font-extrabold gradient-text-primary hidden sm:block group-hover:gradient-text-electric transition-all duration-300">
                WU GAMERS
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className={cn(
                "inline-flex items-center justify-center rounded-lg p-2.5",
                "text-neutral-600 hover:text-primary-600 hover:glass-card hover-glow",
                "transition-all duration-300"
              )}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Открыть меню</span>
              <svg
                className="h-6 w-6 transition-transform duration-200"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                style={{ transform: mobileMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-semibold leading-6 text-neutral-700",
                  "hover:text-primary-600 transition-all duration-300",
                  "relative after:absolute after:bottom-0 after:left-0",
                  "after:h-0.5 after:w-0 after:bg-gradient-to-r",
                  "after:from-primary-500 after:to-accent-400",
                  "after:transition-all after:duration-300",
                  "hover:after:w-full after:rounded-full",
                  "hover:drop-shadow-sm"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link
              href="https://t.me/wugamers"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary rounded-full px-6 py-2.5 text-sm font-semibold group"
            >
              <span className="group-hover:scale-105 inline-block transition-transform duration-200">
                Присоединиться
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            "lg:hidden transition-all duration-500 ease-in-out",
            mobileMenuOpen ? "max-h-96 opacity-100 transform translate-y-0" : "max-h-0 opacity-0 overflow-hidden transform -translate-y-2"
          )}
        >
          <div className="space-y-2 pb-4 pt-3 glass-card-strong mx-4 rounded-xl border border-primary-200/30 shadow-lg">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "block rounded-lg mx-3 px-4 py-3 text-base font-semibold",
                  "text-neutral-700 hover:glass-card hover:text-primary-600",
                  "transition-all duration-300 hover-glow"
                )}
                onClick={() => setMobileMenuOpen(false)}
                style={{ 
                  animationDelay: mobileMenuOpen ? `${index * 100}ms` : '0ms'
                }}
              >
                {item.name}
              </Link>
            ))}
            <div className="px-3 pt-2">
              <Link
                href="https://t.me/wugamers"
                target="_blank"
                rel="noopener noreferrer"
                className="block btn-primary rounded-full px-6 py-3 text-center text-sm font-semibold group"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="group-hover:scale-105 inline-block transition-transform duration-200">
                  Присоединиться
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}