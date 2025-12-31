'use client';

import { motion, useInView } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useRef } from 'react';

export default function PersonalMessageSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="py-20 px-4 bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100 rounded-3xl shadow-2xl my-12 mx-4 md:mx-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Heart className="w-16 h-16 mx-auto mb-6 text-rose-500" fill="currentColor" />
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-purple-900 font-playfair">
            A Special Message
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
        >
          <div className="prose prose-lg md:prose-xl max-w-none">
            <p className="text-gray-700 leading-relaxed text-center md:text-left mb-6">
              <strong className="text-purple-700">Dear Uncle & Aunty,</strong>
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              Congratulations on reaching this incredible milestone of <strong className="text-rose-600">20 wonderful years together</strong>! 🎊
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              Your love story is truly inspiring. The way you support each other, laugh together, 
              and navigate life's journey hand-in-hand shows what a beautiful partnership looks like. 
              Your home has always been filled with warmth, love, and happiness.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              As we celebrate your anniversary and welcome the <strong className="text-purple-600">English New Year 2026</strong>, 
              I wish you both many more years of health, happiness, and togetherness. May your love 
              continue to grow stronger with each passing day.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="border-l-4 border-rose-400 pl-6 my-8 bg-gradient-to-r from-rose-50 to-pink-50 p-6 rounded-r-2xl"
            >
              <p className="text-gray-800 leading-relaxed text-lg mb-4">
                And I want to take this moment to express my deepest gratitude...
              </p>
              <p className="text-gray-800 leading-relaxed text-lg font-semibold">
                Thank you for <strong className="text-rose-600">Rishu</strong>. 💕
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                She is the most wonderful person in my life, and that is a testament to the love, 
                values, and care you've given her. Your guidance has shaped her into the amazing 
                person she is, and I feel incredibly blessed to have her in my life.
              </p>
            </motion.div>

            <p className="text-gray-700 leading-relaxed mb-6">
              Thank you for welcoming me with open arms and making me feel like part of your family. 
              Your kindness and warmth mean the world to me.
            </p>

            <p className="text-gray-700 leading-relaxed mb-8">
              Here's to your beautiful journey together – past, present, and future! 🥂
            </p>

            <div className="text-center mt-12">
              <p className="text-gray-600 mb-2">With love and respect,</p>
              <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-playfair">
                ❤️
              </p>
            </div>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <div className="flex justify-center gap-4 mt-8">
          {['💐', '🌹', '💝', '🌟', '💕'].map((emoji, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
              className="text-4xl"
            >
              {emoji}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
