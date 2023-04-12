import { useState } from 'react';
import css from './Searchbar.module.css';
import propTypes from 'prop-types';

export const Searchbar = ({createSearchValue}) => {
  const [valueQuery, setValueQuery] = useState('');
  
  const handleChange = ({target: {value}}) => {
    setValueQuery(value);
  }

  const handleSumbit = (e) => {
    e.preventDefault();
    createSearchValue(valueQuery);
    resetForm();
  }

  const resetForm = () => setValueQuery('');

  return (
    <header className={css.searchBar}>
      <form className={css.searchForm} onSubmit={handleSumbit}>
        <button type="submit" className={css.searchFormButton}>
          <span className={css.searchFormButtonLabel}>Search</span>
        </button>
  
        <input
          className={css.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value = {valueQuery}
          onChange={handleChange}
        />
      </form>
    </header>
  )  
  
}

Searchbar.propTypes = {
  createSearchValue: propTypes.func.isRequired,
};