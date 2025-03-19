import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Search, Bell, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { logout } from "../features/authSlice"; // Import logout action

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              EduLearn
            </h1>
          </motion.div>
          
          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-8">
              {["Home", "Courses", "About", "Contact"].map((item) => (
                <motion.a
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {item}
                </motion.a>
              ))}
            </nav>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <motion.div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 bg-white/50 backdrop-blur-sm"
                />
              </motion.div>

              {/* Notifications */}
              <motion.button className="p-2 hover:bg-gray-100 rounded-full">
                <Bell className="h-5 w-5 text-gray-600" />
              </motion.button>

              {/* Login & Register as Instructor Buttons */}
              {!user ? (
                <>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="px-4 py-2 border border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition"
                    onClick={() => navigate("/sell-course")}
                  >
                    Register as Instructor
                  </motion.button>
                </>
              ) : (
                // Profile Dropdown for Logged-in Users
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 hover:bg-gray-100 rounded-full"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <User className="h-5 w-5 text-gray-600" />
                  </motion.button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg"
                      >
                        <ul className="py-2">
                          <li>
                            <a href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                              Profile
                            </a>
                          </li>
                          <li>
                            <a href="/mylearning" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                              My Learning
                            </a>
                          </li>
                          <li>
                            <button
                              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                              onClick={handleLogout}
                            >
                              Logout
                            </button>
                          </li>
                        </ul>
                        <div className="border-t">
                          <a href="/dashboard" className="block text-center py-2 font-semibold text-blue-600 hover:bg-blue-50">
                            Dashboard
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
