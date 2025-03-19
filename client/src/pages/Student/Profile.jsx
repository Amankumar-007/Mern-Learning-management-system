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
  const [previewImage, setPreviewImage] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      if (user.photoUrl && user.photoUrl.trim() !== "") {
        setPreviewImage(user.photoUrl);
      } else {
        setPreviewImage("/default-avatar.png");
      }
    }
  }, [user]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);
    }
  };

  const handleSubmit = async () => {
    setUpdateError(null);
    try {
      if (!user || !user._id || !user.token) {
        setUpdateError("You must be logged in to update your profile");
        return;
      }
      const result = await dispatch(updateUserProfile({ name, profilePhoto })).unwrap();
      if (result) {
        setShowModal(false);
        setUpdateSuccess(true);
        setTimeout(() => setUpdateSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Update failed:", err);
      setUpdateError(err || "Failed to update profile");
    }
  };

  const defaultImage = "/default-avatar.png";

  return (
    <motion.div
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Navbar */}
      <div className="bg-white shadow-md p-4 flex justify-between items-center">
        <div className="text-xl font-bold text-gray-800">MyApp</div>
        <div className="flex gap-4">
          <a href="#" className="text-gray-600 hover:text-gray-800">Home</a>
          <a href="#" className="text-gray-600 hover:text-gray-800">Courses</a>
          <a href="#" className="text-gray-600 hover:text-gray-800">Profile</a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-8 p-8">
        {/* Profile Section */}
        <motion.div
          className="md:w-1/3 bg-gray-50 p-8 rounded-3xl shadow-md"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Profile</h2>
          {error && (
            <motion.div
              className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.div>
          )}
          {updateSuccess && (
            <motion.div
              className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              Profile updated successfully!
            </motion.div>
          )}
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              <div className="relative w-32 h-32 mb-6">
                <img
                  src={previewImage || defaultImage}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-2 border-gray-200 shadow-lg"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defaultImage;
                  }}
                />
              </div>
              <div className="mb-6">
                <p className="text-lg text-gray-800 mb-2">
                  <span className="font-semibold text-gray-600">Name:</span> {user?.name || "Not set"}
                </p>
                <p className="text-lg text-gray-800">
                  <span className="font-semibold text-gray-600">Email:</span> {user?.email || "Not available"}
                </p>
              </div>
              <motion.button
                onClick={() => setShowModal(true)}
                className="px-6 py-3 bg-blue-100 text-blue-800 font-medium rounded-xl hover:bg-blue-200 transition-all"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Update Profile
              </motion.button>
            </>
          )}
        </motion.div>

        {/* Enrolled Courses Skeleton */}
        <div className="md:w-2/3">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Enrolled Courses</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-4 rounded-lg shadow-md">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for Updating Profile */}
      {showModal && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-white p-8 rounded-2xl w-96 shadow-2xl"
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Update Your Profile</h2>
            {updateError && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4">
                {updateError}
              </div>
            )}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profilePhoto">
                Profile Photo
              </label>
              <input
                id="profilePhoto"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-200 rounded-lg text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
              />
            </div>
            {previewImage && (
              <motion.div className="flex justify-center mb-6">
                <motion.img
                  src={previewImage}
                  alt="Preview"
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defaultImage;
                  }}
                  whileHover={{ scale: 1.1 }}
                />
              </motion.div>
            )}
            <div className="flex justify-end gap-3">
              <motion.button
                onClick={() => {
                  setShowModal(false);
                  setUpdateError(null);
                }}
                className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
              <motion.button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Profile;