import Link from 'next/link';
import { siteContent } from '@/data/content';
import { cn } from '@/lib/utils';

export default function Footer() {
  const { social, contacts } = siteContent;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-50/50 via-white to-gray-50/30 border-t border-gray-200/50">
      <div className="container-width py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <span className="font-display text-2xl font-extrabold bg-gradient-to-r from-primary-500 to-accent-400 bg-clip-text text-transparent">
                WU GAMERS
              </span>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              АНО «Уникальный мир» — развитие специального кибердвижения и фиджитал-спорта 
              для людей с НЕограниченными возможностями.
            </p>
            <div className="flex gap-4">
              <Link
                href={social.telegram.channel}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white border border-gray-200 hover:border-primary-500 hover:text-primary-500 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10"
                aria-label="Telegram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.56c-.21 2.27-1.13 7.75-1.6 10.29-.2 1.08-.59 1.44-.97 1.47-.82.07-1.45-.54-2.24-1.06-1.24-.82-1.95-1.33-3.15-2.13-1.39-.93-.49-1.44.31-2.28.21-.22 3.85-3.52 3.92-3.82.01-.04.01-.17-.06-.25s-.2-.05-.28-.03c-.12.03-2.02 1.28-5.7 3.76-.54.37-1.03.55-1.47.54-.48-.01-1.41-.27-2.1-.5-.85-.27-1.52-.42-1.46-.88.03-.24.37-.49 1.02-.74 3.99-1.74 6.66-2.89 8-3.45 3.81-1.6 4.61-1.88 5.13-1.89.11 0 .37.03.54.17.14.12.18.29.2.43-.01.06.01.25 0 .38z"/>
                </svg>
              </Link>
              <Link
                href={social.vk}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white border border-gray-200 hover:border-primary-500 hover:text-primary-500 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10"
                aria-label="VKontakte"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.662c-.626 0-.82-.498-1.944-1.642-1.003-1.003-1.443-1.133-1.69-1.133-.346 0-.445.099-.445.574v1.5c0 .408-.131.655-1.203.655-1.787 0-3.769-.543-5.162-2.547-2.094-2.908-2.663-5.092-2.663-5.535 0-.246.099-.476.574-.476h1.662c.427 0 .592.198.757.657.789 2.191 2.094 4.108 2.635 4.108.197 0 .296-.099.296-.641V9.721c-.065-.855-.493-.928-.493-1.234 0-.198.164-.395.427-.395h2.602c.361 0 .493.198.493.625v3.953c0 .361.164.493.263.493.197 0 .361-.131.724-.493 1.117-1.28 1.919-3.267 1.919-3.267.099-.246.263-.476.69-.476h1.662c.493 0 .608.263.493.625-.197.854-2.093 3.593-2.093 3.593-.164.263-.229.394 0 .69.164.229.707.69 1.068 1.117.657.756 1.166 1.397 1.297 1.854.132.46-.098.69-.557.69z"/>
                </svg>
              </Link>
              <Link
                href={social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white border border-gray-200 hover:border-primary-500 hover:text-primary-500 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </Link>
              <Link
                href={social.rutube}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white border border-gray-200 hover:border-primary-500 hover:text-primary-500 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10"
                aria-label="Rutube"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 21.818c-5.414 0-9.818-4.404-9.818-9.818S6.586 2.182 12 2.182 21.818 6.586 21.818 12 17.414 21.818 12 21.818zm-1.636-14.91v10.182L16.909 12l-6.545-5.091z"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Навигация</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#events" className="text-gray-600 hover:text-primary-500 transition-colors duration-200">
                  Мероприятия
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-gray-600 hover:text-primary-500 transition-colors duration-200">
                  О проекте
                </Link>
              </li>
              <li>
                <Link href="/#team" className="text-gray-600 hover:text-primary-500 transition-colors duration-200">
                  Команда
                </Link>
              </li>
              <li>
                <Link href="/#partners" className="text-gray-600 hover:text-primary-500 transition-colors duration-200">
                  Партнёры
                </Link>
              </li>
              <li>
                <Link href="/#contacts" className="text-gray-600 hover:text-primary-500 transition-colors duration-200">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${contacts.email}`} className="text-gray-600 hover:text-primary-500 transition-colors duration-200">
                  {contacts.email}
                </a>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href={`tel:${contacts.phone.replace(/\s/g, '')}`} className="text-gray-600 hover:text-primary-500 transition-colors duration-200">
                  {contacts.phone}
                </a>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <div className="text-gray-600">
                  <div className="font-medium">{contacts.person.name}</div>
                  <div className="text-sm">{contacts.person.position}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © {currentYear} АНО «Уникальный мир». Все права защищены.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-sm text-gray-500 hover:text-primary-500 transition-colors duration-200">
                Политика конфиденциальности
              </Link>
              <Link href="/terms" className="text-sm text-gray-500 hover:text-primary-500 transition-colors duration-200">
                Пользовательское соглашение
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}