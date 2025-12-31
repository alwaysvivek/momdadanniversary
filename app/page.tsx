import HeroSection from './components/HeroSection';
import TimelineSection from './components/TimelineSection';
import InteractiveHeartSection from './components/InteractiveHeartSection';
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
        <InteractiveHeartSection />
        <PhotoGallerySection />
        <PersonalMessageSection />
        <WishesSection />
        <Footer />
      </div>
    </main>
  );
}

