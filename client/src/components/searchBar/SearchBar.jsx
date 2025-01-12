import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
const SearchBar = ({ onChange, value, handleSearch, onClearSearch }) => {
  return (
    <>
      <div className="w-88 px-4 flex items-center bg-slate-100 rounded-md ">
        <input
          type="text"
          placeholder="Search"
          className="w-80 h-10 bg-transparent rounded-md outline-none"
          onChange={onChange}
          value={value}
        />
        {value && (
          <button onClick={onClearSearch}>
            <FontAwesomeIcon icon={faTimes} className="text-gray-500 me-4" />
          </button>
        )}
        <button onClick={handleSearch}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </>
  );
};

export default SearchBar;
