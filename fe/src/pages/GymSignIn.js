// Created by Jahnavi Prasad Srirampurapu
// Sign In portal for Gym Representatives

import React, { useState, useEffect, useRef } from "react";
import "../styles/SignIn.css";

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const GymSignIn = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showFailureDialog, setShowFailureDialog] = useState(false);

  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let errors = {};
    let validEmail = /\S+@\S+\.\S+/;

    if (!formValues.email) {
      errors.email = true;
    } else if (!validEmail.test(formValues.email)) {
      errors.email = true;
    }
    if (!formValues.password) {
      errors.password = true;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      fetch(`${REACT_APP_BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: formValues.email,
          password: formValues.password,
          role: "gym"
        })
      })
        .then(response => response.json())
        .then(data => {
          console.log(data.success);
          if (data.success === false) {
            setShowFailureDialog(true);
          } else if (data.success === true) {
            localStorage.setItem("email", formValues.email);
            localStorage.setItem("role", "gym");
            localStorage.setItem("token", data.token);
            setShowSuccessDialog(true);
          }
        })
        .catch(error => {
          // Handle any errors here
          console.error(error);
        });
    }
  };

  const handleClickOutside = (e) => {
    if (formRef.current && !formRef.current.contains(e.target)) {
      setFormErrors({});
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const closeSuccessDialog = () => {
    setShowSuccessDialog(false);
    window.location.href = "/#/blog";
    setFormValues({
      email: "",
      password: "",
    });
  };

  const closeFailureDialog = () => {
    setShowFailureDialog(false);
    setFormValues({
      email: "",
      password: "",
    });
  };

  return (
    <div className="signin-container">
      <div className="signin-wrapper">
        <form ref={formRef} className="signin-form" onSubmit={handleSubmit}>
          <h1 className="signin-header">Gym Representative Log In</h1>
          <div className="signin-input-group">
            Email Address
            <div className="input-container">
              <input
                className={`signin-input ${formErrors.email ? "error" : ""}`}
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
              />
            </div>

            Password
            <div className="input-container">
              <input
                className={`signin-input ${formErrors.Password ? "error" : ""}`}
                type="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <button type="submit" className="signin-submit-btn">
            Log In
          </button>
          <p>Don't have an account? <a href="/#/signup">Sign Up</a></p>
        </form>
        <div className="signin-info">
          <img src={require("../assets/auth/gym.png")} alt="Signin" className="gym-signin-image" />
        </div>
      </div>
      {showSuccessDialog && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <div className="dialog-icon">&#10003;</div> {/* Checkmark icon */}
            <div className="dialog-message">You are logged in successfully</div>
            <button className="dialog-button" onClick={closeSuccessDialog}>
              Go to Home Page
            </button>
          </div>
        </div>
      )}
      {showFailureDialog && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <div className="dialog-icon">&#10060;</div> {/* X mark icon */}
            <div className="dialog-message">Password Incorrect</div>
            <button className="dialog-button" onClick={closeFailureDialog}>
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GymSignIn;
