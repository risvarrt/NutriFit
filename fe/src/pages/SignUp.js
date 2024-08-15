// Created by Jahnavi Prasad Srirampurapu
// Sign Up portal for Users and Gym Representatives

import React, { useState, useEffect, useRef } from "react";
import "../styles/SignUp.css";

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const SignUp = () => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
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

    if (!formValues.firstName) {
      errors.firstName = true;
    }
    if (!formValues.lastName) {
      errors.lastName = true;
    }
    if (!formValues.email) {
      errors.email = true;
    } else if (!validEmail.test(formValues.email)) {
      errors.email = true;
    }
    if (!formValues.password) {
      errors.password = true;
    }
    if (!formValues.role) {
      errors.role = true;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(REACT_APP_BACKEND_URL);
      fetch(`${REACT_APP_BACKEND_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: formValues.email,
          password: formValues.password,
          role: formValues.role
        })
      })
        .then(response => response.json())
        .then(data => {
          console.log(data.success);
          if (data.success === false) {
            setShowFailureDialog(true);
          } else if (data.success === true) {
            localStorage.setItem("firstName", formValues.firstName);
            localStorage.setItem("lastName", formValues.lastName);
            localStorage.setItem("fullName", formValues.firstName + " " + formValues.lastName);
            localStorage.setItem("email", formValues.email);
            localStorage.setItem("role", formValues.role);
            setShowSuccessDialog(true);
          }
        })
        .catch(error => {
          // Handle any errors here
          //console.error(error);
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
    window.location.href = "/#/login";
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
    <div className="signup-container">
      <div className="signup-wrapper">
        <div className="signup-info">
          <img src={require("../assets/auth/signup.jpg")} alt="Signup" className="signup-image" />
        </div>
        <form ref={formRef} className="signup-form" onSubmit={handleSubmit}>
          <h1 className="signup-header">Create Account</h1>
          <div className="signup-input-group">
            First Name
            <div className="input-container">
              <input
                className={`signup-input ${formErrors.firstName ? "error" : ""
                  }`}
                type="text"
                name="firstName"
                value={formValues.firstName}
                onChange={handleChange}
              />
            </div>

            Last Name
            <div className="input-container">
              <input
                className={`signup-input ${formErrors.lastName ? "error" : ""
                  }`}
                type="text"
                name="lastName"
                value={formValues.lastName}
                onChange={handleChange}
              />
            </div>

            Email
            <div className="input-container">
              <input
                className={`signup-input ${formErrors.email ? "error" : ""}`}
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
              />
            </div>

            Password
            <div className="input-container">
              <input
                className={`signup-input ${formErrors.Password ? "error" : ""}`}
                type="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
              />
            </div>
            Role
            <div className="input-container">
              <select
                className={`signup-input ${formErrors.role ? "error" : ""}`}
                name="role"
                value={formValues.role}
                onChange={handleChange}
              >
                <option value="">Select Role</option>
                <option value="user">I'm a Fitness Enthusiast</option>
                <option value="gym">I'm a Gym Representative</option>
              </select>
            </div>
          </div>
          <button type="submit" className="signup-submit-btn">
            Sign Up
          </button>
          <p>Already have an account? <a href="/#/login">Log In</a></p>
        </form>
      </div>
      {showSuccessDialog && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <div className="dialog-icon">&#10003;</div> {/* Checkmark icon */}
            <div className="dialog-message">User Registered Successfully</div>
            <button className="dialog-button" onClick={closeSuccessDialog}>
              Go to Login
            </button>
          </div>
        </div>
      )}
      {showFailureDialog && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <div className="dialog-icon">&#10060;</div> {/* X mark icon */}
            <div className="dialog-message">Username already exists</div>
            <button className="dialog-button" onClick={closeFailureDialog}>
              Ok
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
