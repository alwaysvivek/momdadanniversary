'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 1 }}
      className="bg-white rounded-3xl shadow-2xl my-12 mx-4 md:mx-8 p-8 text-center"
    >
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
        <Heart className="w-12 h-12 mx-auto mb-4 text-rose-500" fill="currentColor" />
      </motion.div>
      
      <p className="text-lg md:text-xl text-gray-700 mb-2">
        Made with ❤️ for Mom &amp; Dad&apos;s 20th Anniversary
      </p>
      <p className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-playfair">
        January 1, 2026
      </p>
      
      <div className="mt-6 flex justify-center gap-2 text-3xl">
        {['💕', '🎉', '✨', '💐', '🎊'].map((emoji, i) => (
          <motion.span
            key={i}
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          >
            {emoji}
          </motion.span>
        ))}
      </div>
    </motion.footer>
  );
}
