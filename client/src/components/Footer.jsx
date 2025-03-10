import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <footer className="bg-[#1a1a2e] text-white pt-16 pb-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              EduLearn
            </h3>
            <p className="text-gray-400">
              Empowering minds through quality online education. Join millions of learners worldwide.
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {['About Us', 'Contact', 'Careers', 'Support'].map((item) => (
                <motion.li
                  key={item}
                  whileHover={{ x: 5 }}
                  className="transform transition-transform"
                >
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-3">
              {['Development', 'Business', 'Design', 'Marketing'].map((item) => (
                <motion.li
                  key={item}
                  whileHover={{ x: 5 }}
                  className="transform transition-transform"
                >
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4 mb-6">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors"
                >
                  <Icon className="h-5 w-5 text-gray-400 hover:text-white" />
                </motion.a>
              ))}
            </div>
            <motion.a
              href="mailto:contact@edulearn.com"
              whileHover={{ x: 5 }}
              className="flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <Mail className="h-5 w-5 mr-2" />
              contact@edulearn.com
            </motion.a>
          </motion.div>
        </div>
        
        <motion.div
          variants={itemVariants}
          className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400"
        >
          <p>&copy; 2024 EduLearn. All rights reserved.</p>
        </motion.div>
      </motion.div>
    </footer>
  );
}