export default function ServiceCard({ title, description, icon }) {
  return (
    <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition transform hover:scale-105 text-center">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-2xl font-bold text-primary mb-3">{title}</h3>
      <p className="text-gray-700 mb-6">{description}</p>
      <button className="px-6 py-2 bg-secondary text-white rounded-md font-bold hover:bg-primary">Learn More</button>
    </div>
  );
}
