'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
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
    image: "/placeholder-event-1.jpg"
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
    image: "/placeholder-event-2.jpg"
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
    image: "/placeholder-event-3.jpg"
  }
];

export default function Events() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-to-r from-primary to-accent animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-gradient-to-r from-accent to-secondary animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container-width relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-display-sm md:text-display-md font-display font-bold text-gray-900 mb-4">
            Ближайшие мероприятия
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Присоединяйтесь к нашим инклюзивным турнирам и мастер‑классам
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              {/* Event Image Placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold text-primary">
                  {event.category}
                </div>
                
                {/* Placeholder content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gray-200 flex items-center justify-center">
                      <Calendar className="w-8 h-8 text-gray-400" />
                    </div>
                    <div className="text-sm opacity-70">Изображение события</div>
                  </div>
                </div>
              </div>

              {/* Event Content */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {event.subtitle}
                  </p>
                </div>

                <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                  {event.description}
                </p>

                {/* Event Details */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-primary" />
                    <span>{event.date}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2 text-primary" />
                    <span>{event.time}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-primary" />
                    <span>{event.location}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-2 text-primary" />
                    <span>Участники: {event.participants}</span>
                  </div>
                </div>

                {/* Action Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-primary to-accent text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300 group-hover:from-accent group-hover:to-primary"
                >
                  Зарегистрироваться
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Events Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center px-8 py-3 border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-all duration-300"
          >
            Все мероприятия
            <motion.svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}