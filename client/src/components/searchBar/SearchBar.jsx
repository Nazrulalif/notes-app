import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const SearchBar = ({ onChange }) => {
  return (
    <>
      <div className="w-88 px-4 flex items-center bg-slate-100 rounded-md ">
        <input
          type="text"
          placeholder="Search"
          className="w-80 h-10 bg-transparent rounded-md outline-none"
          onChange={onChange}
        />
        <FontAwesomeIcon icon={faSearch} />
      </div>
    </>
  );
};

export default SearchBar;
