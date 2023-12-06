import React from 'react';

const Contact = () => {
  return (
    <div className="container mx-auto p-8 py-20 bg-gray-100 min-h-screen">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-md shadow-md">
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Office</h2>
          <p className="text-gray-700">
            123 Main Street <br />
            Cityville, State 12345 <br />
            Country
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
          <p className="text-gray-700">
            Email: info@example.com <br />
            Phone: +1 (123) 456-7890
          </p>
        </div>
      </div>

      <div className="mt-8 bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Send us a Message</h2>
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:border-purple-500"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:border-purple-500"
                placeholder="john.doe@example.com"
              />
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:border-purple-500"
              placeholder="Type your message here..."
            ></textarea>
          </div>

          <div className="mt-6">
          <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-orange-400 to-orange-600 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
