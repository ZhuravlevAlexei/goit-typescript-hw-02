import React from "react";
import { useState } from "react";

import { SearchbarProps } from "../App.types";
import css from "./Searchbar.module.css";
import sprite from "../../assets/search.svg";
import searchCopied from "../../searchCopied.svg";

const Searchbar: React.FC<SearchbarProps> = ({ onSubmit }) => {
  const [searchInputText, setSearchInputText] = useState<string>("");

  const handleSearchbarSubmit = (evt: React.FormEvent): void => {
    evt.preventDefault();
    onSubmit(searchInputText);
  };

  // const handleSearchbarInputChange = ({ target: { value } }): void => {
  //   setSearchInputText(value);
  // };

  const handleSearchbarInputChange = (
    evt: React.ChangeEvent<HTMLInputElement>
  ): void => {
    evt.preventDefault();
    const {
      target: { value },
    } = evt;
    setSearchInputText(value);
  };

  return (
    <header className={css.searchBar}>
      <form className={css.searchForm} onSubmit={handleSearchbarSubmit}>
        <button type="submit" className={css.searchFormButton}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              placeItems: "center",
              width: "auto",
              height: "48px",
            }}
          >
            🔍
            <svg className={css.searchBtnIcon} width="28" height="28">
              <use href={`${sprite}#search`}></use>
            </svg>
            <svg className={css.searchBtnIcon} width="28" height="28">
              <use href={`${searchCopied}#search`}></use>
            </svg>
          </div>
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

export default Searchbar;
