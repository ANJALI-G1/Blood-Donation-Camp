import { useState } from 'react';
import { 
  Check, 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  Loader2,
  AlertTriangle
} from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/mnnzqbey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          message: formData.message,
          _subject: `New Contact Form Submission from ${formData.name}`
        }),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          message: ''
        });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        form: 'There was an error submitting the form. Please try again later.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Floating background elements */}
      <div className="fixed top-0 left-0 w-full h-full z-[-1] overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-red-100 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-red-200 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-red-900 mb-4">Contact Us</h1>
          <p className="text-lg text-red-700 max-w-2xl mx-auto">
            Have questions or feedback? Reach out to us and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 animate-fadeUp">
          <div className="p-1 bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 "></div>
          
          <div className="p-8 md:p-10">
            {submitSuccess ? (
              <div className="text-center py-8">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                  <Check className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-red-900 mb-2">Thank You!</h3>
                <p className="text-red-700 mb-6">Your message has been sent successfully. We'll contact you soon.</p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {errors.form && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <X className="h-5 w-5 text-red-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700">{errors.form}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`block w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500 focus:ring-red-900 focus:border-red-500' : 'border-gray-300 focus:ring-red-500 focus:border-red-500 text-red-600'} shadow-sm` }
                      placeholder="Your name"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`block w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-red-500 focus:border-red-500 text-red-600'} shadow-sm`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number <span className="text-gray-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`block w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-red-500 focus:border-red-500  text-red-600'} shadow-sm `}
                      placeholder="9876543210"
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 rounded-lg border text-red-600 border-gray-300 focus:ring-red-500 focus:border-red-500 shadow-sm"
                      placeholder="Your address "
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={`block w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-red-500 focus:border-red-500 text-red-600'} shadow-sm`}
                    placeholder="Your message here..."
                  /> 
                  {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center items-center px-6 py-4 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-900 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Additional contact information */}
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-fadeUp">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0 bg-red-100 p-3 rounded-lg">
                <Phone className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="ml-4 text-lg font-medium text-gray-900">Phone</h3>
            </div>
            <p className="text-gray-600">+91 98765 43210</p>
            <p className="text-gray-600">+91 12345 67890</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-fadeUp">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0 bg-red-100 p-3 rounded-lg">
                <Mail className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="ml-4 text-lg font-medium text-gray-900">Email</h3>
            </div>
            <p className="text-gray-600">info@blooddonation.com</p>
            <p className="text-gray-600">support@blooddonation.com</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-fadeUp">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0 bg-red-100 p-3 rounded-lg">
                <MapPin className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="ml-4 text-lg font-medium text-gray-900">Address</h3>
            </div>
            <p className="text-gray-600">123 Blood Donation Street</p>
            <p className="text-gray-600">Mumbai, Maharashtra 400001</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;