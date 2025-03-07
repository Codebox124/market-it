'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    alert('Form submitted!'); // Replace with API call
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-6">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Let's Work Together</h1>
        <p className="mt-4 text-gray-400">Have a project in mind? Fill out the form and let's create something amazing.</p>
      </motion.div>

      {/* Contact Form */}
      <motion.form 
        onSubmit={handleSubmit} 
        className="mt-10 w-full max-w-lg bg-gray-800 p-8 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="space-y-6">
          <div>
            <label className="block text-gray-300">Name</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required
              className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-300">Email</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required
              className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-300">Message</label>
            <textarea 
              name="message" 
              value={formData.message} 
              onChange={handleChange} 
              required
              className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-400 focus:outline-none h-32"
            />
          </div>
        </div>

        <button type="submit" className="mt-6 w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-md text-white text-lg font-semibold flex items-center justify-center hover:opacity-80 transition">
          Send Message <ArrowRight className="ml-2" />
        </button>
      </motion.form>
    </div>
  );
}
