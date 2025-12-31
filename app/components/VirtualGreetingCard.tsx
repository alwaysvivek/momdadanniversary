'use client';

import { motion, useInView } from 'framer-motion';
import { Mail, Heart, Send } from 'lucide-react';
import { useRef, useState } from 'react';

export default function VirtualGreetingCard() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section
      ref={ref}
      className="py-20 px-4 bg-white rounded-3xl shadow-2xl my-12 mx-4 md:mx-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <Mail className="w-12 h-12 mx-auto mb-4 text-purple-600" />
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-purple-900 font-playfair">
            💌 A Digital Card For You
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            Click the envelope to open your special message
          </p>
        </div>

        <div className="flex justify-center">
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              onClick={() => setIsOpen(!isOpen)}
              className={`relative w-80 h-56 cursor-pointer ${
                isOpen ? 'z-10' : ''
              }`}
              animate={{
                rotateX: isOpen ? 0 : 0,
              }}
              transition={{ duration: 0.6 }}
            >
              {/* Envelope */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-purple-200 rounded-2xl shadow-2xl overflow-hidden">
                {/* Envelope flap */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-pink-300 to-purple-300 origin-top"
                  animate={{
                    rotateX: isOpen ? -180 : 0,
                  }}
                  transition={{ duration: 0.6 }}
                  style={{
                    transformStyle: 'preserve-3d',
                    clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                  }}
                />

                {/* Envelope front */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {!isOpen ? (
                    <motion.div
                      initial={{ opacity: 1 }}
                      animate={{ opacity: isOpen ? 0 : 1 }}
                      className="text-center"
                    >
                      <Send className="w-16 h-16 text-purple-600 mx-auto mb-2" />
                      <p className="text-purple-900 font-semibold">
                        Click to Open
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className="p-6 text-center"
                    >
                      <Heart className="w-12 h-12 text-red-500 mx-auto mb-3" fill="currentColor" />
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Tap the card below to read the full message!
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Card content that appears when opened */}
        <motion.div
          initial={{ opacity: 0, y: 20, height: 0 }}
          animate={{
            opacity: isOpen ? 1 : 0,
            y: isOpen ? 0 : 20,
            height: isOpen ? 'auto' : 0,
          }}
          transition={{ duration: 0.6, delay: isOpen ? 0.3 : 0 }}
          className="overflow-hidden"
        >
          {isOpen && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-8 md:p-12 shadow-xl border-4 border-pink-200"
            >
              <div className="text-center mb-6">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="text-6xl mb-4"
                >
                  🎊
                </motion.div>
              </div>

              <div className="space-y-6 text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-purple-900 font-playfair">
                  Happy 20th Anniversary!
                </h3>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    Dear Uncle & Aunty,
                  </p>
                  
                  <p className="text-gray-700 leading-relaxed">
                    Twenty years of marriage is a remarkable milestone! Your love story 
                    is a beautiful testament to commitment, patience, and unconditional love.
                  </p>
                  
                  <div className="bg-white rounded-2xl p-6 my-6 shadow-lg">
                    <p className="text-purple-700 font-semibold text-xl mb-3">
                      💝 You&apos;ve shown us that true love...
                    </p>
                    <ul className="text-gray-600 space-y-2 text-left">
                      <li>✨ Grows stronger with time</li>
                      <li>🌟 Overcomes every challenge</li>
                      <li>💕 Brings joy to everyone around</li>
                      <li>🎯 Makes every day meaningful</li>
                    </ul>
                  </div>

                  <p className="text-gray-700 leading-relaxed">
                    As we welcome 2026, may your love continue to flourish, 
                    your health remain strong, and your happiness multiply!
                  </p>

                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mt-8">
                    With all our love & gratitude 💕
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-center gap-3">
                {['🌹', '💐', '🎉', '💕', '✨'].map((emoji, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.6 + i * 0.1, type: 'spring' }}
                    className="text-4xl"
                  >
                    {emoji}
                  </motion.div>
                ))}
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="mt-6 mx-auto block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-shadow"
              >
                Close Card
              </button>
            </motion.div>
          )}
        </motion.div>

        {!isOpen && (
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-center text-gray-500 mt-6"
          >
            ✉️ Don&apos;t miss the special message inside!
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}
