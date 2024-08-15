// Created by Rhushabh Bontapalle
import React, { useContext } from 'react';
import styles from '../styles/ProductCard.module.css';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product, onCardClick }) => {
  const { addToCart } = useContext(CartContext);
  const imageName = product.name.split(' ').join('_') + '.jpg';
  const imageSrc = require(`../assets/products/${imageName}`);

  return (
    <div
      className={styles['product-card']}
      onClick={() => onCardClick(product)}
    >
      <img
        src={imageSrc}
        alt={product.name}
        className={styles['product-image']}
      />
      <h3>{product.name}</h3>
      <p>Price: ${product.price}</p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          addToCart(product);
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
