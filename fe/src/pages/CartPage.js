// Created by Rhushabh Bontapalle
import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';
import styles from '../styles/CartPage.module.css';

const CartPage = () => {
  const { auth } = useContext(AuthContext);
  const { cart, removeFromCart, updateQuantity, clearCart } =
    useContext(CartContext);
  const [checkoutMessage, setCheckoutMessage] = useState('');
  const [countdown, setCountdown] = useState(0);

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/checkout`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify({ products: cart }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setCheckoutMessage(
          'Thank you for your order! You will receive a notification and invoice on your email.'
        );
        setCountdown(10); // Start countdown from 10 seconds
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
      } else {
        setCheckoutMessage('Checkout failed. Please try again.');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setCheckoutMessage('Checkout error. Please try again.');
    }
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && checkoutMessage) {
      clearCart();
      setCheckoutMessage('');
    }
  }, [countdown, checkoutMessage, clearCart]);

  return (
    <div className={styles.cartPage}>
      <h1 className={styles.cartTitle}>Your Cart</h1>
      {checkoutMessage && (
        <p className={styles.checkoutMessage}>
          {checkoutMessage} Clearing cart in {countdown} seconds...
        </p>
      )}
      {cart.length === 0 ? (
        <p className={styles.emptyCart}>Your cart is empty.</p>
      ) : (
        <>
          <ul className={styles.cartList}>
            {cart.map((item) => (
              <li key={item.id} className={styles.cartItem}>
                <ProductCard product={item} onCardClick={() => {}} />
                <div className={styles.cartActions}>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, Number(e.target.value))
                    }
                    min="1"
                    className={styles.quantityInput}
                  />
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className={styles.removeButton}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.cartSummary}>
            <h2>Total: ${calculateTotal()}</h2>
            <button onClick={handleCheckout} className={styles.checkoutButton}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
