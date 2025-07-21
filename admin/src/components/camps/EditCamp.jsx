import { useState } from 'react';
import { X, Calendar, MapPin, Phone } from 'lucide-react';
import api from '../../api/axiosConfig';
import toast from 'react-hot-toast';

const EditCamp = ({ camp, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: camp.name,
    organization: camp.organization,
    contact: camp.contact,
    address: camp.address,
    startDate: new Date(camp.startDate).toISOString().split('T')[0],
    endDate: new Date(camp.endDate).toISOString().split('T')[0],
    registrationLink: camp.registrationLink || '',
    image: null
  });
  
  const [imagePreview, setImagePreview] = useState(camp.image.url);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate image
      if (!file.type.match('image.*')) {
        toast.error('Please select an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image must be smaller than 5MB');
        return;
      }

      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formPayload = new FormData();
      
      // Append all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formPayload.append(key, value);
        }
      });

      const response = await api.put(`/api/camps/${camp._id}`, formPayload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success('Camp updated successfully!');
      onSuccess();
    } catch (error) {
      console.error('Update error:', error);
      toast.error(error.response?.data?.message || 'Failed to update camp');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-red-100 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-red-900">Edit Camp</h2>
          <button 
            onClick={onClose}
            className="text-red-700 hover:text-red-900"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Camp Name */}
            <div className='text-gray-500'>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Camp Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-700 rounded-md p-2"
              />
            </div>

            {/* Organization */}
            <div className='text-gray-500'>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Organization *
              </label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            {/* Contact */}
            <div className='text-gray-500'>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact *
              </label>
              <div className="flex items-center border border-gray-300 rounded-md p-2">
                <Phone className="text-gray-500 mr-2" size={16} />
                <input
                  type="tel"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                  className="w-full outline-none"
                />
              </div>
            </div>

            {/* Address */}
            <div className='text-gray-500'>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address *
              </label>
              <div className="flex items-center border border-gray-300 rounded-md p-2">
                <MapPin className="text-gray-500 mr-2" size={16} />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full outline-none"
                />
              </div>
            </div>

            {/* Dates */}
            <div className='text-gray-500'>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date *
              </label>
              <div className="flex items-center border border-gray-300 rounded-md p-2">
                <Calendar className="text-gray-500 mr-2" size={16} />
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className="w-full outline-none"
                />
              </div>
            </div>

            <div className='text-gray-500'>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date *
              </label>
              <div className="flex items-center border border-gray-300 rounded-md p-2">
                <Calendar className="text-gray-500 mr-2" size={16} />
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                  className="w-full outline-none"
                />
              </div>
            </div>

            {/* Registration Link */}
            <div className="md:col-span-2 text-gray-500">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Registration Link
              </label>
              <input
                type="url"
                name="registrationLink"
                value={formData.registrationLink}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="https://example.com/register"
              />
            </div>

            {/* Image Upload */}
            <div className="md:col-span-2 text-gray-500">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Camp Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {imagePreview && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500 mb-1">Image Preview:</p>
                  <img 
                    src={imagePreview} 
                    alt="Camp Preview" 
                    className="h-40 object-contain border rounded-md"
                  />
                </div>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Leave empty to keep current image
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 border text-red-900 border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-red-800 text-white rounded-md text-sm font-medium hover:bg-red-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Updating...' : 'Update Camp'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCamp;