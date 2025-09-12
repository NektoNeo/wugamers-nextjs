'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { siteContent } from '@/data/content';
import { cn } from '@/lib/utils';
import { Play, FileText, Music } from 'lucide-react';

export default function About() {
  const { about } = siteContent;

  return (
    <section id="about" className="py-20 relative bg-gradient-to-br from-white via-gray-50/30 to-white overflow-hidden">
      {/* Animated gradient orbs */}
      <motion.div 
        className="absolute top-1/4 right-0 w-96 h-96 bg-accent-400/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.05, 0.08, 0.05]
        }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.08, 0.05]
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container-width relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-display-sm md:text-display-md font-display font-bold mb-6">
              <span className="bg-gradient-to-r from-primary-500 to-accent-400 bg-clip-text text-transparent">
                {about.title}
              </span>
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {about.description}
            </p>
            
            <div className="mb-8 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white text-sm">🎯</span>
                </span>
                {about.mission.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {about.mission.text}
              </p>
              <ul className="space-y-3">
                {about.mission.points.map((point, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="flex items-start group"
                  >
                    <svg className="w-6 h-6 text-primary-500 mr-3 flex-shrink-0 mt-0.5 group-hover:text-accent-400 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{point}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-br from-primary-50/50 to-accent-50/30 backdrop-blur-sm rounded-2xl border border-primary-200/30">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {about.features.title}
                </h3>
                <ul className="space-y-3">
                  {about.features.items.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="flex items-center text-gray-700 hover:text-primary-500 transition-colors"
                    >
                      <span className="text-accent-400 mr-2">▸</span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                <p className="text-lg font-semibold bg-gradient-to-r from-primary-500 to-accent-400 bg-clip-text text-transparent">
                  {about.cta.text}
                </p>
                <p className="text-gray-600">
                  {about.cta.subtitle}
                </p>
                
                {/* Action buttons */}
                <div className="flex flex-wrap gap-4">
                  <Link 
                    href="#" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-primary-500/25"
                  >
                    <Play className="w-5 h-5" />
                    Смотреть видео
                  </Link>
                  <Link 
                    href="#" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:text-primary-500 transition-all duration-300"
                  >
                    <FileText className="w-5 h-5" />
                    Презентация
                  </Link>
                  <Link 
                    href="#" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:text-accent-400 transition-all duration-300"
                  >
                    <Music className="w-5 h-5" />
                    Гимн проекта
                  </Link>
                </div>
              </div>

              {/* Community link */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="p-6 bg-gradient-to-r from-accent-400/10 to-primary-500/10 rounded-2xl border border-accent-400/20"
              >
                <Link 
                  href={about.cta.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-500 transition-colors">
                    {about.cta.button}
                  </h4>
                  <p className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors">
                    Присоединяйтесь к нашему Telegram-каналу
                  </p>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}