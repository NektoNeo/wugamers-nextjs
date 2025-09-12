'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { siteContent } from '@/data/content';
import { cn } from '@/lib/utils';

export default function About() {
  const { about } = siteContent;

  return (
    <section id="about" className="py-20 relative">
      <div className="container-width">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-display-sm md:text-display-md font-display font-bold text-neutral-900 mb-6 gradient-text">
              {about.title}
            </h2>
            
            <p className="text-lg text-neutral-700 text-body-enhanced mb-8">
              {about.description}
            </p>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                {about.mission.title}
              </h3>
              <p className="text-neutral-700 text-body-enhanced mb-4">
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
                    className="flex items-start"
                  >
                    <svg className="w-6 h-6 text-tech-cyan mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-neutral-700 text-body-enhanced">{point}</span>
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
            <div className="glass-card rounded-3xl p-8">
              <h3 className="text-xl font-semibold text-neutral-900 mb-6">
                {about.features.title}
              </h3>
              
              <div className="space-y-4">
                {about.features.items.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="p-4 rounded-2xl glass-card tech-glow-hover"
                  >
                    <p className="text-neutral-700 text-body-enhanced">{item}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 text-center p-6 rounded-2xl glass-card tech-glow"
            >
              <p className="text-lg font-semibold text-neutral-900 mb-2">
                {about.cta.text}
              </p>
              <p className="text-sm text-neutral-700 text-body-enhanced mb-6">
                {about.cta.subtitle}
              </p>
              
              {/* Media buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
                <Link
                  href="#"
                  className="glass-button rounded-full px-6 py-3 text-sm font-semibold text-white inline-flex items-center group"
                >
                  <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                  Смотреть видео
                </Link>
                
                <Link
                  href="#"
                  className="glass-card rounded-full px-6 py-3 text-sm font-semibold text-tech-cyan tech-glow-hover inline-flex items-center group"
                >
                  <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Презентация
                </Link>

                <Link
                  href="#"
                  className="glass-card rounded-full px-6 py-3 text-sm font-semibold text-tech-cyan tech-glow-hover inline-flex items-center group"
                >
                  <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                  Гимн проекта
                </Link>
              </div>
              
              <Link
                href={about.cta.link}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-button rounded-full px-6 py-3 text-sm font-semibold text-white"
              >
                {about.cta.button}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}