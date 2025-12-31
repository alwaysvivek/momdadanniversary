'use client';

import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { useState } from 'react';

const photos = [
  {
    id: 1,
    emoji: '💕',
    title: 'Photo 1',
    gradient: 'from-pink-500 via-rose-500 to-red-500',
    placeholder: '/photos/photo1.jpg',
  },
  {
    id: 2,
    emoji: '💑',
    title: 'Photo 2',
    gradient: 'from-purple-500 via-pink-500 to-rose-500',
    placeholder: '/photos/photo2.jpg',
  },
  {
    id: 3,
    emoji: '🏡',
    title: 'Photo 3',
    gradient: 'from-blue-500 via-indigo-500 to-purple-500',
    placeholder: '/photos/photo3.jpg',
  },
  {
    id: 4,
    emoji: '👨‍👩‍👧',
    title: 'Photo 4',
    gradient: 'from-green-500 via-teal-500 to-cyan-500',
    placeholder: '/photos/photo4.jpg',
  },
  {
    id: 5,
    emoji: '🎉',
    title: 'Photo 5',
    gradient: 'from-yellow-500 via-orange-500 to-red-500',
    placeholder: '/photos/photo5.jpg',
  },
  {
    id: 6,
    emoji: '🌟',
    title: 'Photo 6',
    gradient: 'from-indigo-500 via-purple-500 to-pink-500',
    placeholder: '/photos/photo6.jpg',
  },
];

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function PhotoCarousel() {
  const [[currentIndex, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    const newIndex = currentIndex + newDirection;
    if (newIndex >= 0 && newIndex < photos.length) {
      setPage([newIndex, newDirection]);
    }
  };

  const handleDragEnd = (_e: unknown, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      paginate(1);
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1);
    }
  };

  const currentPhoto = photos[currentIndex];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

  return (
    <section className="py-20 px-4 bg-white rounded-3xl shadow-2xl my-12 mx-4 md:mx-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Camera className="w-12 h-12 mx-auto mb-4 text-purple-600" />
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-purple-900 font-playfair">
            📸 Photo Memories
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            Swipe or click to view your beautiful moments
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Navigation buttons */}
          <button
            onClick={() => paginate(-1)}
            disabled={currentIndex === 0}
            className={`absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-3 shadow-xl transition-all ${
              currentIndex === 0
                ? 'opacity-30 cursor-not-allowed'
                : 'hover:bg-purple-100 hover:scale-110 active:scale-95'
            }`}
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6 text-purple-900" />
          </button>

          <button
            onClick={() => paginate(1)}
            disabled={currentIndex === photos.length - 1}
            className={`absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-3 shadow-xl transition-all ${
              currentIndex === photos.length - 1
                ? 'opacity-30 cursor-not-allowed'
                : 'hover:bg-purple-100 hover:scale-110 active:scale-95'
            }`}
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6 text-purple-900" />
          </button>

          {/* Carousel container */}
          <div className="relative overflow-hidden rounded-3xl" style={{ height: '500px' }}>
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={handleDragEnd}
                className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${currentPhoto.gradient} cursor-grab active:cursor-grabbing`}
              >
                {/* Photo placeholder with fallback */}
                <img
                  src={currentPhoto.placeholder}
                  alt={currentPhoto.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />

                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="text-8xl md:text-9xl mb-6"
                  >
                    {currentPhoto.emoji}
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl md:text-5xl font-bold font-playfair drop-shadow-lg"
                  >
                    {currentPhoto.title}
                  </motion.h3>
                </div>

                {/* Swipe hint overlay for mobile */}
                {currentIndex === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.6, 0] }}
                    transition={{ delay: 1, duration: 2, repeat: 2 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-sm md:text-base font-semibold bg-black/30 px-6 py-3 rounded-full backdrop-blur-sm"
                  >
                    ← Swipe to explore →
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => setPage([index, index > currentIndex ? 1 : -1])}
                className={`transition-all rounded-full ${
                  index === currentIndex
                    ? 'w-12 h-3 bg-purple-600'
                    : 'w-3 h-3 bg-purple-300 hover:bg-purple-400'
                }`}
                aria-label={`Go to photo ${index + 1}`}
              />
            ))}
          </div>

          {/* Counter */}
          <div className="text-center mt-6">
            <span className="text-gray-600 font-semibold">
              {currentIndex + 1} / {photos.length}
            </span>
          </div>
        </div>

        {/* Info card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 text-center max-w-2xl mx-auto"
        >
          <p className="text-gray-700 text-lg">
            💝 <strong>Add Your Photos:</strong> Replace placeholders by adding images to{' '}
            <code className="bg-white px-2 py-1 rounded text-sm">public/photos/</code>
          </p>
          <p className="text-gray-600 text-sm mt-2">
            Name them photo1.jpg, photo2.jpg, etc.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
