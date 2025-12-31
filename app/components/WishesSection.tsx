'use client';

import { motion, useInView } from 'framer-motion';
import { Heart, Smile, Sparkles, Sun, Users, PartyPopper } from 'lucide-react';
import { useRef } from 'react';

const wishes = [
  { icon: Heart, text: 'Endless Love', color: 'from-red-400 to-pink-500' },
  { icon: Smile, text: 'Infinite Joy', color: 'from-yellow-400 to-orange-400' },
  { icon: Sparkles, text: 'Magical Moments', color: 'from-purple-400 to-pink-400' },
  { icon: Sun, text: 'Bright Days', color: 'from-yellow-300 to-orange-400' },
  { icon: Users, text: 'Strong Bond', color: 'from-blue-400 to-purple-400' },
  { icon: PartyPopper, text: 'Joyful Celebrations', color: 'from-green-400 to-teal-400' },
];

export default function WishesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="py-20 px-4 bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 rounded-3xl shadow-2xl my-12 mx-4 md:mx-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-6 text-purple-900 font-playfair">
          🌟 Our Wishes for You 🌟
        </h2>
        <p className="text-center text-gray-600 text-lg md:text-xl mb-12">
          May your days be filled with...
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishes.map((wish, index) => (
            <motion.div
              key={wish.text}
              initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
              animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                type: 'spring',
                stiffness: 100,
              }}
              whileHover={{
                scale: 1.05,
                y: -10,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all p-8 text-center cursor-pointer group"
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 0.2,
                }}
                className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br ${wish.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}
              >
                <wish.icon className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 font-playfair">
                {wish.text}
              </h3>
            </motion.div>
          ))}
        </div>

        {/* Additional blessing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl shadow-2xl p-8 md:p-12 text-white">
            <p className="text-2xl md:text-4xl font-bold mb-4 font-playfair">
              May your love story continue to inspire
            </p>
            <p className="text-lg md:text-xl opacity-90">
              Here&apos;s to many more beautiful years together! 🥂✨
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
