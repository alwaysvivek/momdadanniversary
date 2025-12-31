'use client';

import { motion, useInView } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useRef, useState } from 'react';
import Confetti from 'react-confetti';

const heartMessages = [
  "20 Years of Love! 💕",
  "Together Forever! 💑",
  "Happy Anniversary! 🎉",
  "Celebrating Your Love! ❤️",
  "Two Decades Strong! 💪",
  "Love Never Fades! ✨",
  "Perfect Together! 🌹",
  "Beautiful Journey! 🌈",
  "Love Wins Always! 💖",
  "Blessed with Love! 🙏",
  "Forever Grateful! 🌟",
  "You Complete Each Other! 💝",
];

export default function InteractiveHeartSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [clickCount, setClickCount] = useState(0);
  const [message, setMessage] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [size, setSize] = useState({ width: 0, height: 0 });

  const handleHeartClick = (e: React.MouseEvent | React.TouchEvent) => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    // Get random message
    const randomMessage = heartMessages[Math.floor(Math.random() * heartMessages.length)];
    setMessage(randomMessage);

    // Create floating hearts at click/touch position
    const rect = e.currentTarget.getBoundingClientRect();
    let clientX, clientY;

    if ('touches' in e) {
      clientX = e.touches[0]?.clientX || rect.left + rect.width / 2;
      clientY = e.touches[0]?.clientY || rect.top + rect.height / 2;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const newHearts = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      x: x + (Math.random() - 0.5) * 100,
      y: y + (Math.random() - 0.5) * 100,
    }));

    setHearts((prev) => [...prev, ...newHearts]);

    // Remove hearts after animation
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => !newHearts.find((nh) => nh.id === h.id)));
    }, 2000);

    // Special celebration at 20 clicks
    if (newCount === 20) {
      setMessage('🎊 20 Clicks for 20 Years! Perfect! 🎊');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  };

  // Get window size for confetti
  useState(() => {
    if (typeof window !== 'undefined') {
      setSize({ width: window.innerWidth, height: window.innerHeight });
      const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  });

  return (
    <>
      {showConfetti && <Confetti width={size.width} height={size.height} recycle={false} numberOfPieces={500} />}
      
      <section
        ref={ref}
        className="py-20 px-4 bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl shadow-2xl my-12 mx-4 md:mx-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-purple-900 font-playfair">
            Tap the Heart to See Magic ✨
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-12">
            Each tap celebrates a year of your love story
          </p>

          <div className="relative inline-block">
            <motion.button
              onClick={handleHeartClick}
              onTouchStart={handleHeartClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative bg-gradient-to-br from-pink-500 to-red-500 rounded-full p-12 md:p-16 shadow-2xl hover:shadow-3xl transition-all touch-manipulation"
              style={{
                WebkitTapHighlightColor: 'transparent',
              }}
              aria-label="Interactive heart button - tap to celebrate"
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Heart className="w-24 h-24 md:w-32 md:h-32 text-white" fill="white" />
              </motion.div>

              {/* Floating hearts */}
              {hearts.map((heart) => (
                <motion.div
                  key={heart.id}
                  initial={{ opacity: 1, scale: 0, x: heart.x, y: heart.y }}
                  animate={{
                    opacity: 0,
                    scale: 1.5,
                    y: heart.y - 100,
                  }}
                  transition={{ duration: 2 }}
                  className="absolute text-4xl pointer-events-none"
                  style={{ left: 0, top: 0 }}
                >
                  ❤️
                </motion.div>
              ))}
            </motion.button>

            {/* Click counter */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: clickCount > 0 ? 1 : 0 }}
              className="absolute -top-4 -right-4 bg-yellow-400 text-purple-900 rounded-full w-16 h-16 flex items-center justify-center font-bold text-2xl shadow-lg"
            >
              {clickCount}
            </motion.div>
          </div>

          {/* Message display */}
          <motion.div
            key={message}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 min-h-[80px] flex items-center justify-center"
          >
            {message && (
              <div className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 font-playfair">
                {message}
              </div>
            )}
          </motion.div>

          <p className="text-gray-500 mt-8 text-sm md:text-base">
            💡 Tip: Try tapping 20 times for a special surprise!
          </p>
        </motion.div>
      </section>
    </>
  );
}
