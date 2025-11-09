import HeroSection from '@/components/HeroSection';
import ServiceCard from '@/components/ServiceCard';
import Link from 'next/link';

const services = [
  { id: 1, title: 'Eco-Weddings', description: 'Sustainable zero-waste weddings.', icon: '💍' },
  { id: 2, title: 'Corporate Events', description: 'Green corporate events.', icon: '🏢' },
  { id: 3, title: 'Eco Décor', description: 'Biodegradable decorations.', icon: '🌿' },
];

export default function Home() {
  return (
    <>
      <HeroSection />
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-primary mb-4">Welcome to Green Eventwaala</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">Eco-friendly celebrations for a sustainable future.</p>
        </div>
      </section>
      <section className="py-24 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-primary mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map(s => <ServiceCard key={s.id} {...s} />)}
          </div>
        </div>
      </section>
      <section className="py-24 px-4 bg-primary text-white text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Plan?</h2>
        <Link href="/contact"><button className="px-8 py-3 bg-accent text-dark rounded-md font-bold">Get Started</button></Link>
      </section>
    </>
  );
}