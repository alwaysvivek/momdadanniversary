'use client';

import { motion, useInView } from 'framer-motion';
import { Heart, Smile, Home, Trophy, Sparkles, Gift } from 'lucide-react';
import { useRef, useState } from 'react';

const reasons = [
  {
    icon: Heart,
    title: 'Your Unconditional Love',
    description: 'The way you love each other through thick and thin inspires everyone around you',
    color: 'from-red-400 to-pink-500',
  },
  {
    icon: Smile,
    title: 'Your Infectious Joy',
    description: 'Your laughter and happiness light up every room you enter',
    color: 'from-yellow-400 to-orange-500',
  },
  {
    icon: Home,
    title: 'The Home You Built',
    description: 'You created a warm, loving space where everyone feels welcome and cherished',
    color: 'from-green-400 to-teal-500',
  },
  {
    icon: Trophy,
    title: 'Your Strength Together',
    description: 'Facing life\'s challenges hand-in-hand, you show what true partnership means',
    color: 'from-blue-400 to-indigo-500',
  },
  {
    icon: Sparkles,
    title: 'Your Beautiful Example',
    description: 'You\'ve shown us what a successful, loving marriage looks like',
    color: 'from-purple-400 to-pink-500',
  },
  {
    icon: Gift,
    title: 'For Raising Rishu',
    description: 'Thank you for nurturing such a wonderful person - she\'s your greatest gift to the world',
    color: 'from-rose-400 to-red-500',
  },
];

export default function ReasonsWeLoveYou() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const handleCardClick = (index: number) => {
    setFlippedCards((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section
      ref={ref}
      className="py-20 px-4 bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 rounded-3xl shadow-2xl my-12 mx-4 md:mx-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
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
            className="text-6xl mb-4"
          >
            💝
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-purple-900 font-playfair">
            Why We Love & Appreciate You
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            Tap each card to reveal what makes you special
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => {
            const isFlipped = flippedCards.includes(index);
            const Icon = reason.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  type: 'spring',
                  stiffness: 100,
                }}
                className="perspective-1000"
              >
                <motion.div
                  onClick={() => handleCardClick(index)}
                  whileHover={{ scale: 1.05, y: -10 }}
                  whileTap={{ scale: 0.98 }}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6 }}
                  className="relative h-64 cursor-pointer preserve-3d"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Front of card */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${reason.color} rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center text-white backface-hidden`}
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
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
                      className="mb-6"
                    >
                      <Icon className="w-16 h-16" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-center font-playfair mb-2">
                      {reason.title}
                    </h3>
                    <p className="text-sm text-white/70 text-center">Tap to read more</p>
                  </div>

                  {/* Back of card */}
                  <div
                    className="absolute inset-0 bg-white rounded-2xl shadow-xl p-6 flex items-center justify-center backface-hidden"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    <div className="text-center">
                      <Icon className={`w-12 h-12 mx-auto mb-4 bg-gradient-to-br ${reason.color} bg-clip-text text-transparent`} />
                      <p className="text-gray-700 leading-relaxed">{reason.description}</p>
                      <p className="text-sm text-gray-400 mt-4">Tap to flip back</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl shadow-2xl p-8 md:p-12 text-white">
            <p className="text-2xl md:text-4xl font-bold mb-4 font-playfair">
              You are loved beyond measure! 💕
            </p>
            <p className="text-lg md:text-xl opacity-90">
              Thank you for being the wonderful people you are
            </p>
          </div>
        </motion.div>
      </motion.div>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>
    </section>
  );
}
