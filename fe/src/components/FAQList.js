// Created by Rhushabh Bontapalle
import React from 'react';
import FAQItem from './FAQItem';
import styles from '../styles/FAQList.module.css';

const FAQList = ({ questions }) => {
  return (
    <div className={styles.faqList}>
      {questions.map((question, index) => (
        <FAQItem key={index} question={question} />
      ))}
    </div>
  );
};

export default FAQList;
