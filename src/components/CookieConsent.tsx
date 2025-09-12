'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ConsentSettings {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState<ConsentSettings>({
    necessary: true, // Always true
    analytics: false,
    marketing: false,
    timestamp: '',
  });

  useEffect(() => {
    // Check if consent was already given
    const storedConsent = localStorage.getItem('cookieConsent');
    if (!storedConsent) {
      // Show banner after 2 seconds for better UX
      setTimeout(() => setShowBanner(true), 2000);
    } else {
      try {
        const parsed = JSON.parse(storedConsent);
        setConsent(parsed);
        applyConsent(parsed);
      } catch {
        // Invalid stored consent, show banner
        setShowBanner(true);
      }
    }
  }, []);

  const applyConsent = (settings: ConsentSettings) => {
    // Apply consent settings
    if (typeof window !== 'undefined') {
      // Google Analytics or other analytics
      if (settings.analytics) {
        // Enable analytics
        (window as any).gtag?.('consent', 'update', {
          'analytics_storage': 'granted'
        });
      } else {
        // Disable analytics
        (window as any).gtag?.('consent', 'update', {
          'analytics_storage': 'denied'
        });
      }

      // Marketing cookies
      if (settings.marketing) {
        // Enable marketing
        (window as any).gtag?.('consent', 'update', {
          'ad_storage': 'granted',
          'ad_user_data': 'granted',
          'ad_personalization': 'granted'
        });
      } else {
        // Disable marketing
        (window as any).gtag?.('consent', 'update', {
          'ad_storage': 'denied',
          'ad_user_data': 'denied',
          'ad_personalization': 'denied'
        });
      }
    }
  };

  const saveConsent = (settings: ConsentSettings) => {
    const consentWithTimestamp = {
      ...settings,
      timestamp: new Date().toISOString(),
    };
    
    localStorage.setItem('cookieConsent', JSON.stringify(consentWithTimestamp));
    applyConsent(consentWithTimestamp);
    setConsent(consentWithTimestamp);
    setShowBanner(false);
    
    // Log consent for GDPR compliance
    if (process.env.NODE_ENV === 'production') {
      fetch('/api/consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(consentWithTimestamp),
      }).catch(console.error);
    }
  };

  const acceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    });
  };

  const acceptSelected = () => {
    saveConsent(consent);
  };

  const rejectAll = () => {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    });
  };

  if (!showBanner) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Мы заботимся о вашей конфиденциальности
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-4">
                    Мы используем файлы cookie для улучшения работы сайта и персонализации контента. 
                    Некоторые из них необходимы для работы сайта, другие помогают нам улучшать сервис.
                    Вы можете управлять настройками cookie в любое время.
                  </p>

                  {showDetails && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4 mb-4"
                    >
                      <div className="space-y-3">
                        <label className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            checked={consent.necessary}
                            disabled
                            className="mt-1 rounded border-gray-300"
                          />
                          <div>
                            <div className="font-medium text-gray-900">Необходимые</div>
                            <div className="text-sm text-gray-600">
                              Обеспечивают корректную работу сайта и безопасность данных
                            </div>
                          </div>
                        </label>

                        <label className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            checked={consent.analytics}
                            onChange={(e) => setConsent({ ...consent, analytics: e.target.checked })}
                            className="mt-1 rounded border-gray-300 text-primary focus:ring-primary"
                          />
                          <div>
                            <div className="font-medium text-gray-900">Аналитические</div>
                            <div className="text-sm text-gray-600">
                              Помогают понять, как пользователи взаимодействуют с сайтом
                            </div>
                          </div>
                        </label>

                        <label className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            checked={consent.marketing}
                            onChange={(e) => setConsent({ ...consent, marketing: e.target.checked })}
                            className="mt-1 rounded border-gray-300 text-primary focus:ring-primary"
                          />
                          <div>
                            <div className="font-medium text-gray-900">Маркетинговые</div>
                            <div className="text-sm text-gray-600">
                              Используются для показа релевантной информации о проекте
                            </div>
                          </div>
                        </label>
                      </div>
                    </motion.div>
                  )}

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={acceptAll}
                      className={cn(
                        "px-6 py-2 rounded-full text-sm font-semibold",
                        "bg-gradient-to-r from-primary to-accent text-white",
                        "hover:shadow-lg transition-all duration-300"
                      )}
                    >
                      Принять все
                    </button>
                    
                    {showDetails ? (
                      <button
                        onClick={acceptSelected}
                        className={cn(
                          "px-6 py-2 rounded-full text-sm font-semibold",
                          "bg-turquoise-100 text-turquoise-700",
                          "hover:bg-turquoise-200 transition-all duration-300"
                        )}
                      >
                        Сохранить выбор
                      </button>
                    ) : (
                      <button
                        onClick={() => setShowDetails(true)}
                        className={cn(
                          "px-6 py-2 rounded-full text-sm font-semibold",
                          "bg-gray-100 text-gray-700",
                          "hover:bg-gray-200 transition-all duration-300"
                        )}
                      >
                        Настроить
                      </button>
                    )}
                    
                    <button
                      onClick={rejectAll}
                      className={cn(
                        "px-6 py-2 rounded-full text-sm font-semibold",
                        "text-gray-600 hover:text-gray-900",
                        "transition-all duration-300"
                      )}
                    >
                      Только необходимые
                    </button>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                      <a href="/privacy" className="hover:text-primary transition-colors">
                        Политика конфиденциальности
                      </a>
                      <a href="/cookies" className="hover:text-primary transition-colors">
                        Политика Cookie
                      </a>
                      <a href="/terms" className="hover:text-primary transition-colors">
                        Условия использования
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}