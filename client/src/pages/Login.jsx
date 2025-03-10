import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      dispatch(loginUser({ email: formData.email, password: formData.password })).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          toast.success("Welcome Back!");
          navigate("/");
        }
      });
    } else {
      dispatch(registerUser(formData)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          toast.success("Registration Successful!");
          setIsLogin(true);
        }
      });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6"
    >
      <Toaster position="bottom-right" />
      <div className="flex justify-between w-80 mb-6">
        <button 
          onClick={() => setIsLogin(true)}
          className={`px-4 py-2 rounded-lg transition-all ${isLogin ? "bg-blue-600" : "bg-gray-700"}`}
        >Sign In</button>
        <button 
          onClick={() => setIsLogin(false)}
          className={`px-4 py-2 rounded-lg transition-all ${!isLogin ? "bg-blue-600" : "bg-gray-700"}`}
        >Sign Up</button>
      </div>
      <motion.div 
        className="w-80 bg-gray-800 p-8 rounded-xl shadow-lg"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-xl font-semibold text-center mb-6">{isLogin ? "Welcome Back" : "Create Account"}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <input 
              type="text" name="name" placeholder="Name" value={formData.name} 
              onChange={handleChange} 
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none" required 
            />
          )}
          <input 
            type="email" name="email" placeholder="Email" value={formData.email} 
            onChange={handleChange} 
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none" required 
          />
          <input 
            type="password" name="password" placeholder="Password" value={formData.password} 
            onChange={handleChange} 
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none" required 
          />
          <motion.button 
            type="submit" 
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
            whileHover={{ scale: 1.05 }}
          >
            {loading ? "Processing..." : isLogin ? "Sign In" : "Sign Up"}
          </motion.button>
        </form>
        <div className="flex justify-between mt-4 text-sm text-gray-400">
          <button className="hover:underline">Forgot Password?</button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
