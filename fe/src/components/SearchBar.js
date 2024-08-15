// Created by Rhushabh Bontapalle
import React from 'react';
import styles from '../styles/SearchBar.module.css';

const SearchBar = ({ onSearch }) => {
  return (
    <input
      className={styles['search-bar']}
      type="text"
      placeholder="Search products..."
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default SearchBar;
