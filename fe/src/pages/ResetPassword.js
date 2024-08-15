// Created by Jahnavi Prasad Srirampurapu
// Reset Password portal for Users

import React, { useState, useEffect, useRef } from "react";
import "../styles/ResetPassword.css";

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const SignIn = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    newPassword: "",
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
    if (!formValues.newPassword) {
      errors.newPassword = true;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      fetch(`${REACT_APP_BACKEND_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: formValues.email,
          password: formValues.password,
          newPassword: formValues.newPassword
        })
      })
        .then(response => response.json())
        .then(data => {
          console.log(data.success);
          if (data.success === false) {
            setShowFailureDialog(true);
          } else if (data.success === true) {
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
    window.location.href = "/#/login";
    setFormValues({
      email: "",
      password: "",
      newPassword: "",
    });
  };

  const closeFailureDialog = () => {
    setShowFailureDialog(false);
    setFormValues({
      email: "",
      password: "",
      newPassword: "",
    });
  };

  return (
    <div className="signin-container">
      <div className="signin-wrapper">
        <form ref={formRef} className="signin-form" onSubmit={handleSubmit}>
          <h1 className="signin-header">Reset Password</h1>
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

            Old Password
            <div className="input-container">
              <input
                className={`signin-input ${formErrors.Password ? "error" : ""}`}
                type="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
              />
            </div>

            New Password
            <div className="input-container">
              <input
                className={`signin-input ${formErrors.newPassword ? "error" : ""}`}
                type="password"
                name="newPassword"
                value={formValues.newPassword}
                onChange={handleChange}
              />
              </div>
          </div>
          <button type="submit" className="signin-submit-btn">
            Reset
          </button>
          <p>Go back to <a href="/#/login">Log In</a></p>
        </form>
        <div className="signin-info">
          <img src={require("../assets/auth/signin.jpg")} alt="Signin" className="signin-image" />
        </div>
      </div>
      {showSuccessDialog && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <div className="dialog-icon">&#10003;</div> {/* Checkmark icon */}
            <div className="dialog-message">Password changed successfully</div>
            <button className="dialog-button" onClick={closeSuccessDialog}>
              OK
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
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;
