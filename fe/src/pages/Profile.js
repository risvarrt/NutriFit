// Created by Jahnavi Prasad Srirampurapu
// Profile page for users to update their Profile Information

import React, { useState, useEffect, useRef } from "react";
import "../styles/Profile.css";

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Profile = () => {
  const [formValues, setFormValues] = useState({
    firstName: localStorage.getItem("firstName") || "",
    lastName: localStorage.getItem("lastName") || "",
    email: localStorage.getItem("email"),
    phone: localStorage.getItem("phone") || "",
    age: localStorage.getItem("age") || "",
    city: localStorage.getItem("city") || "",
    height: localStorage.getItem("height") || "",
    weight: localStorage.getItem("weight") || "",
    gender: localStorage.getItem("gender") || "",
    goal: localStorage.getItem("goal") || "",
    medical: localStorage.getItem("medical") || "",
    preferences: localStorage.getItem("preferences") || "",
    restrictions: localStorage.getItem("restrictions") || "",
    injuries: localStorage.getItem("injuries") || "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let errors = {};
    let validPhone = /^[0-9]{10}$/;

    if (!formValues.firstName) {
      errors.firstName = true;
    }
    if (!formValues.lastName) {
      errors.lastName = true;
    }
    if (!formValues.phone) {
      errors.phone = true;
    } else if (!validPhone.test(formValues.phone)) {
      errors.phone = true;
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const handleDeleteProfile = () => {
    localStorage.setItem("delete", "true");
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    fetch(`${REACT_APP_BACKEND_URL}/api/auth/delete-user`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: formValues.email
      })
    })
      .then(response => response.json())
      .catch(error => {
        // Handle any errors here
        console.error(error);
      });
    localStorage.clear();
    setShowDeleteSuccess(true);
    window.location.href = "/#/login";
  };

  const handleCancelDelete = () => {
    localStorage.removeItem("delete");
    setShowDeleteDialog(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm() && !localStorage.getItem("delete")) {
      console.log("Form submitted successfully", formValues);
      localStorage.setItem("firstName", formValues.firstName);
      localStorage.setItem("lastName", formValues.lastName);
      localStorage.setItem("fullName", formValues.firstName + " " + formValues.lastName);
      localStorage.setItem("role", "user");
      localStorage.setItem("phone", formValues.phone);
      localStorage.setItem("age", formValues.age);
      localStorage.setItem("city", formValues.city);
      localStorage.setItem("height", formValues.height);
      localStorage.setItem("weight", formValues.weight);
      localStorage.setItem("gender", formValues.gender);
      localStorage.setItem("goal", formValues.goal);
      localStorage.setItem("medical", formValues.medical);
      localStorage.setItem("preferences", formValues.preferences);
      localStorage.setItem("restrictions", formValues.restrictions);
      localStorage.setItem("injuries", formValues.injuries);
      setShowSuccessDialog(true);
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

  const closeDialog = () => {
    setShowSuccessDialog(false);
    setShowDeleteDialog(false);
    setShowDeleteSuccess(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        <form ref={formRef} className="profile-form" onSubmit={handleSubmit}>
          <h1 className="profile-header">My Profile</h1>

          <div className="profile-group">
            <div className="profile-input-group">
              <div className="input-container">
                <div className="profile-info">
                  <img
                    src={require("../assets/auth/profile.png")}
                    alt="Profile"
                    className="profile-image"
                    style={{ borderRadius: "50%", height: "50%", width: "50%" }}
                  />
                </div>
              </div>
            </div>
            <div className="profile-input-group">
              <div className="input-container">
                First Name
                <input
                  className={`profile-input ${formErrors.firstName ? "error" : ""
                    }`}
                  type="text"
                  name="firstName"
                  value={formValues.firstName || localStorage.getItem("firstName") || ""}
                  onChange={handleChange}
                />
              </div>
              Email
              <div className="input-container">
                <input
                  className={`profile-input ${formErrors.email ? "error" : ""}`}
                  type="email"
                  name="email"
                  value={formValues.email || localStorage.getItem("email")}
                  onChange={handleChange}
                  readOnly
                />
              </div>
              Age
              <div className="input-container">
                <input
                  className={`profile-input ${formErrors.age ? "error" : ""
                    }`}
                  type="number"
                  name="age"
                  value={formValues.age || localStorage.getItem("age") || ""}
                  onChange={handleChange}
                />
              </div>
              Height in cm
              <div className="input-container">
                <input
                  className={`profile-input ${formErrors.height ? "error" : ""
                    }`}
                  type="number"
                  name="height"
                  value={formValues.height || localStorage.getItem("height") || ""}
                  onChange={handleChange}
                />
              </div>
              Gender
              <div className="input-container">
                <input
                  className={`profile-input ${formErrors.gender ? "error" : ""
                    }`}
                  type="text"
                  name="gender"
                  value={formValues.gender || localStorage.getItem("gender") || ""}
                  onChange={handleChange}
                />
              </div>

              Medical Conditions
              <div className="input-container">
                <textarea
                  className={`contact-textarea ${formErrors.medical ? "error" : ""
                    }`}
                  name="medical"
                  value={formValues.medical || localStorage.getItem("medical") || ""}
                  onChange={handleChange}
                ></textarea>
              </div>

              Exercise Preferences
              <div className="input-container">
                <textarea
                  className={`contact-textarea ${formErrors.preferences ? "error" : ""
                    }`}
                  name="preferences"
                  value={formValues.preferences || localStorage.getItem("preferences") || ""}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            <div className="profile-input-group">
              Last Name
              <div className="input-container">
                <input
                  className={`profile-input ${formErrors.lastName ? "error" : ""
                    }`}
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formValues.lastName || localStorage.getItem("lastName") || ""}
                  onChange={handleChange}
                />
              </div>
              Phone Number
              <div className="input-container">
                <input
                  className={`profile-input ${formErrors.phone ? "error" : ""}`}
                  type="number"
                  name="phone"
                  value={formValues.phone || localStorage.getItem("phone") || ""}
                  onChange={handleChange}
                />
              </div>
              City
              <div className="input-container">
                <input
                  className={`profile-input ${formErrors.city ? "error" : ""}`}
                  type="text"
                  name="city"
                  value={formValues.city || localStorage.getItem("city") || ""}
                  onChange={handleChange}
                />
              </div>
              Weight in Kg
              <div className="input-container">
                <input
                  className={`profile-input ${formErrors.weight ? "error" : ""}`}
                  type="number"
                  name="weight"
                  value={formValues.weight || localStorage.getItem("weight") || ""}
                  onChange={handleChange}
                />
              </div>
              What is your main fitness goal?
              <div className="input-container">
                <input
                  className={`profile-input ${formErrors.goal ? "error" : ""}`}
                  type="text"
                  name="goal"
                  value={formValues.goal || localStorage.getItem("goal") || ""}
                  onChange={handleChange}
                />
              </div>
              Dietary Restrictions
              <div className="input-container">
                <textarea
                  className={`contact-textarea ${formErrors.restrictions ? "error" : ""
                    }`}
                  name="restrictions"
                  value={formValues.restrictions || localStorage.getItem("restrictions") || ""}
                  onChange={handleChange}
                ></textarea>
              </div>

              Injury History
              <div className="input-container">
                <textarea
                  className={`contact-textarea ${formErrors.injuries ? "error" : ""
                    }`}
                  name="injuries"
                  value={formValues.injuries || localStorage.getItem("injuries") || ""}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          </div>

          <button type="submit" className="profile-save-btn">
            Save
          </button><br></br>
          <button type="delete" className="profile-delete-btn" onClick={handleDeleteProfile}>
            Delete Profile
          </button>
        </form>
      </div>
      {showSuccessDialog && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <div className="dialog-icon">&#10003;</div> {/* Checkmark icon */}
            <div className="dialog-message">Profile Updated Successfully</div>
            <button className="dialog-button" onClick={closeDialog}>
              OK
            </button>
          </div>
        </div>
      )}
      {showDeleteDialog && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <div className="dialog-message">Are you sure you want to delete your profile?</div>
            <div className="dialog-buttons">
              <button className="dialog-button" onClick={handleConfirmDelete} style={{ marginRight: "10px" }}>
                Yes
              </button>
              <button className="dialog-button" onClick={handleCancelDelete}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
      {showDeleteSuccess && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <div className="dialog-icon">&#10003;</div> {/* Checkmark icon */}
            <div className="dialog-message">Profile Deleted Successfully</div>
            <button className="dialog-button" onClick={closeDialog}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
