import { motion } from "framer-motion";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getInstructorProfile } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";

const InstructorDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, instructorProfile, loading, error } = useSelector((state) => state.auth) || {};

  useEffect(() => {
    if (user?.role === "instructor" && user._id) {
      dispatch(getInstructorProfile());
    }
  }, [dispatch, user?._id, user?.role]);

  if (!user || user.role !== "instructor") {
    return <p className="text-center text-red-500 mt-10">Access Denied</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Profile Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
        <motion.img
          src={user.profilePicture || "/default-avatar.png"}
          alt="Instructor Profile"
          className="w-24 h-24 rounded-full mb-4 border"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <h2 className="text-xl font-semibold">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>
        <motion.button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/create-course")}
        >
          Create Course
        </motion.button>
      </div>

      {/* Courses Section */}
      <h3 className="mt-8 text-2xl font-semibold">Your Courses</h3>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : instructorProfile?.courses?.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {instructorProfile.courses.map((course) => (
            <div key={course._id} className="bg-white shadow-md rounded-lg p-4">
              <h4 className="text-lg font-medium">{course.courseTitle}</h4>
              <p className="text-gray-600 text-sm">{course.category}</p>
              <motion.button
                className="mt-2 text-blue-600 hover:underline"
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate(`/course/${course._id}`)}
              >
                View Course
              </motion.button>
            </div>
          ))}
        </motion.div>
      ) : (
        <p className="text-gray-500 mt-4">No courses created yet.</p>
      )}
    </div>
  );
};

export default InstructorDashboard;
