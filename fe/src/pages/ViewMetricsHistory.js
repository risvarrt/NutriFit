// Created by Poojitha Mummadi
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Modal from "react-modal";
import "../styles/MyFitnessJourney.css";

const ViewMetricsHistory = () => {
  const { auth } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

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
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const handleClickOutside = () => {
      setErrors({});
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchMetric = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/metrics/${id}`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch metric");
        }
        const data = await response.json();
        if (data.date) {
          data.date = new Date(data.date).toISOString().split("T")[0];
        }
        setFormState(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMetric();
  }, [id, auth.token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";
    if (typeof value !== "string") {
      value = String(value);
    }
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
          `${process.env.REACT_APP_BACKEND_URL}/api/metrics/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.token}`,
            },
            body: JSON.stringify(formState),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to save data");
        }
        setModalIsOpen(true);
        setIsEditing(false); // Exit edit mode after saving
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleCancel = () => {
    navigate("/metrics-history");
  };

  const closeModal = () => {
    setModalIsOpen(false);
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
            disabled={!isEditing} // Disable input if not editing
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
              disabled={!isEditing} // Disable input if not editing
            />
            <select
              name="heightUnit"
              value={formState.heightUnit}
              onChange={handleChange}
              className="unit-select"
              disabled={!isEditing} // Disable input if not editing
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
              disabled={!isEditing} // Disable input if not editing
            />
            <select
              name="weightUnit"
              value={formState.weightUnit}
              onChange={handleChange}
              className="unit-select"
              disabled={!isEditing} // Disable input if not editing
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
              disabled={!isEditing} // Disable input if not editing
            />
            <select
              name="armsUnit"
              value={formState.armsUnit}
              onChange={handleChange}
              className="unit-select"
              disabled={!isEditing} // Disable input if not editing
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
              disabled={!isEditing} // Disable input if not editing
            />
            <select
              name="chestUnit"
              value={formState.chestUnit}
              onChange={handleChange}
              className="unit-select"
              disabled={!isEditing} // Disable input if not editing
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
              disabled={!isEditing} // Disable input if not editing
            />
            <select
              name="hipUnit"
              value={formState.hipUnit}
              onChange={handleChange}
              className="unit-select"
              disabled={!isEditing} // Disable input if not editing
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
            disabled={!isEditing} // Disable input if not editing
          ></textarea>
        </div>
        <div className="form-actions">
          <div className="left-actions">
            {isEditing ? (
              <button type="submit" className="btn-save">
                Save
              </button>
            ) : (
              <button
                type="button"
                className="btn-cancel"
                onClick={handleCancel}
              >
                Cancel
              </button>
            )}
            <button
              type="button"
              className="btn-edit"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          </div>
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

export default ViewMetricsHistory;
