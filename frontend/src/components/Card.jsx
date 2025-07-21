import { CalendarDays, MapPin, Phone, Globe, ChevronRight } from 'lucide-react';

const Card = ({ camp }) => {
  // Format date and time
  const startDate = new Date(camp.startDate);
  const formattedDate = startDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
  
  const formattedTime = startDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-all hover:shadow-xl hover:-translate-y-1 w-full max-w-sm border-1 border-red-200 group animate-fadeUp">
      {/* Camp Image with gradient overlay */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={camp.image?.url || camp.image || '/default-camp-banner.jpg'}
          alt={camp.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src = '/default-camp-banner.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900  text-white text-xs font-semibold px-3 py-1 rounded-full">
            {camp.organization}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-4">
        {/* Title */}
        <h3 className="text-xl font-bold text-red-900 leading-tight ">
          {camp.name}
        </h3>

        {/* Meta Info */}
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="bg-red-50 p-2 rounded-lg">
              <CalendarDays className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Date & Time</p>
              <p className="text-gray-800">
                {formattedDate} • {formattedTime}
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="bg-blue-50 p-2 rounded-lg">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Location</p>
              <p className="text-gray-800">{camp.address}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="bg-green-50 p-2 rounded-lg">
              <Phone className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Contact</p>
              <p className="text-gray-800">{camp.contact}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-2">
          
          
          {camp.registrationLink && (
            <a
              href={"https://docs.google.com/forms/d/e/1FAIpQLSdlhwgIXBRmg1FAJRo4Ejizjcze7BkywQbIx1B2ts814X3Hkw/viewform?usp=header"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 flex-1 bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900  text-white py-3 px-4 rounded-lg font-medium transition-all shadow-sm hover:shadow-md"
            >
              Register
              <ChevronRight className="w-4 h-4" />
            </a>
          )}
        </div>

       
      </div>
    </div>
  );
};

export default Card;