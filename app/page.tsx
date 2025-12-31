'use client';

import HeroSection from './components/HeroSection';
import ShakeRevealActivity from './components/ShakeRevealActivity';
import PhotoGallerySection from './components/PhotoGallerySection';
import MusicPlayer from './components/MusicPlayer';
import PersonalMessageSection from './components/PersonalMessageSection';
import { createContext, useContext, useState, useRef } from 'react';

// Create context for music player control
export const MusicContext = createContext<{
  audioRef: React.RefObject<HTMLAudioElement | null> | null;
  playMusic: () => void;
}>({
  audioRef: null,
  playMusic: () => {},
});

export const useMusicContext = () => useContext(MusicContext);

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const playMusic = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(err => console.error('Audio play error:', err));
    }
  };

  return (
    <MusicContext.Provider value={{ audioRef, playMusic }}>
      <main className="min-h-screen bg-white">
        <HeroSection />
        <div className="max-w-5xl mx-auto px-4">
          <ShakeRevealActivity />
          <PhotoGallerySection />
          <MusicPlayer audioRef={audioRef} />
          <PersonalMessageSection />
        </div>
        
        {/* Footer */}
        <footer className="py-12 text-center text-gray-500 text-sm">
          <p>Made with ❤️ for Mom & Dad&apos;s 20th Anniversary</p>
          <p className="mt-2">January 1, 2026</p>
        </footer>
      </main>
    </MusicContext.Provider>
  );
}

