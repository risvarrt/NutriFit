// Created by Rhushabh Bontapalle
import React, { useState } from 'react';
import styles from '../styles/SizePopup.module.css';

const SizePopup = ({ product, onClose, onAddToCart }) => {
  const [size, setSize] = useState('');

  const handleAddToCart = () => {
    if (size) {
      onAddToCart(product, size);
      onClose();
    } else {
      alert('Please select a size.');
    }
  };

  return (
    <div className={styles['size-popup']}>
      <div className={styles['popup-content']}>
        <h3>Select Size for {product.name}</h3>
        <select onChange={(e) => setSize(e.target.value)} value={size}>
          <option value="">Select Size</option>
          <option value="S">Small</option>
          <option value="M">Medium</option>
          <option value="L">Large</option>
        </select>
        <button onClick={handleAddToCart}>Add to Cart</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SizePopup;
