'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative w-full h-screen bg-gradient-to-br from-primary via-secondary to-primary text-white flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 bg-accent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className={`relative z-10 text-center px-4 max-w-4xl transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6">
          Celebrations That Don't Cost the Earth
        </h1>
        <p className="text-xl md:text-2xl mb-12 text-gray-100 font-light">
          Eco-friendly weddings and corporate events built with love and responsibility.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link href="/contact">
            <button className="px-8 py-3 bg-accent text-dark rounded-md font-bold hover:bg-secondary hover:text-white transition transform hover:scale-105">
              Plan Your Event
            </button>
          </Link>
          <Link href="/events">
            <button className="px-8 py-3 border-2 border-white text-white rounded-md font-bold hover:bg-white hover:text-primary transition transform hover:scale-105">
              View Events
            </button>
          </Link>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
