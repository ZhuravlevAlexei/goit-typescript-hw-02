import React from "react";
import { useState } from "react";

import { SearchbarProps } from "../App.types";
import css from "./Searchbar.module.css";
import sprite from "../../assets/search.svg";

const Searchbar: React.FC<SearchbarProps> = ({ onSubmit }) => {
  const [searchInputText, setSearchInputText] = useState<string>("");

  const handleSearchbarSubmit = (evt: React.FormEvent): void => {
    evt.preventDefault();
    onSubmit(searchInputText);
  };

  // const handleSearchbarInputChange = ({ target: { value } }): void => {
  //   setSearchInputText(value);
  // };

  const handleSearchbarInputChange = ({ target: { value } }): void => {
    evt.preventDefault();
    setSearchInputText(value);
  };

  return (
    <header className={css.searchBar}>
      <form className={css.searchForm} onSubmit={handleSearchbarSubmit}>
        <button type="submit" className={css.searchFormButton}>
          <svg className={css.searchBtnIcon} width="28" height="28">
            <use href={`${sprite}#search`}></use>
          </svg>
        </button>

        <input
          className={css.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleSearchbarInputChange}
          value={searchInputText}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;