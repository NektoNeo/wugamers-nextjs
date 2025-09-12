'use client';

import { LazyMotion, domAnimation } from 'motion/react';
import * as m from 'motion/react-m';
import Link from 'next/link';
import { siteContent } from '@/data/content';
import { cn } from '@/lib/utils';

export default function Hero() {
  const { hero } = siteContent;

  return (
    <LazyMotion features={domAnimation}>
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 hero-bg">
      {/* Optimized gaming floating elements */}
      <div className="absolute inset-0 -z-10" style={{ willChange: 'transform' }}>
        <div className="absolute top-32 left-10 w-80 h-80 bg-electric-blue/8 rounded-full animate-pulse electric-glow opacity-60" style={{ filter: 'blur(60px)' }} />
        <div className="absolute bottom-32 right-10 w-96 h-96 bg-electric-purple/6 rounded-full animate-pulse purple-glow opacity-50" style={{ filter: 'blur(60px)', animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-300/4 rounded-full opacity-30" style={{ filter: 'blur(80px)' }} />
      </div>

      <div className="container-width py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            {/* Main title with animation */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <h1 className="heading-display">
              <span className="block text-display-sm md:text-display-md lg:text-display-xl font-extrabold text-neutral-900 mb-2">
                {hero.title.line1}
              </span>
              <m.span 
                className="block text-display-sm md:text-display-md lg:text-display-xl font-extrabold mb-2"
                style={{
                  background: "linear-gradient(90deg, #7c6df1 0%, #4de6ff 50%, #7c6df1 100%)",
                  backgroundSize: "200% 100%",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent"
                }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                {hero.title.line2}
              </m.span>
              <span className="block text-display-sm md:text-display-md lg:text-display-xl font-extrabold text-neutral-900 mb-2">
                {hero.title.line3}
              </span>
              <m.span 
                className="block text-display-sm md:text-display-md lg:text-display-xl font-extrabold mb-2"
                style={{
                  background: "linear-gradient(90deg, #a4b8fc 0%, #7c6df1 50%, #a4b8fc 100%)",
                  backgroundSize: "200% 100%",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent"
                }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 1
                }}
              >
                {hero.title.line4}
              </m.span>
            </h1>
          </m.div>

          {/* Subtitle */}
          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto max-w-2xl text-lg md:text-xl text-neutral-700 text-body-enhanced font-medium mb-12 leading-relaxed"
          >
            {hero.subtitle}
          </m.p>

          {/* Stats */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto lg:mx-0 mb-12"
          >
            {hero.stats.map((stat, index) => (
              <m.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1, ease: "easeOut" }}
                className="glass-card-strong rounded-2xl p-6 hover-glow group cursor-pointer relative overflow-hidden transition-transform duration-300 hover:scale-105"
                style={{ willChange: 'transform' }}
              >
                {/* Electric pulse effect */}
                <m.div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: "linear-gradient(45deg, transparent 30%, rgba(77, 230, 255, 0.4) 50%, transparent 70%)",
                  }}
                  animate={{
                    x: ["-100%", "100%"],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.5 + 2,
                    repeatDelay: 4
                  }}
                />
                
                {/* Connection lines between cards */}
                {index < 3 && (
                  <m.div
                    className="absolute top-1/2 -right-2 w-4 h-0.5 bg-electric-blue opacity-0"
                    animate={{
                      opacity: [0, 1, 0],
                      scaleX: [0, 1, 0]
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: index * 0.5 + 3,
                      repeatDelay: 4
                    }}
                  />
                )}
                <div className="text-3xl md:text-4xl heading-display gradient-text-primary mb-2 group-hover:gradient-text-electric transition-all duration-300">
                  {stat.value}
                </div>
                <div className="text-sm text-neutral-700 font-semibold tracking-wide">{stat.label}</div>
              </m.div>
            ))}
          </m.div>

          {/* Additional tagline */}
          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-center lg:text-left text-xl font-bold text-electric-purple mb-8"
          >
            Для людей с НЕограниченными возможностями
          </m.p>


          {/* Enhanced CTA Buttons with Modern Glassmorphism */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            {/* Primary CTA - Purple Glass Button */}
            <m.div
              whileHover={{ 
                scale: 1.05,
                y: -2
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link
                href="#contacts"
                className="glass-button-enhanced group relative overflow-hidden rounded-full px-8 py-4 text-base font-semibold text-white inline-flex items-center shadow-2xl"
              >
                <m.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{
                    background: [
                      "linear-gradient(45deg, rgba(147, 51, 234, 0.2), rgba(59, 130, 246, 0.2))",
                      "linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))",
                      "linear-gradient(45deg, rgba(147, 51, 234, 0.2), rgba(59, 130, 246, 0.2))"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <m.svg 
                  className="w-5 h-5 mr-3 z-10 relative" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </m.svg>
                <span className="z-10 relative">Хочу участвовать!</span>
              </Link>
            </m.div>
            
            {/* Secondary CTA - Glass Outline Button */}
            <m.div
              whileHover={{ 
                scale: 1.05,
                y: -2
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link
                href="#about"
                className="glass-button-secondary group relative overflow-hidden rounded-full px-8 py-4 text-base font-semibold text-white inline-flex items-center shadow-xl"
              >
                <m.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{
                    background: [
                      "linear-gradient(45deg, rgba(6, 182, 212, 0.1), rgba(15, 118, 110, 0.1))",
                      "linear-gradient(45deg, rgba(15, 118, 110, 0.1), rgba(6, 182, 212, 0.1))",
                      "linear-gradient(45deg, rgba(6, 182, 212, 0.1), rgba(15, 118, 110, 0.1))"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                {/* Magnifying glass SVG with animation */}
                <m.div className="relative z-10">
                  <m.svg 
                    className="w-5 h-5 mr-3" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    whileHover={{ scale: 1.2, rotate: 15 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </m.svg>
                  
                  {/* Additional magnifying glass that flies in on hover */}
                  <m.svg 
                    className="w-4 h-4 absolute -top-1 -right-1 opacity-0" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    variants={{
                      hidden: { opacity: 0, x: -20, y: 20, scale: 0.5 },
                      visible: { opacity: 0.6, x: 0, y: 0, scale: 1 },
                      exit: { opacity: 0, x: 30, y: -30, scale: 0.3 }
                    }}
                    initial="hidden"
                    whileHover="visible"
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </m.svg>
                </m.div>
                <span className="z-10 relative button-text">Узнать подробнее</span>
              </Link>
            </m.div>
          </m.div>
          </div>

          {/* Right content - Robot (Optimized) */}
          <m.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="hidden lg:flex justify-center items-center relative"
          >
            <div className="relative w-full max-w-lg group">
              {/* Simplified background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-300/15 via-accent-300/10 to-primary-400/15 rounded-full scale-110 group-hover:scale-125 transition-transform duration-500" style={{ filter: 'blur(40px)' }} />
              
              {/* Robot image with optimized effects */}
              <img
                src="/Robot.png"
                alt="WU Gamers Robot"
                className="relative w-full h-auto object-contain z-10 transition-transform duration-300 hover:scale-105"
                style={{ 
                  filter: 'drop-shadow(0 10px 30px rgba(124,109,241,0.3))',
                  willChange: 'transform'
                }}
              />
              
              {/* Simplified floating elements */}
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-electric-blue/15 rounded-full animate-pulse opacity-70" style={{ filter: 'blur(20px)' }} />
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-primary-400/20 rounded-full animate-pulse opacity-60" style={{ filter: 'blur(15px)', animationDelay: '1s' }} />
              <div className="absolute top-1/4 -left-2 w-8 h-8 bg-accent-300/25 rounded-full animate-pulse opacity-50" style={{ filter: 'blur(10px)', animationDelay: '0.5s' }} />
            </div>
          </m.div>
        </div>
      </div>
    </section>
    </LazyMotion>
  );
}