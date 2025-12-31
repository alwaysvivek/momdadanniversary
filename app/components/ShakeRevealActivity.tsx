'use client';

import { motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import Confetti from 'react-confetti';

export default function ShakeRevealActivity() {
  const [progress, setProgress] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 800, height: 600 });
  const lastX = useRef(0);
  const lastY = useRef(0);
  const lastZ = useRef(0);
  const drainInterval = useRef<NodeJS.Timeout | null>(null);

  const TARGET = 200;
  const DRAIN = 0.5;
  const SHAKE_SENSITIVITY = 12;

  useEffect(() => {
    // Initialize window size after mount
    const updateSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateSize();
    
    const handleResize = () => updateSize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isStarted || isRevealed) return;

    // Set up drain interval
    drainInterval.current = setInterval(() => {
      setProgress((prev) => Math.max(0, prev - DRAIN));
    }, 50);

    return () => {
      if (drainInterval.current) clearInterval(drainInterval.current);
    };
  }, [isStarted, isRevealed]);

  const handleMotion = useCallback((e: DeviceMotionEvent) => {
    if (isRevealed || !isStarted) return;
    const acc = e.accelerationIncludingGravity;
    if (!acc) return;

    const deltaX = Math.abs((lastX.current || 0) - (acc.x || 0));
    const deltaY = Math.abs((lastY.current || 0) - (acc.y || 0));
    const deltaZ = Math.abs((lastZ.current || 0) - (acc.z || 0));
    const delta = deltaX + deltaY + deltaZ;

    if (delta > SHAKE_SENSITIVITY) {
      setProgress((prev) => Math.min(TARGET, prev + delta * 0.8));
      if (navigator.vibrate) navigator.vibrate(20);
    }

    lastX.current = acc.x || 0;
    lastY.current = acc.y || 0;
    lastZ.current = acc.z || 0;
  }, [isRevealed, isStarted, SHAKE_SENSITIVITY, TARGET]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isRevealed || !isStarted) return;
    const movement = Math.abs(e.movementX) + Math.abs(e.movementY);
    if (movement > 10) {
      setProgress((prev) => Math.min(TARGET, prev + movement * 0.15));
    }
  };

  const handleTap = () => {
    if (isRevealed || !isStarted) return;
    setProgress((prev) => Math.min(TARGET, prev + 5));
  };

  const startActivity = useCallback(async () => {
    // Request permission for motion on iOS
    if (typeof DeviceMotionEvent !== 'undefined' && typeof (DeviceMotionEvent as unknown as { requestPermission?: () => Promise<string> }).requestPermission === 'function') {
      try {
        const permission = await ((DeviceMotionEvent as unknown as { requestPermission: () => Promise<string> }).requestPermission());
        if (permission === 'granted') {
          window.addEventListener('devicemotion', handleMotion);
        }
      } catch (e) {
        console.error('Motion permission error:', e);
      }
    } else if (typeof DeviceMotionEvent !== 'undefined') {
      window.addEventListener('devicemotion', handleMotion);
    }

    setIsStarted(true);
  }, [handleMotion]);

  useEffect(() => {
    if (progress >= TARGET && !isRevealed) {
      // Use a state updater function to avoid cascading renders
      setTimeout(() => {
        setIsRevealed(true);
        if (drainInterval.current) clearInterval(drainInterval.current);
        
        // Clean up event listeners
        window.removeEventListener('devicemotion', handleMotion);
      }, 0);
    }
  }, [progress, isRevealed, TARGET, handleMotion]);

  const progressPercent = Math.min((progress / TARGET) * 100, 100);
  const blurAmount = Math.max(0, 40 - (progressPercent / 100) * 40);
  const brightness = 0.1 + (progressPercent / 100) * 0.9;

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-3xl shadow-2xl my-12 mx-4 md:mx-8 relative overflow-hidden">
      {isRevealed && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={300}
          colors={['#ffffff', '#ff69b4', '#ff0000', '#ffd700', '#00ffff']}
        />
      )}

      <div className="max-w-4xl mx-auto text-center">
        {!isStarted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white font-playfair">
              🎁 Mystery Surprise Box
            </h2>
            <p className="text-lg md:text-xl text-white/80 mb-8">
              Shake your phone or move your mouse to reveal a special message!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startActivity}
              className="bg-white text-purple-900 px-12 py-4 rounded-full text-xl font-bold shadow-2xl hover:shadow-white/20 transition-all"
            >
              TAP TO START 🎉
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onMouseMove={handleMouseMove}
            onClick={handleTap}
            onTouchStart={handleTap}
            className="cursor-pointer select-none"
          >
            {!isRevealed && (
              <>
                <motion.h3
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-2xl md:text-3xl font-bold mb-4 text-white uppercase tracking-wide"
                >
                  {progressPercent < 30 ? 'Keep Going! 💪' : progressPercent < 70 ? 'Almost There! 🔥' : 'So Close! ⚡'}
                </motion.h3>
                <div className="w-full max-w-md mx-auto mb-6">
                  <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-green-400 via-blue-400 to-purple-400"
                      style={{ width: `${progressPercent}%` }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                  <p className="text-white/60 text-sm mt-2">{Math.round(progressPercent)}% revealed</p>
                </div>
              </>
            )}

            <motion.div
              className="relative mx-auto max-w-2xl"
              animate={!isRevealed ? { rotate: [0, -2, 2, 0] } : { scale: [1, 1.05, 1] }}
              transition={!isRevealed ? { duration: 0.3, repeat: Infinity } : { duration: 1.5 }}
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/placeholder-celebration.jpg"
                  alt="Mystery reveal"
                  className="w-full h-full object-cover transition-all duration-300"
                  style={{
                    filter: `blur(${blurAmount}px) brightness(${brightness}) sepia(${1 - progressPercent / 100}) hue-rotate(${(1 - progressPercent / 100) * 180}deg)`,
                  }}
                  onError={(e) => {
                    // Fallback if image doesn't exist
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                  }}
                />
                
                {!isRevealed && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl md:text-8xl animate-pulse">
                      🎁
                    </div>
                  </div>
                )}

                {isRevealed && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-600/90 to-pink-600/90"
                  >
                    <div className="text-center p-8">
                      <div className="text-6xl md:text-8xl mb-4">🎊</div>
                      <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-playfair">
                        Congratulations!
                      </h2>
                      <p className="text-xl md:text-2xl text-white/90">
                        20 Years of Beautiful Love! 💕
                      </p>
                      <p className="text-lg md:text-xl text-white/80 mt-4">
                        & Happy New Year 2026! 🎆
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {!isRevealed && (
              <motion.p
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-white/60 text-sm md:text-base mt-6 uppercase tracking-wider"
              >
                📱 Shake it hard or move your mouse vigorously!
              </motion.p>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
