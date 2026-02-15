import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import LocationMap from '@/components/LocationMap';
import PropertySection from '@/components/PropertySection';
import UnitsSection from '@/components/UnitsSection';
import FAQ from '@/components/FAQ';
import HowToApply from '@/components/HowToApply';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LocationMap />
        <PropertySection />
        <UnitsSection />
        <FAQ />
        <HowToApply />
      </main>
      <Footer />
    </>
  );
}
