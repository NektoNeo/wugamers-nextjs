'use client';

import { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function DonationWidget() {
  const [selectedAmount, setSelectedAmount] = useState(500);
  const amounts = [100, 500, 1000, 5000];
  
  // This would be replaced with actual payment link
  const paymentLink = `https://donate.wugamers.ru/amount=${selectedAmount}`;

  return (
    <section className="py-20 bg-gradient-to-b from-turquoise-50/30 to-white">
      <div className="container-width">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-3xl border border-turquoise-100 overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-accent p-8 text-white text-center">
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">
                Поддержите проект
              </h2>
              <p className="text-white/90 max-w-2xl mx-auto">
                Ваша помощь позволяет нам проводить турниры и развивать инклюзивный киберспорт
              </p>
            </div>
            
            <div className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Amount selector */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Выберите сумму
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {amounts.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setSelectedAmount(amount)}
                        className={cn(
                          "p-4 rounded-xl border-2 font-semibold transition-all duration-300",
                          selectedAmount === amount
                            ? "border-accent bg-accent/10 text-accent"
                            : "border-gray-200 hover:border-accent/50 text-gray-700"
                        )}
                      >
                        {amount} ₽
                      </button>
                    ))}
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Другая сумма
                    </label>
                    <input
                      type="number"
                      value={selectedAmount}
                      onChange={(e) => setSelectedAmount(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300"
                      placeholder="Введите сумму"
                    />
                  </div>
                  
                  <button className={cn(
                    "w-full rounded-full bg-gradient-to-r from-primary to-accent",
                    "px-8 py-4 text-base font-semibold text-white",
                    "shadow-lg hover:shadow-xl transition-all duration-300",
                    "hover:scale-[1.02]"
                  )}>
                    Поддержать проект
                  </button>
                </div>
                
                {/* QR Code */}
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Или отсканируйте QR-код
                  </h3>
                  
                  <div className="inline-block p-6 bg-white rounded-2xl border-2 border-turquoise-100">
                    <QRCodeCanvas
                      value={paymentLink}
                      size={200}
                      level="H"
                      includeMargin={false}
                    />
                  </div>
                  
                  <p className="text-sm text-gray-600 mt-4">
                    Отсканируйте код для быстрого перевода
                  </p>
                </div>
              </div>
              
              {/* Stats */}
              <div className="mt-12 pt-8 border-t border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-display font-bold gradient-text mb-1">
                      1,234,567 ₽
                    </div>
                    <div className="text-sm text-gray-600">Собрано всего</div>
                  </div>
                  <div>
                    <div className="text-2xl font-display font-bold gradient-text mb-1">
                      789
                    </div>
                    <div className="text-sm text-gray-600">Поддержавших</div>
                  </div>
                  <div>
                    <div className="text-2xl font-display font-bold gradient-text mb-1">
                      15
                    </div>
                    <div className="text-sm text-gray-600">Турниров проведено</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}