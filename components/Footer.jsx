import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold text-secondary font-heading mb-2">Green Eventwaala</h3>
            <p className="text-gray-300 text-sm">Celebrations that don't cost the Earth. Eco-friendly events.</p>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-accent">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/" className="hover:text-secondary">Home</Link></li>
              <li><Link href="/about" className="hover:text-secondary">About</Link></li>
              <li><Link href="/services" className="hover:text-secondary">Services</Link></li>
              <li><Link href="/events" className="hover:text-secondary">Events</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-accent">Services</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/services" className="hover:text-secondary">Eco-Weddings</Link></li>
              <li><Link href="/services" className="hover:text-secondary">Corporate Events</Link></li>
              <li><Link href="/services" className="hover:text-secondary">Eco Décor</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-accent">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>📧 <a href="mailto:info@greeneventwaala.com" className="hover:text-secondary">mail@greeneventwaala.com</a></li>
              <li>📱 <a href="tel:+(911234567891)" className="hover:text-secondary">+91 1234 567 890</a></li>
              <li>📍 Mumbai, India</li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-700 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {currentYear} Green Eventwaala. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
