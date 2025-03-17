import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../features/authSlice";
import { motion } from "framer-motion";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setPreviewImage(user.photoUrl && user.photoUrl.trim() !== "" ? user.photoUrl : "/default-avatar.png");
    }
  }, [user]);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    await dispatch(updateUserProfile({ name, profilePhoto }));
    setShowModal(false);
  };

  return (
    <motion.div 
      className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="bg-white p-8 rounded-2xl shadow-lg max-w-lg w-full text-center"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Profile</h2>
        {error && <p className="text-red-500">{error}</p>}
        
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <img 
  src={previewImage ? previewImage : "/default-avatar.png"} 
  alt="Profile" 
  className="w-32 h-32 rounded-full mx-auto border-4 border-gray-200 shadow-md"
  onError={(e) => e.target.src = "/default-avatar.png"} // Fallback if image fails to load
/>

            <p className="mt-4 text-lg text-gray-700"><strong>Name:</strong> {user?.name}</p>
            <p className="text-lg text-gray-600"><strong>Email:</strong> {user?.email}</p>
            <button 
              onClick={() => setShowModal(true)} 
              className="mt-5 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
            >
              Update Profile
            </button>
          </>
        )}
      </motion.div>

      {showModal && (
        <motion.div 
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="bg-white p-6 rounded-lg w-96 shadow-lg"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="w-full p-2 border rounded mb-2" 
              placeholder="Enter new name" 
            />
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange} 
              className="w-full p-2 border rounded mb-2" 
            />
            {previewImage && (
              <motion.img 
                src={previewImage} 
                alt="Preview" 
                className="w-24 h-24 rounded-full mx-auto mt-2 border" 
                whileHover={{ scale: 1.1 }}
              />
            )}
            <div className="flex justify-end mt-4">
              <button 
                onClick={handleSubmit} 
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
              >
                Save
              </button>
              <button 
                onClick={() => setShowModal(false)} 
                className="ml-2 px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition-all"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Profile;
