import HeroSection from '@/components/home/hero-section';
import DestinationsSection from '@/components/home/destinations-section';
import CruisePackagesSection from '@/components/home/cruise-packages-section';
import OnboardExperienceSection from '@/components/home/onboard-experience-section';
import BookingProcessSection from '@/components/home/booking-process-section';
import TestimonialsSection from '@/components/home/testimonials-section';
import NewsletterSection from '@/components/home/newsletter-section';
import { useEffect } from 'react';

const Home = () => {
  // Preload critical images
  useEffect(() => {
    const preloadImages = [
      'https://images.unsplash.com/photo-1548574505-5e239809ee19?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1590523741831-ab7e8b8334b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1602867741746-6df80f40c267?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ];

    preloadImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <div>
      <HeroSection />
      <DestinationsSection />
      <CruisePackagesSection />
      <OnboardExperienceSection />
      <BookingProcessSection />
      <TestimonialsSection />
      <NewsletterSection />
    </div>
  );
};

export default Home;
