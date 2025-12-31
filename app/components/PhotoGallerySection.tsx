'use client';

import { motion, useInView } from 'framer-motion';
import { Image as ImageIcon, Upload } from 'lucide-react';
import { useRef } from 'react';

const photoPlaceholders = [
  { emoji: '🌹', title: 'Together Forever', color: 'from-rose-400 to-pink-500' },
  { emoji: '💐', title: 'Love & Laughter', color: 'from-purple-400 to-pink-400' },
  { emoji: '🌟', title: '20 Years Strong', color: 'from-yellow-400 to-orange-400' },
  { emoji: '🎂', title: 'Celebrations', color: 'from-blue-400 to-purple-400' },
  { emoji: '💑', title: 'Partners in Life', color: 'from-pink-500 to-rose-500' },
  { emoji: '🏡', title: 'Home Sweet Home', color: 'from-green-400 to-teal-400' },
];

export default function PhotoGallerySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="py-20 px-4 bg-white rounded-3xl shadow-2xl my-12 mx-4 md:mx-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-purple-900 font-playfair">
            Memories to Cherish 📸
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            A collection of beautiful moments through the years
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {photoPlaceholders.map((photo, index) => (
            <motion.div
              key={photo.title}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              whileTap={{ scale: 0.98 }}
              className={`relative aspect-[4/3] bg-gradient-to-br ${photo.color} rounded-2xl shadow-xl hover:shadow-2xl transition-all cursor-pointer overflow-hidden group`}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="text-6xl md:text-7xl mb-4"
                >
                  {photo.emoji}
                </motion.div>
                <h3 className="text-xl md:text-2xl font-bold text-center font-playfair">
                  {photo.title}
                </h3>
              </div>

              {/* Upload hint on hover */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-purple-900/90 flex items-center justify-center pointer-events-none"
              >
                <div className="text-center text-white">
                  <Upload className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-sm font-semibold">Replace with photo</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Info card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 text-center"
        >
          <ImageIcon className="w-12 h-12 mx-auto mb-3 text-purple-600" />
          <p className="text-gray-700 text-lg">
            💝 <strong>Customization Tip:</strong> Replace these placeholders with your favorite photos
            by adding images to the <code className="bg-white px-2 py-1 rounded text-sm">public</code> folder!
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
