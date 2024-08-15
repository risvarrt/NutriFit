// Created by Poojitha Mummadi
import React, { useState, useEffect, useContext } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext
import "../styles/MyFitnessJourney.css";

const MyFitnessJourneyForm = () => {
  const { auth } = useContext(AuthContext); // Get the token from AuthContext
  const initialState = {
    date: "",
    height: "",
    heightUnit: "cm",
    weight: "",
    weightUnit: "kg",
    arms: "",
    armsUnit: "cm",
    chest: "",
    chestUnit: "cm",
    hip: "",
    hipUnit: "cm",
    notes: "",
  };

  const [formState, setFormState] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = () => {
      setErrors({});
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";
    if (value.trim() === "") {
      if (["date", "height", "weight"].includes(name)) {
        error = "This field is required";
      }
    } else if (
      ["height", "weight", "arms", "chest", "hip"].includes(name) &&
      isNaN(value)
    ) {
      error = "This field must be a number";
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    ["date", "height", "weight"].forEach((field) => {
      if (!formState[field]) {
        newErrors[field] = "This field is required";
      }
    });
    Object.keys(formState).forEach((key) => {
      validateField(key, formState[key]);
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/metrics`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.token}`, // Include the token in the request headers
            },
            body: JSON.stringify(formState),
          }
        );
        console.log("Response status:", response.status); // Debug response status
        const responseData = await response.json();
        console.log("Response data:", responseData); // Debug response data

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Server Error:", errorData);
          throw new Error(errorData.error || "Failed to save data");
        }
        setModalIsOpen(true);
      } catch (err) {
        console.error("Error:", err); // Debug error
      }
    }
  };

  const handleCancel = () => {
    setFormState(initialState);
    setErrors({});
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setFormState(initialState);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formState.date}
            onChange={handleChange}
            className={errors.date ? "error" : ""}
          />
          {errors.date && <div className="error-message">{errors.date}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="height">Height</label>
          <div className="input-group">
            <input
              type="text"
              id="height"
              name="height"
              placeholder="Enter height"
              value={formState.height}
              onChange={handleChange}
              className={errors.height ? "error" : ""}
            />
            <select
              name="heightUnit"
              value={formState.heightUnit}
              onChange={handleChange}
              className="unit-select"
            >
              <option value="cm">cm</option>
              <option value="in">in</option>
            </select>
          </div>
          {errors.height && (
            <div className="error-message">{errors.height}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="weight">Weight</label>
          <div className="input-group">
            <input
              type="text"
              id="weight"
              name="weight"
              placeholder="Enter weight"
              value={formState.weight}
              onChange={handleChange}
              className={errors.weight ? "error" : ""}
            />
            <select
              name="weightUnit"
              value={formState.weightUnit}
              onChange={handleChange}
              className="unit-select"
            >
              <option value="kg">kg</option>
              <option value="lbs">lbs</option>
            </select>
          </div>
          {errors.weight && (
            <div className="error-message">{errors.weight}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="arms">Arms</label>
          <div className="input-group">
            <input
              type="text"
              id="arms"
              name="arms"
              placeholder="Enter arms measurement"
              value={formState.arms}
              onChange={handleChange}
              className={errors.arms ? "error" : ""}
            />
            <select
              name="armsUnit"
              value={formState.armsUnit}
              onChange={handleChange}
              className="unit-select"
            >
              <option value="cm">cm</option>
              <option value="in">in</option>
            </select>
          </div>
          {errors.arms && <div className="error-message">{errors.arms}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="chest">Chest</label>
          <div className="input-group">
            <input
              type="text"
              id="chest"
              name="chest"
              placeholder="Enter chest measurement"
              value={formState.chest}
              onChange={handleChange}
              className={errors.chest ? "error" : ""}
            />
            <select
              name="chestUnit"
              value={formState.chestUnit}
              onChange={handleChange}
              className="unit-select"
            >
              <option value="cm">cm</option>
              <option value="in">in</option>
            </select>
          </div>
          {errors.chest && <div className="error-message">{errors.chest}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="hip">Hip</label>
          <div className="input-group">
            <input
              type="text"
              id="hip"
              name="hip"
              placeholder="Enter hip measurement"
              value={formState.hip}
              onChange={handleChange}
              className={errors.hip ? "error" : ""}
            />
            <select
              name="hipUnit"
              value={formState.hipUnit}
              onChange={handleChange}
              className="unit-select"
            >
              <option value="cm">cm</option>
              <option value="in">in</option>
            </select>
          </div>
          {errors.hip && <div className="error-message">{errors.hip}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            placeholder="Enter your notes"
            value={formState.notes}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-actions">
          <div className="left-actions">
            <button type="submit" className="btn-save">
              Save
            </button>
            <button type="button" className="btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
          </div>
          <Link to="/metrics-history" className="btn-metrics-history">
            Metrics History
          </Link>
        </div>
      </form>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Details Saved"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Details saved successfully!</h2>
        <button className="btn-cancel" onClick={closeModal}>
          Cancel
        </button>
        <button className="btn-save" onClick={closeModal}>
          OK
        </button>
      </Modal>
    </div>
  );
};

export default MyFitnessJourneyForm;
