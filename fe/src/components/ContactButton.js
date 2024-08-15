// Created by Rhushabh Bontapalle
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/ContactButton.module.css';

const ContactButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/contact');
  };

  return (
    <button className={styles.contactButton} onClick={handleClick}>
      Contact us
    </button>
  );
};

export default ContactButton;
