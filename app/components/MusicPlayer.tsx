'use client';

import { motion } from 'framer-motion';
import { Music, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

// Pre-generate random positions outside component to avoid impure function calls during render
const generateBackgroundElements = () => {
  return [...Array(6)].map((_, i) => ({
    id: i,
    x1: Math.random() * 400 - 200,
    x2: Math.random() * 400 - 200,
    y1: Math.random() * 400 - 200,
    y2: Math.random() * 400 - 200,
    left: (i / 6) * 100,
  }));
};

const backgroundElementsData = generateBackgroundElements();

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Use pre-generated data
  const backgroundElements = useMemo(() => backgroundElementsData, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    setHasInteracted(true);

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Playback error:', error);
      }
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setIsMuted(!isMuted);
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
    <section className="py-20 px-4 bg-gradient-to-br from-purple-900 via-pink-800 to-rose-900 rounded-3xl shadow-2xl my-12 mx-4 md:mx-8 overflow-hidden relative">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {backgroundElements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute w-32 h-32 rounded-full bg-white/5"
            animate={{
              x: [element.x1, element.x2],
              y: [element.y1, element.y2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 10 + element.id * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              left: `${element.left}%`,
              top: '50%',
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            animate={{
              rotate: isPlaying ? 360 : 0,
              scale: isPlaying ? [1, 1.1, 1] : 1,
            }}
            transition={{
              rotate: { duration: 3, repeat: isPlaying ? Infinity : 0, ease: 'linear' },
              scale: { duration: 1, repeat: isPlaying ? Infinity : 0 },
            }}
            className="mx-auto mb-6"
          >
            <Music className="w-16 h-16 text-pink-300 mx-auto" />
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white font-playfair">
            🎵 A Special Song
          </h2>
          <p className="text-lg md:text-xl text-white/80 mb-12">
            Made with love for this special celebration
          </p>

          {/* Music Player Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20"
          >
            {/* Album art placeholder */}
            <motion.div
              animate={{
                rotate: isPlaying ? 360 : 0,
              }}
              transition={{
                duration: 10,
                repeat: isPlaying ? Infinity : 0,
                ease: 'linear',
              }}
              className="w-48 h-48 md:w-64 md:h-64 mx-auto mb-8 rounded-full bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400 shadow-2xl flex items-center justify-center overflow-hidden relative"
            >
              {/* Vinyl record effect */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full shadow-inner"></div>
              </div>
              <div className="text-6xl md:text-7xl">💕</div>
            </motion.div>

            {/* Song info */}
            <div className="mb-6">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 font-playfair">
                Anniversary Special
              </h3>
              <p className="text-white/70 text-lg">
                A song made with love 💝
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
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #ec4899 0%, #ec4899 ${(currentTime / duration) * 100}%, rgba(255,255,255,0.2) ${(currentTime / duration) * 100}%, rgba(255,255,255,0.2) 100%)`,
                }}
              />
              <div className="flex justify-between text-white/60 text-sm mt-2">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleMute}
                className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? (
                  <VolumeX className="w-6 h-6 text-white" />
                ) : (
                  <Volume2 className="w-6 h-6 text-white" />
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={togglePlay}
                className="p-6 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 shadow-2xl hover:shadow-pink-500/50 transition-all"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 text-white" fill="white" />
                ) : (
                  <Play className="w-8 h-8 text-white ml-1" fill="white" />
                )}
              </motion.button>

              <div className="w-12" /> {/* Spacer for symmetry */}
            </div>

            {!hasInteracted && (
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-white/60 text-sm mt-6"
              >
                🎧 Tap play to listen
              </motion.p>
            )}
          </motion.div>

          {/* Info card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20"
          >
            <p className="text-white/80 text-base">
              🎼 <strong>Add Your Song:</strong> Place your audio file at{' '}
              <code className="bg-black/30 px-2 py-1 rounded text-sm">public/anniversary-song.mp3</code>
            </p>
          </motion.div>
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
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </section>
  );
}
