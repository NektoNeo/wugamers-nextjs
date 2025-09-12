'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Trophy, Users, Rocket, Target } from 'lucide-react';
import { siteContent } from '@/data/content';
import { cn } from '@/lib/utils';

const iconMap = {
  trophy: Trophy,
  users: Users,
  rocket: Rocket,
  target: Target,
  calendar: Calendar,
  mappin: MapPin
};

export default function Roadmap() {
  const { events } = siteContent;
  
  // Group events by year
  const eventsByYear = events.roadmap.reduce((acc, event) => {
    const year = event.year;
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(event);
    return acc;
  }, {} as Record<string, typeof events.roadmap>);

  const years = Object.keys(eventsByYear).sort();

  return (
    <section className="py-20 bg-gradient-to-br from-white via-gray-50/30 to-white relative overflow-hidden">
      {/* Animated gradient orbs */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360],
          opacity: [0.05, 0.08, 0.05]
        }}
        transition={{ duration: 15, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-400/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [360, 180, 0],
          opacity: [0.05, 0.08, 0.05]
        }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <div className="container-width relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-display-sm md:text-display-md font-display font-bold mb-4">
            <span className="bg-gradient-to-r from-primary-500 to-accent-400 bg-clip-text text-transparent">
              Наш путь
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            История развития и ключевые достижения проекта
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Central line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-500/20 via-accent-400/20 to-primary-500/20 rounded-full" />

          {years.map((year, yearIndex) => (
            <div key={year} className="relative mb-16">
              {/* Year marker */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: yearIndex * 0.1 }}
                className="absolute left-1/2 transform -translate-x-1/2 -translate-y-4 z-20"
              >
                <div className="bg-gradient-to-r from-primary-500 to-accent-400 text-white px-6 py-2 rounded-full font-bold text-xl shadow-lg shadow-primary-500/25">
                  {year}
                </div>
              </motion.div>

              {/* Events for this year */}
              <div className="pt-12 space-y-8">
                {eventsByYear[year].map((event, eventIndex) => {
                  const isLeft = (yearIndex + eventIndex) % 2 === 0;
                  
                  return (
                    <motion.div
                      key={`${year}-${eventIndex}`}
                      initial={{ 
                        opacity: 0, 
                        x: isLeft ? -50 : 50 
                      }}
                      whileInView={{ 
                        opacity: 1, 
                        x: 0 
                      }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.6, 
                        delay: eventIndex * 0.15,
                        type: "spring",
                        stiffness: 100
                      }}
                      className={cn(
                        "relative flex items-center",
                        isLeft ? "justify-start" : "justify-end"
                      )}
                    >
                      {/* Connection dot */}
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: 0.3, 
                          delay: eventIndex * 0.15 + 0.3
                        }}
                        className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-4 border-primary-500 rounded-full z-10"
                      />

                      {/* Event card */}
                      <div className={cn(
                        "w-5/12",
                        isLeft ? "pr-12" : "pl-12"
                      )}>
                        <motion.div
                          whileHover={{ 
                            scale: 1.02,
                            boxShadow: "0 20px 40px rgba(124, 109, 241, 0.15)"
                          }}
                          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:border-primary-500/30 transition-all duration-300"
                        >
                          {/* Date badge */}
                          {event.date && (
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-primary-50 to-accent-50 rounded-full text-sm font-semibold text-primary-600 mb-3">
                              <Calendar className="w-4 h-4" />
                              {event.date}
                            </div>
                          )}
                          
                          {/* Title */}
                          <h3 className="text-xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-primary-500 to-accent-400 bg-clip-text text-transparent">
                            {event.title}
                          </h3>
                          
                          {/* Description */}
                          <p className="text-gray-600 text-sm">
                            {event.description}
                          </p>

                          {/* Hover effect line */}
                          <motion.div
                            initial={{ width: 0 }}
                            whileHover={{ width: "100%" }}
                            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-400 rounded-full"
                            transition={{ duration: 0.3 }}
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Future indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative text-center pt-8"
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-400 text-white rounded-full font-semibold shadow-lg shadow-primary-500/25"
            >
              <Rocket className="w-5 h-5" />
              Продолжение следует...
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}