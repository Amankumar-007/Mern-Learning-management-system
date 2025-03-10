import React from "react";
import { Star } from "lucide-react";

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Course Image */}
      <div className="relative">
        <img src={course.image} alt={course.name} className="w-full h-44 object-cover rounded-t-lg" />
      </div>

      {/* Course Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 truncate">{course.name}</h3>
        <p className="text-sm text-gray-600 truncate">By {course.instructor}</p>

        {/* Rating */}
        <div className="flex items-center mt-1">
          <span className="text-sm font-semibold text-yellow-500">{course.rating}</span>
          <Star className="w-4 h-4 text-yellow-400 ml-1" />
          <span className="text-xs text-gray-500 ml-1">({course.reviews.toLocaleString()})</span>
        </div>

        {/* Price */}
        <p className="text-lg font-bold text-gray-900 mt-2">₹{course.price.toLocaleString()}</p>

        {/* Badges */}
        <div className="flex gap-2 mt-2">
          {course.isPremium && (
            <span className="text-xs font-semibold text-white bg-purple-600 px-2 py-1 rounded-md">Premium</span>
          )}
          {course.isBestseller && (
            <span className="text-xs font-semibold text-white bg-green-500 px-2 py-1 rounded-md">Bestseller</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
