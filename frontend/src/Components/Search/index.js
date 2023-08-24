/** @format */

import React, { useState } from "react";

const Search = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchQuery(searchValue);
    onSearch(searchValue);
  };
  return (
    <div className="formcontainer">
      <form className="search">
        <div className="search__form">
          <span></span>
          <input
            type="text"
            onChange={handleSearch}
            value={searchQuery || ""}
            className="search__form__input"
            placeholder="Rechercher sur Panini"
          />
        </div>
      </form>
    </div>
  );
};

export default Search;
