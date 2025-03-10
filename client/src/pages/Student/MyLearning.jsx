import React, { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import CourseSkeleton from "../../components/CourseSkeleton";

const MyLearning = () => {
  const [loading, setLoading] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    // Simulate an API call delay
    setTimeout(() => {
      setEnrolledCourses([
        {
          id: 1,
          name: "Full-Stack Web Development",
          instructor: "John Doe",
          runtime: 40,
          rating: 4.8,
          reviews: 44931,
          price: 2699,
          isPremium: true,
          isBestseller: true,
          image: "https://source.unsplash.com/400x300/?technology,code",
        },
        {
          id: 2,
          name: "React & Redux Masterclass",
          instructor: "Jane Smith",
          runtime: 35,
          rating: 4.7,
          reviews: 1780,
          price: 3099,
          isPremium: true,
          isBestseller: false,
          image: "https://source.unsplash.com/400x300/?react,javascript",
        },
      ]);
      setLoading(false);
    }, 2000); // Simulate loading delay
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">My Learning</h2>
      {loading ? (
        // Show skeleton loader while fetching courses
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <CourseSkeleton />
          <CourseSkeleton />
          <CourseSkeleton />
        </div>
      ) : enrolledCourses.length === 0 ?  (
        // Show message if no enrolled courses
        <p className="text-lg text-gray-600">You haven't enrolled in any courses yet.</p>
      ):(
        // Show enrolled courses
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {enrolledCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyLearning;
