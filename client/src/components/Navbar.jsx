import React, { useState, useEffect } from "react";
import ProfileInfo from "./profile/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "./searchBar/SearchBar";

const Navbar = ({ userInfo, onSearch }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearch(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
  };

  // Add effect to trigger search when query is cleared
  useEffect(() => {
    if (searchQuery === "") {
      onSearch("");
    }
  }, [searchQuery]);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center px-6 py-2 drop-shadow-md bg-white">
      <div className="flex flex-row mb-2 md:mb-0">
        <div className="text-4xl font-medium py-2 caveat">Notes App</div>
      </div>

      <div className="hidden md:flex">
        <SearchBar
          value={searchQuery}
          onChange={({ target }) => {
            setSearchQuery(target.value);
          }}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
          className="w-full md:w-auto mb-2 md:mb-0"
        />
      </div>

      <div className="hidden md:flex flex-row">
        <ProfileInfo userInfo={userInfo} onLogout={handleLogout} />
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
          <SearchBar
            className="w-full md:w-auto mb-2 md:mb-0"
            value={searchQuery}
            onChange={({ target }) => {
              setSearchQuery(target.value);
            }}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
          />
          <ProfileInfo userInfo={userInfo} onLogout={handleLogout} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
