import  { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission (e.g., sending an email)
    console.log('Form submitted:', formData);
    // You can add an API call or other actions here
  };

  return (
    <div className="container mx-auto py-20 flex items-center justify-center h-screen">
      {/* Contact Form */}
      <div className="w-1/2 pl-10">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium text-gray-600">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
          >
            Submit
          </button>
        </form>
      </div>
      {/* Contact Information */}

      <div className="w-1/2 pr-10 ml-10 border p-10 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
        <p className="text-gray-100 mb-2">
            <span className="font-bold">Address:</span> 123 Main St, Cityville, State, Zip
        </p>
        <p className="text-gray-100 mb-2">
            <span className="font-bold">Opening Hours:</span> Mon-Sat: 9:00 am - 8:00 pm
        </p>
        <p className="text-gray-100 mb-2">
            <span className="font-bold">Phone:</span> +1 (555) 123-4567
        </p>

        {/* Social Media Icons */}
        <div className="flex space-x-4 mt-4">
            <a href="#" className="text-blue-500 hover:text-blue-700">
                <i className="fab fa-facebook-square text-2xl"></i>
            </a>
            <a href="#" className="text-blue-400 hover:text-blue-600">
                <i className="fab fa-twitter text-2xl"></i>
            </a>
            <a href="#" className="text-red-600 hover:text-red-800">
                <i className="fab fa-instagram text-2xl"></i>
            </a>
        </div>
    </div>
    </div>
  );
};

export default ContactUs;
