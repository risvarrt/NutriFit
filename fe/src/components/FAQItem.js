// Created by Rhushabh Bontapalle
import React, { useState } from 'react';
import styles from '../styles/FAQItem.module.css';

const FAQItem = ({ question }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.faqItem}>
      <button
        className={`${styles.faqQuestion} ${isOpen ? styles.open : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {question.question}
        <span className={styles.arrow}>{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && <div className={styles.faqAnswer}>{question.answer}</div>}
    </div>
  );
};

export default FAQItem;
