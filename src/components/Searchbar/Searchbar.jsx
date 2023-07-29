import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export const Searchbar = ({ setAppState, searchValue }) => {
  const [inputValue, setInputValue] = useState('');

  const onSubmitForm = evt => {
    evt.preventDefault();
    if (inputValue === '' || inputValue === searchValue) {
      return;
    }
    setAppState(inputValue.trim().toLowerCase());
  };
  const onChange = evt => setInputValue(evt.target.value);
  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={onSubmitForm}>
        <button type="submit" className={css.SearchForm__button}>
          <span className={css.SearchForm__button__label}>Search</span>
        </button>

        <input
          className={css.SearchForm__input}
          type="text"
          name="search"
          value={inputValue}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onChange}
        />
      </form>
    </header>
  );
};
Searchbar.propTypes = {
  setAppState: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
};
