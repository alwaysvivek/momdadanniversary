'use client';

import { motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import Confetti from 'react-confetti';
import Image from 'next/image';

export default function ShakeRevealActivity() {
  const [progress, setProgress] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 800, height: 600 });
  const lastX = useRef(0);
  const lastY = useRef(0);
  const lastZ = useRef(0);
  const drainInterval = useRef<NodeJS.Timeout | null>(null);

  const TARGET = 250;
  const DRAIN = 0.8;
  const SHAKE_SENSITIVITY = 15;

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
  const blurVal = (1 - progressPercent / 100) * 50;
  const brightVal = 0.05 + (progressPercent / 100) * 0.95;
  const sepiaVal = 1 - (progressPercent / 100);
  const hueVal = (1 - progressPercent / 100) * 180;

  return (
    <>
      {!isStarted ? (
        <section className="py-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-2xl mx-auto"
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
              className="px-8 py-4 text-lg font-medium text-white bg-gray-900 rounded-full hover:bg-gray-800 transition-all duration-200 shadow-lg uppercase tracking-[2px]"
            >
              Tap to Unbox
            </motion.button>
          </motion.div>
        </section>
      ) : (
        <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 overflow-hidden">
          {isRevealed && (
            <Confetti
              width={windowSize.width}
              height={windowSize.height}
              recycle={false}
              numberOfPieces={180}
              colors={['#ffffff', '#ff69b4', '#ff0000', '#ffd700']}
            />
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onMouseMove={handleMouseMove}
            onClick={handleTap}
            onTouchStart={handleTap}
            className="relative w-[95vw] h-[75vh] flex items-center justify-center cursor-pointer touch-none"
            style={{
              transform: !isRevealed ? `rotate(${(Math.random() - 0.5) * 2}deg) scale(1.01)` : 'scale(1.05)',
              transition: 'transform 0.1s ease-out'
            }}
          >
            {!isRevealed && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
                <div className="text-white text-[0.7rem] tracking-[4px] uppercase mb-5">
                  Developing
                </div>
                <div className="w-[120px] h-[2px] bg-white/10">
                  <motion.div
                    className="h-full bg-white"
                    style={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
              </div>
            )}

            <motion.div
              className="relative w-full h-full flex items-center justify-center gap-4 px-4"
              animate={isRevealed ? { scale: [1, 1.05, 1] } : {}}
              transition={isRevealed ? { duration: 2, ease: [0.175, 0.885, 0.32, 1.275] } : {}}
            >
              {/* First Image Placeholder */}
              <div className="relative w-[45%] h-[90%] flex items-center justify-center">
                <Image
                  src="/photos/photo1.jpg"
                  alt="Anniversary Memory 1"
                  fill
                  className="object-contain"
                  style={{
                    filter: isRevealed 
                      ? 'none' 
                      : `blur(${blurVal}px) brightness(${brightVal}) sepia(${sepiaVal}) hue-rotate(${hueVal}deg)`
                  }}
                  priority
                />
              </div>

              {/* Second Image Placeholder */}
              <div className="relative w-[45%] h-[90%] flex items-center justify-center">
                <Image
                  src="/photos/photo2.jpg"
                  alt="Anniversary Memory 2"
                  fill
                  className="object-contain"
                  style={{
                    filter: isRevealed 
                      ? 'none' 
                      : `blur(${blurVal}px) brightness(${brightVal}) sepia(${sepiaVal}) hue-rotate(${hueVal}deg)`
                  }}
                  priority
                />
              </div>
            </motion.div>
          </motion.div>

          {!isRevealed && (
            <div className="absolute bottom-10 text-white/40 text-[0.65rem] tracking-[2px] uppercase">
              Shake it hard
            </div>
          )}

          {isRevealed && (
            <motion.button
              initial={{ opacity: 0, display: 'none' }}
              animate={{ opacity: 1, display: 'block' }}
              transition={{ delay: 5 }}
              onClick={() => {
                setIsStarted(false);
                setIsRevealed(false);
                setProgress(0);
              }}
              className="absolute bottom-8 px-8 py-4 text-sm font-bold text-black bg-white rounded-full uppercase tracking-[2px] shadow-lg"
            >
              Replay
            </motion.button>
          )}
        </div>
      )}
    </>
  );
}
