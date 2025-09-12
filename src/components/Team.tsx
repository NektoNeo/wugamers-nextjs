'use client';

import { useEffect, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { siteContent } from '@/data/content';
import { cn } from '@/lib/utils';

export default function Team() {
  const { team } = siteContent;
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    skipSnaps: false,
    dragFree: true
  });
  
  const autoplayRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!emblaApi) return;

    const autoplay = () => {
      autoplayRef.current = setTimeout(() => {
        emblaApi.scrollNext();
        autoplay();
      }, 4000);
    };

    autoplay();

    emblaApi.on('pointerDown', () => {
      if (autoplayRef.current) clearTimeout(autoplayRef.current);
    });

    return () => {
      if (autoplayRef.current) clearTimeout(autoplayRef.current);
    };
  }, [emblaApi]);

  return (
    <section id="team" className="py-20 bg-gradient-to-b from-white to-purple-50/30">
      <div className="container-width">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-display-sm md:text-display-md font-display font-bold text-gray-900 mb-4">
            Наша команда
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Профессионалы, объединенные общей миссией развития инклюзивного киберспорта
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="overflow-hidden"
          ref={emblaRef}
        >
          <div className="flex gap-6">
            {team.map((member, index) => (
              <div
                key={index}
                className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%]"
              >
                <div className={cn(
                  "glass-card rounded-2xl p-6",
                  "border border-tech-cyan/20",
                  "hover:border-tech-cyan/50 hover:shadow-lg",
                  "transition-all duration-300 h-full"
                )}>
                  {/* Avatar placeholder */}
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <span className="text-2xl font-display font-bold text-primary">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
                    {member.name}
                  </h3>
                  
                  <p className="text-sm font-medium text-primary text-center mb-3">
                    {member.position}
                  </p>
                  
                  <p className="text-sm text-gray-600 text-center">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Navigation buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => emblaApi?.scrollPrev()}
            className="p-3 rounded-full glass-card tech-glow-hover"
            aria-label="Previous"
          >
            <svg className="w-5 h-5 text-tech-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={() => emblaApi?.scrollNext()}
            className="p-3 rounded-full glass-card tech-glow-hover"
            aria-label="Next"
          >
            <svg className="w-5 h-5 text-tech-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}