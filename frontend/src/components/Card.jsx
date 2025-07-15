import { CalendarDays, MapPin, User, Globe } from 'lucide-react';

const Card = ({ camp }) => {
  const formattedDate = new Date(camp.startDate).toLocaleDateString();
  const formattedTime = new Date(camp.startDate).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transition hover:shadow-lg w-full max-w-sm border border-red-100">
      {/* Top Banner Image */}
      <img
        src={camp.banner || '/blood-camp-banner.jpg'}
        alt={camp.name}
        className="w-full h-40 object-cover"
      />

      {/* Content */}
      <div className="p-5 flex flex-col justify-between h-full">
        {/* Organization */}
        <p className="text-xs uppercase font-semibold text-red-500 mb-1">
          Organized by: {camp.organization}
        </p>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-800 mb-2">{camp.name}</h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {camp.tags?.slice(0, 4).map((tag, index) => (
            <span
              key={index}
              className="bg-red-100 text-red-600 text-xs font-medium px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Meta Info */}
        <div className="text-sm text-gray-600 space-y-1 mb-4">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-red-500" />
            <span>{formattedDate} at {formattedTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-red-500" />
            <span>{camp.mode?.toUpperCase() || 'OFFLINE'}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-green-600" />
            <span>{camp.registered || 0} registered</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-green-600" />
            <span className="font-bold text-green-600">OPEN</span>
          </div>
        </div>

        {/* Call to Action */}
        <a
          href={camp.registrationLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto text-center bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition"
        >
          Register Now
        </a>
      </div>
    </div>
  );
};

export default Card;
