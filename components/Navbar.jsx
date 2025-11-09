'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScroll, setHasScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => setHasScroll(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${
      hasScroll ? 'bg-white shadow-lg backdrop-blur-md bg-opacity-95' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary font-heading">Green</span>
            <span className="text-2xl font-bold text-secondary font-heading">Eventwaala</span>
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-dark hover:text-primary transition font-medium">Home</Link>
            <Link href="/about" className="text-dark hover:text-primary transition font-medium">About</Link>
            <Link href="/services" className="text-dark hover:text-primary transition font-medium">Services</Link>
            <Link href="/events" className="text-dark hover:text-primary transition font-medium">Events</Link>
            <Link href="/testimonials" className="text-dark hover:text-primary transition font-medium">Testimonials</Link>
            <Link href="/contact">
              <button className="px-6 py-2 bg-primary text-white rounded-md font-bold hover:bg-secondary">
                Contact
              </button>
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-dark focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>
      </div>

      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </nav>
  );
}
