// Created by Rhushabh Bontapalle
import React from 'react';
import styles from '../styles/Filters.module.css';

const Filters = ({ filters, onFilterChange }) => {
  return (
    <div className={styles.filters}>
      <select onChange={(e) => onFilterChange('color', e.target.value)}>
        <option value="">All Colors</option>
        <option value="red">Red</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
        <option value="black">Black</option>
        <option value="white">White</option>
        <option value="yellow">Yellow</option>
        <option value="purple">Purple</option>
        <option value="orange">Orange</option>
        <option value="pink">Pink</option>
        <option value="grey">Grey</option>
        <option value="brown">Brown</option>
      </select>
      <select onChange={(e) => onFilterChange('type', e.target.value)}>
        <option value="">All Types</option>
        <option value="shirt">Shirt</option>
        <option value="shorts">Shorts</option>
        <option value="sweatshirt">Sweatshirt</option>
        <option value="equipment">Equipment</option>
        <option value="water bottle">Water Bottle</option>
      </select>
    </div>
  );
};

export default Filters;
