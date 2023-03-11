import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center h-screen"
    >
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-4">
        Oops, the page you're looking for doesn't exist!
      </p>
      <Link
        to="/home"
        className="inline-block px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition-colors duration-200"
      >
        Go back to home page
      </Link>
    </motion.div>
  );
};

export default NotFound;
