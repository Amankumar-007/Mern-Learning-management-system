import React from "react";
import CourseCard from "./CourseCard";

const courses = [
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
    image: "https://assets.toptal.io/images?url=https%3A%2F%2Fbs-uploads.toptal.io%2Fblackfish-uploads%2Fcomponents%2Fblog_post_page%2F5912616%2Fcover_image%2Fretina_500x200%2F1015_Next.js_vs._React-_A_Comparative_Tutorial_Illustration_Brief_Blog-287f92e9df7d949cda564fb8904de812.png",
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
  {
    id: 3,
    name: "UI/UX Design for Beginners",
    instructor: "Alice Johnson",
    runtime: 25,
    rating: 4.6,
    reviews: 512,
    price: 799,
    isPremium: true,
    isBestseller: false,
    image: "https://source.unsplash.com/400x300/?design,ux",
  },
];

const CourseListing = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Available Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CourseListing;
