'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { siteContent } from '@/data/content';
import { cn } from '@/lib/utils';

export default function Partners() {
  const { partners } = siteContent;
  
  // Group partners by priority
  const priorityGroups = partners.reduce((acc, partner) => {
    const priority = partner.priority || 3;
    if (!acc[priority]) acc[priority] = [];
    acc[priority].push(partner);
    return acc;
  }, {} as Record<number, typeof partners>);

  return (
    <section id="partners" className="py-20 relative">
      <div className="container-width">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-display-sm md:text-display-md font-display font-bold text-white mb-4 gradient-text">
            Наши партнёры
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Вместе мы создаем будущее инклюзивного киберспорта
          </p>
        </motion.div>

        {/* Priority 1 Partners - Larger display */}
        {priorityGroups[1] && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {priorityGroups[1].map((partner, index) => (
                <div
                  key={index}
                  className="group relative glass-card rounded-2xl p-8 tech-glow-hover"
                >
                  <div className="relative h-24 flex items-center justify-center">
                    {partner.logo ? (
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        width={200}
                        height={80}
                        className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    ) : (
                      <span className="text-xl font-semibold text-gray-300">
                        {partner.name}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Priority 2 Partners - Medium display */}
        {priorityGroups[2] && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {priorityGroups[2].map((partner, index) => (
                <div
                  key={index}
                  className="group relative glass-card rounded-xl p-6 tech-glow-hover"
                >
                  <div className="relative h-16 flex items-center justify-center">
                    {partner.logo ? (
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        width={150}
                        height={60}
                        className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    ) : (
                      <span className="text-sm font-medium text-gray-300 text-center">
                        {partner.name}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Animated marquee for additional partners */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative overflow-hidden py-8"
        >
          <div className="flex animate-marquee gap-8">
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 px-8 py-4 glass-card rounded-lg"
              >
                <span className="text-sm font-medium text-gray-300 whitespace-nowrap">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-lg font-semibold text-white mb-4">
            Хотите стать партнёром?
          </p>
          <button className="glass-button rounded-full px-8 py-3 text-base font-semibold text-white">
            Связаться с нами
          </button>
        </motion.div>
      </div>
    </section>
  );
}