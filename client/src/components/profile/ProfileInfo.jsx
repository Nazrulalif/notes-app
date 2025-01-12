import React from "react";
import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ userInfo, onLogout }) => {
  if (!userInfo) {
    return null; // If userInfo is not loaded yet, don't render anything
  }

  return (
    <div className="flex items-center gap-3">
      <div className="rounded-full text-lg font-semibold bg-gray-200 w-10 h-10 flex items-center justify-center">
        {getInitials(userInfo.fullName)}
      </div>

      <div className="flex flex-col">
        <div className="font-normal text-md">{userInfo.fullName}</div>
        <button
          className="text-sm text-gray-500 hover:text-primary"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
