import { useState } from "react";
import { motion } from "framer-motion";

const Login =()=> {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isSignUp ? "Registering User..." : "Logging in...", formData);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0d0d0d] text-white p-6">
      {/* Toggle Links */}
      <div className="flex gap-8 mb-8 text-lg font-pixel">
        <button
          className={`${
            !isSignUp ? "text-cyan-400 border-b-4 border-cyan-400" : "text-gray-400"
          } transition-all duration-300`}
          onClick={() => setIsSignUp(false)}
        >
          Sign In
        </button>
        <button
          className={`${
            isSignUp ? "text-pink-400 border-b-4 border-pink-400" : "text-gray-400"
          } transition-all duration-300`}
          onClick={() => setIsSignUp(true)}
        >
          Sign Up
        </button>
      </div>

      {/* Animated Form Card */}
      <motion.div
        key={isSignUp ? "signup" : "signin"}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className="bg-[#161616] p-8 rounded-lg shadow-lg border-4 border-cyan-400 w-96"
      >
        <h2 className="text-center text-xl font-pixel mb-6 text-cyan-400">
          {isSignUp ? "Create an Account" : "Welcome Back"}
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {isSignUp && (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="p-3 border-2 bg-[#222] border-cyan-400 text-white rounded-md font-pixel focus:outline-none focus:border-pink-400 transition-all duration-300"
              required
            />
          )}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="p-3 border-2 bg-[#222] border-cyan-400 text-white rounded-md font-pixel focus:outline-none focus:border-pink-400 transition-all duration-300"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="p-3 border-2 bg-[#222] border-cyan-400 text-white rounded-md font-pixel focus:outline-none focus:border-pink-400 transition-all duration-300"
            required
          />
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px #00ffff" }}
            whileTap={{ scale: 0.95 }}
            className="bg-cyan-400 text-black py-3 rounded-md mt-4 font-pixel text-lg transition-all duration-300 hover:bg-pink-400 hover:shadow-pink-500"
            type="submit"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
} 

export default Login;