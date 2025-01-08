import React, { useState } from "react";
import ProfileInfo from "./profile/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "./searchBar/SearchBar";

const Navbar = () => {
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center px-6 py-2 drop-shadow-md bg-white">
      <div className="flex flex-row mb-2 md:mb-0">
        <div className="text-4xl font-medium py-2 caveat">Notes App</div>
      </div>

      <div className="hidden md:flex">
        <SearchBar className="w-full md:w-auto mb-2 md:mb-0" />
      </div>

      <div className="hidden md:flex flex-row">
        <ProfileInfo onLogout={handleLogout} />
      </div>

      <div className="md:hidden">
        <button
          onClick={toggleMobileMenu}
          className="text-3xl focus:outline-none pb-3"
        >
          {isMobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      <div
        className={`md:hidden w-full ${isMobileMenuOpen ? "block" : "hidden"}`}
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <SearchBar className="w-full md:w-auto mb-2 md:mb-0" />

          <ProfileInfo onLogout={handleLogout} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
