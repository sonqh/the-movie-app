import { Skeleton } from "antd";
import React from "react";
import { PAGE_SIZE } from "../../Constant/Constant";

const MovieSkeleton = () => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[...Array(PAGE_SIZE)].map((_, index) => (
        <div key={index} className="bg-gray-300 rounded-lg shadow-lg p-6">
          <Skeleton.Image className="w-full h-48 object-cover mb-4 rounded-lg" />
          <Skeleton active paragraph={{ rows: 2 }} />
        </div>
      ))}
    </div>
  );
};

export default MovieSkeleton;
