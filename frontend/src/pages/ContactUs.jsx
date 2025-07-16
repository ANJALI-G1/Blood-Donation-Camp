import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

const ContactUs = () => {
  const [state, handleSubmit] = useForm("mnnzqbey");

  if (state.succeeded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white text-green-600 text-xl font-semibold">
        Thanks for contacting us!
      </div>
    );
  }

  return (
    <>
      {/* Red gradient background */}
     <div className="fixed top-0 left-0 w-full h-full z-[-2] bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>


      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-10">Contact Us</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Your Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows="4"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
              <ValidationError prefix="Message" field="message" errors={state.errors} />
            </div>

            <button
              type="submit"
              disabled={state.submitting}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
            >
              Send Message
            </button>
          </form>

          {/* Image Section */}
          <div className="hidden md:flex md:justify-center">
            <img
              src="./donate.png"
              alt="Donate"
              className="w-[80%] max-w-md h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
