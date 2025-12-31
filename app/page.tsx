import HeroSection from './components/HeroSection';
import TimelineSection from './components/TimelineSection';
import ShakeRevealActivity from './components/ShakeRevealActivity';
import PhotoCarousel from './components/PhotoCarousel';
import InteractiveHeartSection from './components/InteractiveHeartSection';
import AnniversaryCounter from './components/AnniversaryCounter';
import ReasonsWeLoveYou from './components/ReasonsWeLoveYou';
import MusicPlayer from './components/MusicPlayer';
import VirtualGreetingCard from './components/VirtualGreetingCard';
import PhotoGallerySection from './components/PhotoGallerySection';
import PersonalMessageSection from './components/PersonalMessageSection';
import WishesSection from './components/WishesSection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <div className="max-w-7xl mx-auto">
        <TimelineSection />
        <AnniversaryCounter />
        <ShakeRevealActivity />
        <PhotoCarousel />
        <InteractiveHeartSection />
        <ReasonsWeLoveYou />
        <MusicPlayer />
        <VirtualGreetingCard />
        <PhotoGallerySection />
        <PersonalMessageSection />
        <WishesSection />
        <Footer />
      </div>
    </main>
  );
}

