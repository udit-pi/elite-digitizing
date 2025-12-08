import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { TrustBar } from '../components/TrustBar';
import { FeaturedServices } from '../components/FeaturedServices';
import { HowItWorks } from '../components/HowItWorks';
import { PortfolioGrid } from '../components/PortfolioGrid';
import { Testimonials } from '../components/Testimonials';
import { PricingPreview } from '../components/PricingPreview';
import { CTABlock } from '../components/CTABlock';
import { Footer } from '../components/Footer';

export function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <TrustBar />
      <FeaturedServices />
      <HowItWorks />
      <PortfolioGrid />
      <Testimonials />
      <PricingPreview />
      <CTABlock />
      <Footer />
    </div>
  );
}
