'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { siteContent } from '@/data/content';
import { cn } from '@/lib/utils';

const socialIcons = {
  telegram: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.56c-.21 2.27-1.13 7.75-1.6 10.29-.2 1.08-.59 1.44-.97 1.47-.82.07-1.45-.54-2.24-1.06-1.24-.82-1.95-1.33-3.15-2.13-1.39-.93-.49-1.44.31-2.28.21-.22 3.85-3.52 3.92-3.82.01-.04.01-.17-.06-.25s-.2-.05-.28-.03c-.12.03-2.02 1.28-5.7 3.76-.54.37-1.03.55-1.47.54-.48-.01-1.41-.27-2.1-.5-.85-.27-1.52-.42-1.46-.88.03-.24.37-.49 1.02-.74 3.99-1.74 6.66-2.89 8-3.45 3.81-1.6 4.61-1.88 5.13-1.89.11 0 .37.03.54.17.14.12.18.29.2.43-.01.06.01.25 0 .38z"/>
    </svg>
  ),
  vk: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.662c-.626 0-.82-.498-1.944-1.642-1.003-1.003-1.443-1.133-1.69-1.133-.346 0-.445.099-.445.574v1.5c0 .408-.131.655-1.203.655-1.787 0-3.769-.543-5.162-2.547-2.094-2.908-2.663-5.092-2.663-5.535 0-.246.099-.476.574-.476h1.662c.427 0 .592.198.757.657.789 2.191 2.094 4.108 2.635 4.108.197 0 .296-.099.296-.641V9.721c-.065-.855-.493-.928-.493-1.234 0-.198.164-.395.427-.395h2.602c.361 0 .493.198.493.625v3.953c0 .361.164.493.263.493.197 0 .361-.131.724-.493 1.117-1.28 1.919-3.267 1.919-3.267.099-.246.263-.476.69-.476h1.662c.493 0 .608.263.493.625-.197.854-2.093 3.593-2.093 3.593-.164.263-.229.394 0 .69.164.229.707.69 1.068 1.117.657.756 1.166 1.397 1.297 1.854.132.46-.098.69-.557.69z"/>
    </svg>
  ),
  youtube: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  rutube: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 21.818c-5.414 0-9.818-4.404-9.818-9.818S6.586 2.182 12 2.182 21.818 6.586 21.818 12 17.414 21.818 12 21.818zm-1.636-14.91v10.182L16.909 12l-6.545-5.091z"/>
    </svg>
  )
};

export default function Social() {
  const { social } = siteContent;

  return (
    <section className="py-20 bg-gradient-to-b from-white to-turquoise-50/30">
      <div className="container-width">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-display-sm md:text-display-md font-display font-bold text-gray-900 mb-4">
            Присоединяйтесь к нам
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Следите за новостями и участвуйте в жизни сообщества
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Telegram Channel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0 }}
            >
              <Link
                href={social.telegram.channel}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group block bg-white rounded-2xl p-6",
                  "border border-turquoise-100",
                  "hover:border-[#229ED9] hover:shadow-xl",
                  "transition-all duration-300"
                )}
              >
                <div className="text-[#229ED9] group-hover:scale-110 transition-transform duration-300 mb-4">
                  {socialIcons.telegram}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Telegram</h3>
                <p className="text-sm text-gray-600">Канал проекта</p>
                <div className="mt-3 text-xs font-medium text-[#229ED9]">
                  @wugamers
                </div>
              </Link>
            </motion.div>

            {/* VK */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Link
                href={social.vk}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group block bg-white rounded-2xl p-6",
                  "border border-turquoise-100",
                  "hover:border-[#0077FF] hover:shadow-xl",
                  "transition-all duration-300"
                )}
              >
                <div className="text-[#0077FF] group-hover:scale-110 transition-transform duration-300 mb-4">
                  {socialIcons.vk}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">ВКонтакте</h3>
                <p className="text-sm text-gray-600">Сообщество</p>
                <div className="mt-3 text-xs font-medium text-[#0077FF]">
                  vk.com/wugamers
                </div>
              </Link>
            </motion.div>

            {/* YouTube */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link
                href={social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group block bg-white rounded-2xl p-6",
                  "border border-turquoise-100",
                  "hover:border-[#FF0000] hover:shadow-xl",
                  "transition-all duration-300"
                )}
              >
                <div className="text-[#FF0000] group-hover:scale-110 transition-transform duration-300 mb-4">
                  {socialIcons.youtube}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">YouTube</h3>
                <p className="text-sm text-gray-600">Видео и стримы</p>
                <div className="mt-3 text-xs font-medium text-[#FF0000]">
                  Подписаться
                </div>
              </Link>
            </motion.div>

            {/* Rutube */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link
                href={social.rutube}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group block bg-white rounded-2xl p-6",
                  "border border-turquoise-100",
                  "hover:border-[#00D855] hover:shadow-xl",
                  "transition-all duration-300"
                )}
              >
                <div className="text-[#00D855] group-hover:scale-110 transition-transform duration-300 mb-4">
                  {socialIcons.rutube}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Rutube</h3>
                <p className="text-sm text-gray-600">Видеоконтент</p>
                <div className="mt-3 text-xs font-medium text-[#00D855]">
                  Смотреть
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Community Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl p-8"
          >
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-display font-bold gradient-text mb-1">
                  10,000+
                </div>
                <div className="text-sm text-gray-600">Подписчиков</div>
              </div>
              <div>
                <div className="text-2xl font-display font-bold gradient-text mb-1">
                  500+
                </div>
                <div className="text-sm text-gray-600">Видео</div>
              </div>
              <div>
                <div className="text-2xl font-display font-bold gradient-text mb-1">
                  1M+
                </div>
                <div className="text-sm text-gray-600">Просмотров</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}