// Created by Rhushabh Bontapalle
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/BlogPage.module.css';

const BlogPage = () => {
  const { auth } = useContext(AuthContext);
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/blog`
      );
      const data = await response.json();
      setBlogs(data);
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
    }
  };

  const handlePost = async () => {
    if (!topic || !description) {
      alert('Please fill in both the topic and description');
      return;
    }

    try {
      const email = localStorage.getItem('email');
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/blog`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify({ userEmail: email, topic, description }),
        }
      );

      if (response.ok) {
        setTopic('');
        setDescription('');
        fetchBlogs();
      } else {
        alert('Failed to post the blog');
      }
    } catch (err) {
      console.error('Post error:', err);
    }
  };

  return (
    <div className={styles.blogPage}>
      <h1 className={styles.title}>Blog Page</h1>
      <div className={styles.form}>
        <input
          type="text"
          placeholder="Title"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className={styles.input}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.textarea}
        ></textarea>
        <button onClick={handlePost} className={styles.button}>
          Post
        </button>
      </div>
      <div className={styles.blogs}>
        {blogs.map((blog) => (
          <div key={blog._id} className={styles.blog}>
            <h2 className={styles.blogTopic}>{blog.topic}</h2>
            <p className={styles.blogDescription}>{blog.description}</p>
            <div className={styles.blogFooter}>
              <span>{blog.userEmail}</span>
              <span>{new Date(blog.date).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
