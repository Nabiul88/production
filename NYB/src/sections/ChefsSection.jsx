import React from 'react';

const ChefsSection = () => {
  const chefs = [
    {
      name: 'Chef John Doe',
      specialty: 'Italian Cuisine',
      image: 'https://i.ibb.co/7yrHQ6t/chef-2.jpg', // Replace with actual image URL
    },
    {
      name: 'Chef Maria Smith',
      specialty: 'French Cuisine',
      image: 'https://i.ibb.co/FbT5NHZ/chef-3.jpg', // Replace with actual image URL
    },
    {
      name: 'Chef Alex Johnson',
      specialty: 'Asian Fusion',
      image: 'https://i.ibb.co/g47HHdh/chef-1.jpg', // Replace with actual image URL
    },
  ];

  return (
    <section className="bg-gray-800 text-white py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">Meet Our Chefs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {chefs.map((chef, index) => (
            <div key={index} className="bg-gray-700 p-6 rounded-md shadow-lg">
              <img
                src={chef.image}
                alt={`Chef ${index + 1}`}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-bold mb-2">{chef.name}</h3>
              <p className="text-gray-400">{chef.specialty}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChefsSection;
