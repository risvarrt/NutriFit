import React, { useState, useEffect, useRef } from "react";
import "../styles/RecipeBuilder.css";
const RecipeBuilder = () => {
  const [formValues, setFormValues] = useState({
    recipe_food: "",
    recipe_ingredients: "",
    recipe_time: "",
    recipe_calories: "",
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
    if (!formValues.recipe_food) {
      errors.recipe_food = true;
    }
    if (!formValues.recipe_ingredients) {
      errors.recipe_ingredients = true;
    }
    if (!formValues.recipe_time) {
      errors.recipe_time = true;
    }
    if (!formValues.recipe_calories) {
      errors.recipe_calories = true;
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      fetch('https://eqjdbncpv1.execute-api.us-east-1.amazonaws.com/V1/create-recipe', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          recipe_food: formValues.recipe_food,
          recipe_ingredients: formValues.recipe_ingredients,
          recipe_time: formValues.recipe_time,
          recipe_calories: formValues.recipe_calories,
          recipe_api_key: localStorage.getItem("token")
        })
      })
        .then((response) => {
          setShowSuccessDialog(true);
        })
        .catch((error) => {
          setShowSuccessDialog(true);
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
    window.location.href = "/#/recipes";
  };

  const closeFailureDialog = () => {
    setShowFailureDialog(false);
  };

  return (
    <div className="recipe-container">
      <div className="recipe-wrapper">
      <div className="recipe-info">
          <img src={require("../assets/AI/builder.jpg")} alt="recipe" className="recipe-image" />
        </div>
        <form ref={formRef} className="recipe-form" onSubmit={handleSubmit}>
          <h1 className="recipe-header">Generate a Recipe using AI!</h1>
          <p>Answer the four questions below</p>
          <p>Open AI's GPT-4o-mini LLM model will generate a Recipe for you!</p><br></br>
          <div className="recipe-input-group">
            What do you feel like eating today?
            <div className="input-container">
              <input
                className={`recipe-input ${formErrors.recipe_food ? "error" : ""
                  }`}
                type="text"
                name="recipe_food"
                value={formValues.recipe_food}
                onChange={handleChange}
              />
            </div>

            List a few ingredients available to you
            <div className="input-container">
              <input
                className={`recipe-input ${formErrors.recipe_ingredients ? "error" : ""
                  }`}
                type="text"
                name="recipe_ingredients"
                value={formValues.recipe_ingredients}
                onChange={handleChange}
              />
            </div>

            How much minutes do you have to cook?
            <div className="input-container">
              <input
                className={`recipe-input ${formErrors.recipe_time ? "error" : ""}`}
                type="number"
                name="recipe_time"
                value={formValues.recipe_time}
                onChange={handleChange}
              />
            </div>

            How many calories are you looking to consume?
            <div className="input-container">
              <input
                className={`recipe-input ${formErrors.recipe_calories ? "error" : ""}`}
                type="number"
                name="recipe_calories"
                value={formValues.recipe_calories}
                onChange={handleChange}
              />
            </div>
          </div>
          <button type="submit" className="recipe-submit-btn">
            Generate the Recipe!
          </button>
        </form>
      </div>
      {showSuccessDialog && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <div className="dialog-icon">&#10003;</div> {/* Checkmark icon */}
            <div className="dialog-message">Recipe Generated Successfully!</div>
            <button className="dialog-button" onClick={closeSuccessDialog}>
              Show Recipe
            </button>
          </div>
        </div>
      )}
      {showFailureDialog && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <div className="dialog-icon">&#10060;</div> {/* X mark icon */}
            <div className="dialog-message">We Ran into an Issue. Please try again later.</div>
            <button className="dialog-button" onClick={closeFailureDialog}>
              Ok
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeBuilder;
