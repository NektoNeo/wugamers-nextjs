'use client';

import Image from 'next/image';
import Link from 'next/link';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { ArrowRight, Users, Calendar, Globe, Trophy } from 'lucide-react';
import { useState, useEffect } from 'react';

// Анимации для Framer Motion (оптимизированные)
const animations = {
  title: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  },
  slideUp: {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: 'easeOut'
      }
    })
  }
};

// Статистика данные
const stats = [
  { icon: Calendar, value: '7', label: 'лет проекту' },
  { icon: Trophy, value: '30+', label: 'мероприятий' },
  { icon: Users, value: '10K+', label: 'участников' },
  { icon: Globe, value: '15', label: 'стран сотрудничества' }
];

export default function HeroOptimized() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <LazyMotion features={domAnimation} strict>
      <section className="relative min-h-screen bg-gradient-to-br from-blue-950 via-purple-900 to-purple-950 overflow-hidden">
        {/* Оптимизированный фоновый паттерн с CSS вместо изображения */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        </div>

        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Текстовый контент */}
            <div className="space-y-8">
              {mounted && (
                <>
                  <m.h1 
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
                    initial="hidden"
                    animate="visible"
                    variants={animations.title}
                  >
                    Развитие{' '}
                    <span className="text-gradient bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      специального
                    </span>{' '}
                    <span className="text-gradient bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      кибердвижения
                    </span>{' '}
                    и фиджитал-спорта
                  </m.h1>

                  <m.p 
                    className="text-lg md:text-xl text-gray-200 leading-relaxed"
                    initial="hidden"
                    animate="visible"
                    variants={animations.fadeIn}
                    transition={{ delay: 0.2 }}
                  >
                    Мы создаём инклюзивную киберспортивную платформу для детей, 
                    подростков и молодежи с ограниченными возможностями
                  </m.p>

                  {/* Статистика */}
                  <m.div 
                    className="grid grid-cols-2 md:grid-cols-4 gap-4"
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.3 }}
                  >
                    {stats.map((stat, index) => (
                      <m.div
                        key={stat.label}
                        className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-colors cursor-pointer"
                        custom={index}
                        variants={animations.slideUp}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <stat.icon className="w-6 h-6 text-purple-400 mb-2" />
                        <div className="text-2xl font-bold text-white">{stat.value}</div>
                        <div className="text-sm text-gray-300">{stat.label}</div>
                      </m.div>
                    ))}
                  </m.div>

                  <m.p 
                    className="text-lg font-semibold text-purple-300"
                    initial="hidden"
                    animate="visible"
                    variants={animations.fadeIn}
                    transition={{ delay: 0.4 }}
                  >
                    Для людей с НЕограниченными возможностями
                  </m.p>

                  {/* CTA кнопки */}
                  <m.div 
                    className="flex flex-col sm:flex-row gap-4"
                    initial="hidden"
                    animate="visible"
                    variants={animations.fadeIn}
                    transition={{ delay: 0.5 }}
                  >
                    <Link 
                      href="#contacts"
                      className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      <Users className="w-5 h-5 mr-2" />
                      Хочу участвовать!
                    </Link>
                    
                    <Link 
                      href="#about"
                      className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border border-white/30 hover:bg-white/20 transform hover:scale-105 transition-all duration-200"
                    >
                      <ArrowRight className="w-5 h-5 mr-2" />
                      Узнать подробнее
                    </Link>
                  </m.div>
                </>
              )}
            </div>

            {/* Оптимизированное изображение робота */}
            <m.div 
              className="relative hidden lg:block"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <div className="relative w-full h-[600px]">
                {/* Используем Next.js Image с оптимизацией */}
                <Image
                  src="/Robot.png"
                  alt="WU Gamers Robot"
                  fill
                  priority // Приоритетная загрузка для LCP
                  sizes="(max-width: 1024px) 50vw, 600px"
                  className="object-contain filter drop-shadow-2xl"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
                
                {/* Декоративные элементы с CSS анимацией */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl animate-pulse animation-delay-2000" />
              </div>
            </m.div>
          </div>
        </div>

        {/* Волна внизу секции */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-20 fill-current text-gray-50"
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
          >
            <path d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z" />
          </svg>
        </div>
      </section>
    </LazyMotion>
  );
}

// CSS для фонового паттерна (добавить в globals.css)
const gridPatternCSS = `
.bg-grid-pattern {
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 50px 50px;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.text-gradient {
  background-size: 200% auto;
  animation: gradient 3s ease infinite;
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
`;