import React from "react";

const EmptyCard = ({ message = "No items available." }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-48 border border-dashed border-gray-300 rounded-lg bg-gray-50">
      <div className="text-gray-500 text-sm">{message}</div>
    </div>
  );
};

export default EmptyCard;
