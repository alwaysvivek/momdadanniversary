'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const timelineEvents = [
  {
    year: '2006',
    title: 'The Journey Began',
    description: 'Two hearts united in love, starting a beautiful adventure together',
    emoji: '💑',
    color: 'from-pink-400 to-rose-500',
  },
  {
    year: '2010s',
    title: 'Building Dreams',
    description: 'Creating a warm home filled with laughter, love, and cherished memories',
    emoji: '🏡',
    color: 'from-purple-400 to-pink-500',
  },
  {
    year: '2020s',
    title: 'Growing Stronger',
    description: 'Through every challenge, your bond grew deeper and more resilient',
    emoji: '💪',
    color: 'from-blue-400 to-purple-500',
  },
  {
    year: '2026',
    title: '20 Years & Counting',
    description: 'Today we celebrate two decades of unconditional love and partnership',
    emoji: '🎉',
    color: 'from-yellow-400 to-orange-500',
  },
];

export default function TimelineSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="timeline"
      ref={ref}
      className="py-20 px-4 bg-white rounded-3xl shadow-2xl my-12 mx-4 md:mx-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-4 text-purple-900 font-playfair">
          20 Years of Beautiful Memories
        </h2>
        <p className="text-center text-gray-600 text-lg md:text-xl mb-16">
          A timeline of love, growth, and togetherness
        </p>

        <div className="relative">
          {/* Vertical line - desktop */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-pink-300 via-purple-300 to-blue-300" />

          <div className="space-y-12 md:space-y-24">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    className={`bg-gradient-to-br ${event.color} p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all cursor-pointer`}
                  >
                    <div className="text-5xl mb-3">{event.emoji}</div>
                    <h3 className="text-3xl font-bold text-white mb-2 font-playfair">
                      {event.year}
                    </h3>
                    <h4 className="text-xl font-semibold text-white/90 mb-2">
                      {event.title}
                    </h4>
                    <p className="text-white/80 leading-relaxed">
                      {event.description}
                    </p>
                  </motion.div>
                </div>

                {/* Center dot */}
                <div className="hidden md:flex w-2/12 justify-center items-center my-8 md:my-0">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
                    className="w-6 h-6 bg-white border-4 border-purple-500 rounded-full shadow-lg z-10"
                  />
                </div>

                {/* Empty space for alternating layout */}
                <div className="hidden md:block w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
