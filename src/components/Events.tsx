'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Clock, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const upcomingEvents = [
  {
    id: 1,
    title: "CS2 Турнир для начинающих",
    subtitle: "Первые шаги в киберспорте",
    date: "15 декабря",
    time: "14:00 МСК",
    location: "Онлайн",
    participants: "12/16",
    category: "Турнир",
    description: "Турнир для игроков начального уровня с особыми потребностями",
    image: "/placeholder-event-1.jpg",
    color: "from-primary-500 to-primary-600"
  },
  {
    id: 2,
    title: "Мастер-класс по Dota 2",
    subtitle: "Стратегии и тактики",
    date: "18 декабря",
    time: "16:00 МСК",
    location: "Москва, ул. Пушкина 10",
    participants: "8/12",
    category: "Мастер-класс",
    description: "Изучаем основы игры с профессиональными тренерами",
    image: "/placeholder-event-2.jpg",
    color: "from-accent-400 to-accent-500"
  },
  {
    id: 3,
    title: "FIFA Лига выходного дня",
    subtitle: "Инклюзивный чемпионат",
    date: "22 декабря",
    time: "12:00 МСК",
    location: "Гибрид",
    participants: "24/32",
    category: "Чемпионат",
    description: "Командный турнир для всех желающих",
    image: "/placeholder-event-3.jpg",
    color: "from-electric-purple to-electric-blue"
  }
];

export default function Events() {
  return (
    <section className="py-20 bg-gradient-to-br from-white via-gray-50/50 to-white relative overflow-hidden">
      {/* Animated gradient orbs */}
      <motion.div 
        className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-400/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary-500 to-accent-400 bg-clip-text text-transparent">
              Ближайшие мероприятия
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Присоединяйтесь к нашим инклюзивным турнирам и мастер‑классам
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-300 hover:-translate-y-1">
                {/* Category badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className={cn(
                    "px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r",
                    event.color
                  )}>
                    {event.category}
                  </span>
                </div>

                {/* Image placeholder with gradient overlay */}
                <div className="h-48 bg-gradient-to-br from-primary-100 via-accent-50 to-primary-50 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-6xl text-primary-500/20">🎮</div>
                  </motion.div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-primary-500 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-sm text-primary-500 font-medium mb-3">
                    {event.subtitle}
                  </p>
                  <p className="text-gray-600 text-sm mb-4">
                    {event.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600 text-sm">
                      <Calendar className="w-4 h-4 mr-2 text-primary-500" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Clock className="w-4 h-4 mr-2 text-accent-400" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="w-4 h-4 mr-2 text-primary-500" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Users className="w-4 h-4 mr-2 text-accent-400" />
                      <span>Участники: <span className="font-semibold text-primary-500">{event.participants}</span></span>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-primary-500/25">
                    Зарегистрироваться
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <button className="inline-flex items-center gap-2 bg-gradient-to-r from-accent-400 to-accent-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-accent-500 hover:to-accent-600 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-accent-400/25">
            Все мероприятия
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}