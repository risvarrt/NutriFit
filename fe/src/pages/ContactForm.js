import React, { useState, useEffect, useRef } from "react";
import "../styles/ContactForm.css";

const ContactForm = () => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
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

    if (!formValues.message) {
      errors.message = true;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully", formValues);
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
    setFormValues({
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="contact-container">
      <div className="contact-wrapper">
        <div className="contact-info">
          <div className="contact-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2839.1116445955217!2d-63.59774862368475!3d44.63563508833893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4b5a223075e6d9d7%3A0x748c455d10d45403!2sDalhousie%20University!5e0!3m2!1sen!2sca!4v1718755056897!5m2!1sen!2sca"
              width="500"
              height="500"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps"
            ></iframe>
          </div>
        </div>
        <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
          <h1 className="contact-header">Contact Us</h1>
          <div className="contact-input-group">
            <div className="input-container">
              <input
                className={`contact-input ${
                  formErrors.firstName ? "error" : ""
                }`}
                type="text"
                name="firstName"
                placeholder="First"
                value={formValues.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="input-container">
              <input
                className={`contact-input ${
                  formErrors.lastName ? "error" : ""
                }`}
                type="text"
                name="lastName"
                placeholder="Last"
                value={formValues.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="input-container">
            <input
              className={`contact-input ${formErrors.email ? "error" : ""}`}
              type="email"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <div className="input-container">
            <textarea
              className={`contact-textarea ${
                formErrors.message ? "error" : ""
              }`}
              name="message"
              placeholder="Message"
              value={formValues.message}
              onChange={handleChange}
            ></textarea>
          </div>
          <button type="submit" className="contact-submit-btn">
            SUBMIT
          </button>
          <div className="contact-info-icons">
            <div className="contact-info-item">
              <img
                src="https://img.icons8.com/ios-filled/50/000000/phone.png"
                alt="Phone"
              />
              <span>(123) 456-7890</span>
            </div>
            <div className="contact-info-item">
              <img
                src="https://img.icons8.com/ios-filled/50/000000/email.png"
                alt="Email"
              />
              <span>NutriFit@hotmail.com</span>
            </div>
          </div>
        </form>
      </div>
      {showSuccessDialog && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <div className="dialog-icon">&#10003;</div> {/* Checkmark icon */}
            <div className="dialog-message">Message Sent Successfully</div>
            <button className="dialog-button" onClick={closeDialog}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactForm;
