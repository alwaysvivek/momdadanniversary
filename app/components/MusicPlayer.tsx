'use client';

import { motion } from 'framer-motion';
import { Music, Play, Pause } from 'lucide-react';
import { useEffect, useState } from 'react';

interface MusicPlayerProps {
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

export default function MusicPlayer({ audioRef }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handlePause);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handlePause);
    };
  }, [audioRef]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      try {
        await audio.play();
      } catch (error) {
        console.error('Playback error:', error);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Title */}
          <div className="text-center mb-12">
            <Music className="w-8 h-8 mx-auto mb-4 text-gray-400" />
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-3 tracking-tight">
              Thank You for Rishu
            </h2>
            <p className="text-lg text-gray-600 font-light">
              A special song for this celebration
            </p>
          </div>

          {/* Player Card */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
            {/* Album art placeholder */}
            <motion.div
              animate={{
                rotate: isPlaying ? 360 : 0,
              }}
              transition={{
                duration: 20,
                repeat: isPlaying ? Infinity : 0,
                ease: 'linear',
              }}
              className="w-48 h-48 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm flex items-center justify-center overflow-hidden relative"
            >
              <div className="text-6xl">💕</div>
            </motion.div>

            {/* Song info */}
            <div className="mb-6 text-center">
              <h3 className="text-xl font-medium text-gray-900 mb-1">
                Anniversary Special
              </h3>
              <p className="text-gray-500 text-sm">
                Happy 20 Years
              </p>
            </div>

            {/* Progress bar */}
            <div className="mb-6">
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-gray-200 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #000 0%, #000 ${(currentTime / duration) * 100}%, #e5e7eb ${(currentTime / duration) * 100}%, #e5e7eb 100%)`,
                }}
              />
              <div className="flex justify-between text-gray-500 text-xs mt-2 font-mono">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Play/Pause button */}
            <div className="flex items-center justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={togglePlay}
                className="p-4 rounded-full bg-gray-900 hover:bg-gray-800 transition-colors shadow-lg"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-white" fill="white" />
                ) : (
                  <Play className="w-6 h-6 text-white ml-0.5" fill="white" />
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src="/anniversary-song.mp3"
        preload="metadata"
        loop
      />

      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #000;
          cursor: pointer;
        }
        input[type="range"]::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #000;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </section>
  );
}
