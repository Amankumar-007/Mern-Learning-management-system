import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../features/authSlice";
import { motion } from "framer-motion";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const [profileLoaded, setProfileLoaded] = useState(false);

  useEffect(() => {
    if (user && user._id && !profileLoaded) {
      dispatch(getUserProfile());
      setProfileLoaded(true);
    }
  }, [dispatch, user, profileLoaded]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-screen w-screen flex flex-col justify-center items-center bg-gray-100"
    >
      <motion.div 
        initial={{ x: -50 }} 
        animate={{ x: 0 }} 
        transition={{ duration: 0.6 }}
        className="flex justify-center mb-4"
      >
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-4xl shadow-lg">
          😀
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-2xl shadow-lg max-w-3xl w-full text-center"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6">User Profile</h2>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          user && (
            <motion.div 
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role}</p>
              <p><strong>Joined:</strong> {new Date(user.createdAt).toDateString()}</p>
            </motion.div>
          )
        )}
      </motion.div>
      
      <motion.div 
        initial={{ x: 50 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-6 mt-6 rounded-2xl shadow-lg max-w-3xl w-full text-center"
      >
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Enrolled Courses</h3>
        <motion.div 
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-2"
        >
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="animate-pulse bg-gray-200 rounded-md h-12 w-full"
            ></div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Profile;
