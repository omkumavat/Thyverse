import React, { useState } from "react";
import axios from "axios";

const HomeContact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    help: "",
    message: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Helper function to validate email format
  const isValidEmail = (email) =>
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i.test(
      email
    );

  // Validate form fields
  const validate = () => {
    let newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Email is not valid.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    }

    if (!formData.help.trim()) {
      newErrors.help = "Please select an option.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
    }

    if (!formData.terms) {
      newErrors.terms = "You must agree to the privacy policy and terms.";
    }

    setErrors(newErrors);
    // Return true if no errors exist
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    if (!validate()) {
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:4000/server/contact/submit-contact",
        formData
      );

      const data = response.data;
      if (data.success) {
        setSubmitted(true);
      } else {
        setServerError("Submission failed, please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setServerError(
        "There was an error submitting the form. Please try again."
      );
    }
    setLoading(false);
  };

  // Show success message when submitted
  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="text-green-500 text-6xl mb-4">&#10003;</div>
        <h2 className="text-2xl font-bold mb-2">Form Submitted!</h2>
        <p>
          Thank you for reaching out. We'll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="bg-white p-8 rounded-xl shadow-xl">
        <h3 className="text-2xl font-bold mb-6 text-[#18184e]">
          Request a Consultation
        </h3>
        <form
          className="space-y-4 bg-white p-6 rounded-lg shadow-md"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your name"
                className="mt-1 p-2 w-full border rounded-md"
                disabled={loading}
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
                className="mt-1 p-2 w-full border rounded-md"
                disabled={loading}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Your phone number"
              className="mt-1 p-2 w-full border rounded-md"
              disabled={loading}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              How can we help?
            </label>
            <select
              name="help"
              value={formData.help}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              disabled={loading}
            >
              <option value="">Select an option</option>
              <option value="Book a thermal scan">
                Book a thermal scan
              </option>
              <option value="Consult with a specialist">
                Consult with a specialist
              </option>
              <option value="General inquiry">General inquiry</option>
              <option value="Other">Other</option>
            </select>
            {errors.help && (
              <p className="text-red-500 text-xs mt-1">{errors.help}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us more about your concerns"
              className="mt-1 p-2 w-full border rounded-md"
              rows="4"
              disabled={loading}
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-xs mt-1">{errors.message}</p>
            )}
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              className="mr-2"
              disabled={loading}
            />
            <label className="text-sm text-gray-700">
              I agree to the privacy policy and terms of service
            </label>
          </div>
          {errors.terms && (
            <p className="text-red-500 text-xs mt-1">{errors.terms}</p>
          )}
          {serverError && (
            <p className="text-red-500 text-xs mt-1 text-center">
              {serverError}
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
          <p className="text-xs text-gray-500 text-center mt-4">
            We'll get back to you within 24 hours. Your information is secure and
            will never be shared.
          </p>
        </form>
      </div>
    </div>
  );
};

export default HomeContact;
