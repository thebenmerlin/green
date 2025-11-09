import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanityClient';

export default function EventCard({ event }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition">
      {event.image && (
        <div className="relative h-48 bg-gray-300">
          <Image src={urlFor(event.image).url()} alt={event.title} fill className="object-cover" />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-primary mb-2">{event.title}</h3>
        <p className="text-gray-600 mb-4">📍 {event.location}</p>
        <p className="text-gray-700 line-clamp-3 mb-6">{event.description}</p>
        <Link href={`/events/${event.slug.current}`}>
          <button className="px-4 py-2 bg-primary text-white rounded-md font-bold">View Details</button>
        </Link>
      </div>
    </div>
  );
}