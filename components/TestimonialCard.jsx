export default function TestimonialCard({ name, quote, image }) {
  return (
    <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition">
      {/* Quote */}
      <p className="text-gray-700 mb-6 text-lg italic">"{quote}"</p>

      {/* Author */}
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-white font-bold mr-4">
          {name.charAt(0)}
        </div>
        <div>
          <h4 className="font-bold text-primary">{name}</h4>
          <p className="text-sm text-gray-600">Green Eventwaala Client</p>
        </div>
      </div>
    </div>
  );
}
