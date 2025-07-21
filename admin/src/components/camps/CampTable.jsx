import { Edit, Trash2, Calendar, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';
import EditCamp from './EditCamp';

const CampTable = ({ camps, onDelete, onRefresh }) => {
  const [editingCamp, setEditingCamp] = useState(null);
  
  // Simple array check
  const campsToDisplay = Array.isArray(camps) ? camps : [];

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return 'Invalid date';
    }
  };

  if (campsToDisplay.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <p className="text-gray-500">No camps found</p>
        <button 
          onClick={onRefresh}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Refresh Data
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-red-800 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-red-800 uppercase">Organization</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-red-800 uppercase">Details</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-red-800 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {campsToDisplay.map((camp) => (
              <tr key={camp._id || camp.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img 
                        className="h-10 w-10 rounded-full object-cover" 
                        src={camp.image?.url || camp.image || 'https://via.placeholder.com/40'} 
                        alt={camp.name}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/40';
                        }}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{camp.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {camp.organization}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 space-y-1">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                      {formatDate(camp.startDate)} - {formatDate(camp.endDate)}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4 text-gray-500" />
                      {camp.address}
                    </div>
                    <div className="flex items-center">
                      <Phone className="mr-2 h-4 w-4 text-gray-500" />
                      {camp.contact}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => setEditingCamp(camp)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onDelete(camp._id || camp.id)}
                    className="text-red-800 hover:text-red-900"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingCamp && (
        <EditCamp
          camp={editingCamp}
          onClose={() => setEditingCamp(null)}
          onSuccess={() => {
            setEditingCamp(null);
            onRefresh();
          }}
        />
      )}
    </div>
  );
};

export default CampTable;