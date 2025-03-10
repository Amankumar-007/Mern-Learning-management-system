import React from "react";

const CourseSkeleton = () => {
  return (
    <div className="bg-gray-200 shadow-md rounded-lg overflow-hidden animate-pulse">
      {/* Skeleton Image */}
      <div className="w-full h-44 bg-gray-300"></div>

      {/* Skeleton Text */}
      <div className="p-4">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-1/2 mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-1/4"></div>
        <div className="h-5 bg-gray-300 rounded w-1/3 mt-3"></div>
      </div>
    </div>
  );
};

export default CourseSkeleton;
