// Created by Rhushabh Bontapalle

import React from 'react';
import FAQList from '../components/FAQList';
import ContactButton from '../components/ContactButton';
import styles from '../styles/FAQPage.module.css';
import Navbar from '../components/Navbar';

const questions = [
  {
    question: 'What is the purpose of this fitness app?',
    answer:
      'The app allows users to look up new workouts and find or create recipes that fit their diet, serving as a one-stop solution for everything fitness-related.',
  },
  {
    question: 'What features does the app offer?',
    answer:
      'The app offers features like profile management, workout browsing, workout tracking, fitness journey documentation, recipe browsing and building, a merch store, community posts, notifications and reminders, and program creation for gym representatives.',
  },
  {
    question: 'How can I manage my profile?',
    answer:
      'Users can create and update personal profiles with their fitness goals, preferences, and health information.',
  },
  {
    question: 'How do I browse and track workouts?',
    answer:
      'Users can see a list of available workouts and click on specific ones for more information. They can also log workouts and track their progress over time.',
  },
  {
    question: 'What is the AI-generated recipe feature?',
    answer:
      'Users can enter their fitness goals and available ingredients, and the app uses Open AI’s Text Completion APIs to generate personalized recipes.',
  },
  {
    question: 'Can I document my fitness journey?',
    answer:
      'Yes, users can document their fitness details like current weight, height, hips, etc., input fitness data, view metrics history, and edit their progress reports.',
  },
  {
    question: 'What community features are available?',
    answer:
      'The app includes a community posts page where users can see and share posts with other users.',
  },
  {
    question: 'How does the merch store work?',
    answer:
      'The app includes an e-commerce store with checkout functionality where users can purchase fitness-related merchandise.',
  },
  {
    question: 'What notifications and reminders will I receive?',
    answer:
      'Users will receive push notifications for registration, new workouts, and reminders to enter fitness journey details.',
  },
  {
    question: 'How can gym representatives use the app?',
    answer:
      'Gym representatives can create workout and recipe programs, publish them in the marketplace, and modify existing programs.',
  },
  {
    question: 'Who is the target user base for this app?',
    answer:
      'The app is designed for fitness enthusiasts who want to pursue a fitness journey through exercise or diet and gym staff who create workout routines.',
  },
];

const FAQPage = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.faqPage}>
        <h1 className={styles.title}>Frequently Asked Questions</h1>
        <FAQList questions={questions} />
        <div className={styles.stillQuestions}>
          <h2>Still, have questions?</h2>
          <p>You ask a lot, but we are here to help</p>
          <ContactButton />
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
