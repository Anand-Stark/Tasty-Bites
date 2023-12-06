
import React from 'react';

const AboutUs = () => {

    const teamMembers = [
        'Mohd Zeeshan',
        'Anand Singh',
        'Nikhita',
        'Yashwanth',
        'Vivek Kumar',
      ];
  return (
    <div className="container mx-auto p-8 py-20   min-h-screen">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-md shadow-md text-gray-800">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg">
            At TastyBites, we are on a mission to inspire and innovate. Our goal is to provide
            exceptional solutions that elevate the digital experience for everyone.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4">Our Values</h2>
          <p className="text-lg">
            We are driven by values such as creativity, integrity, and excellence. These values guide
            us in every project, ensuring that we deliver high-quality and impactful results.
          </p>
        </div>
      </div>

      <div className="mt-8 bg-white p-8 rounded-md shadow-md text-gray-800">
        <h2 className="text-3xl font-bold mb-4">Our Recognition</h2>
        <p className="text-lg">
          TastyBites has gained widespread recognition for its commitment to innovation and
          customer satisfaction. Our dedication to excellence has earned us accolades and trust from
          clients and industry experts alike.
        </p>

        <p className="text-lg mt-4">
          We take pride in being a leading force in the industry, and our journey is marked by
          milestones that reflect our passion for success.
        </p>
      </div>

      <div className="mt-8 bg-white p-8 rounded-md shadow-md text-gray-800">
        <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
        <p className="text-lg">
          Our team consists of creative minds, skilled professionals, and visionary leaders. Meet some
          of our team members:
        </p>

        <ul className="list-disc pl-6 mt-4">
          {teamMembers.map((member, index) => (
            <li key={index} className="text-lg">
              {member}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AboutUs;

