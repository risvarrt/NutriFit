// Created by Jahnavi Prasad Srirampurapu
// Sign In portal for Users

import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/SignIn.css";

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function SignIn() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showFailureDialog, setShowFailureDialog] = useState(false);
  const formRef = useRef(null);
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

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
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formValues.email,
          password: formValues.password,
          role: "user",
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success === false) {
            setShowFailureDialog(true);
          } else if (data.success === true) {
            localStorage.setItem("email", formValues.email);
            localStorage.setItem("role", "user");
            localStorage.setItem("token", data.token);
            setAuth({ token: data.token });
            setShowSuccessDialog(true);
          }
        })
        .catch((error) => {
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
    navigate("/"); // Navigate to the home page after successful login
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
          <h1 className="signin-header">Log In</h1>
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
                className={`signin-input ${formErrors.password ? "error" : ""}`}
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
          <p>
            Gym Representatives <a href="/#/gym-login">Login Here</a> <br></br>
            <br></br>
            Don't have an account? <a href="/#/signup">Sign Up</a>
            <br></br>
            <br></br>
            <a href="/#/reset-password">Reset Password</a>
          </p>
        </form>
        <div className="signin-info">
          <img
            src={require("../assets/auth/signin.jpg")}
            alt="Signin"
            className="signin-image"
          />
        </div>
      </div>
      {showSuccessDialog && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <div className="dialog-icon">&#10003;</div> {/* Checkmark icon */}
            <div className="dialog-message">You are logged in successfully</div>
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
}

export default SignIn;
