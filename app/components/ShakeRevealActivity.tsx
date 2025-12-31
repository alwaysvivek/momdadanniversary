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
      setTimeout(() => {
        setIsRevealed(true);
        if (drainInterval.current) clearInterval(drainInterval.current);
        window.removeEventListener('devicemotion', handleMotion);
      }, 0);
    }
  }, [progress, isRevealed, TARGET, handleMotion]);

  const progressPercent = Math.min((progress / TARGET) * 100, 100);

  return (
    <section className="py-20 px-4">
      {isRevealed && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={300}
          colors={['#000000', '#374151', '#6B7280', '#9CA3AF', '#D1D5DB']}
        />
      )}

      <div className="max-w-2xl mx-auto">
        {!isStarted ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6 tracking-tight">
              Shake to Reveal
            </h2>
            <p className="text-lg text-gray-600 mb-8 font-light">
              Shake your phone or move your mouse to reveal a surprise
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={startActivity}
              className="px-8 py-4 text-lg font-medium text-white bg-gray-900 rounded-full hover:bg-gray-800 transition-all duration-200 shadow-lg"
            >
              Start
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
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-medium text-gray-900 mb-2">
                    {progressPercent < 30 ? 'Keep going' : progressPercent < 70 ? 'Almost there' : 'Nearly done'}
                  </h3>
                  <div className="w-full max-w-md mx-auto">
                    <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gray-900"
                        style={{ width: `${progressPercent}%` }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                    <p className="text-gray-500 text-sm mt-2">{Math.round(progressPercent)}%</p>
                  </div>
                </div>
              </>
            )}

            <motion.div
              className="relative mx-auto"
              animate={!isRevealed ? { rotate: [0, -1, 1, 0] } : { scale: [1, 1.02, 1] }}
              transition={!isRevealed ? { duration: 0.3, repeat: Infinity } : { duration: 1.5 }}
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm border border-gray-200">
                {!isRevealed && (
                  <div className="absolute inset-0 flex items-center justify-center backdrop-blur-xl bg-white/80">
                    <div className="text-7xl">🎁</div>
                  </div>
                )}

                {isRevealed && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 flex items-center justify-center bg-white"
                  >
                    <div className="text-center p-8">
                      <div className="text-7xl mb-6">🎊</div>
                      <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4 tracking-tight">
                        20 Years
                      </h2>
                      <p className="text-xl text-gray-600 font-light">
                        Of beautiful love
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {!isRevealed && (
              <p className="text-gray-500 text-sm text-center mt-6">
                Shake or tap to continue
              </p>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
