import React from "react";
import { motion } from "framer-motion";

const SellYourCourse = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <motion.h1
        className="text-4xl font-bold mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Sell Your Course Here
      </motion.h1>
      <motion.p
        className="text-lg mb-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Join our platform as an instructor and start selling your courses to a wide audience.
      </motion.p>
      <motion.button
        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => (window.location.href = "/signup/instructor")}
      >
        Sign Up as an Instructor
      </motion.button>
    </div>
  );
};

export default SellYourCourse;
