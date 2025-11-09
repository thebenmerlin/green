import Link from 'next/link';

export default function MobileMenu({ isOpen, setIsOpen }) {
  const handleClose = () => setIsOpen(false);

  return (
    <div className={`md:hidden fixed left-0 right-0 top-20 bg-white shadow-lg transition-all duration-300 ${
      isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
    }`}>
      <div className="p-4 space-y-4">
        <Link href="/" onClick={handleClose} className="block text-dark hover:text-primary font-medium">Home</Link>
        <Link href="/about" onClick={handleClose} className="block text-dark hover:text-primary font-medium">About</Link>
        <Link href="/services" onClick={handleClose} className="block text-dark hover:text-primary font-medium">Services</Link>
        <Link href="/events" onClick={handleClose} className="block text-dark hover:text-primary font-medium">Events</Link>
        <Link href="/testimonials" onClick={handleClose} className="block text-dark hover:text-primary font-medium">Testimonials</Link>
        <Link href="/contact" onClick={handleClose} className="block">
          <button className="w-full px-6 py-2 bg-primary text-white rounded-md font-bold hover:bg-secondary">Contact</button>
        </Link>
      </div>
    </div>
  );
}
