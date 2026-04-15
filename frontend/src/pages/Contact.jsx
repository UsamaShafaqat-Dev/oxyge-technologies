import React, { useState } from "react";
import { sendContactMessage } from "../services/api";

const Contact = () => {
  // ------------------- FORM STATE -------------------
  // Form ke saare fields ka state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  // Loading state (jab form submit ho raha ho)
  const [loading, setLoading] = useState(false);

  // Success/Error message ke liye
  const [message, setMessage] = useState({ type: "", text: "" });

  // ------------------- HANDLE INPUT CHANGE -------------------
  // Jab user kisi field mein likhe, toh state update ho
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Pehle wala message clear karo
    if (message.text) setMessage({ type: "", text: "" });
  };

  // ------------------- HANDLE FORM SUBMIT -------------------
  const handleSubmit = async (e) => {
    e.preventDefault(); // Page refresh hone se rokna

    // Loading start
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      // Backend ko form data bhejna
      const response = await sendContactMessage(formData);

      // Success
      setMessage({
        type: "success",
        text:
          response.message ||
          "Your message has been sent successfully! We will contact you soon.",
      });

      // Form clear karna
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      // Error
      console.log("Contact form error:", error);
      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Failed to send message. Please try again later.",
      });
    } finally {
      // Loading end
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Heading */}
      <h1
        className="text-4xl font-bold text-center mb-4"
        style={{ color: "var(--foreground)" }}
      >
        Contact Us
      </h1>

      {/* Subheading */}
      <p
        className="text-center mb-12 max-w-2xl mx-auto"
        style={{ color: "var(--foreground-light)" }}
      >
        Have a question or want to work with us? Fill out the form below.
      </p>

      <div className="max-w-2xl mx-auto">
        {/* Success/Error Message */}
        {message.text && (
          <div
            className={`p-4 rounded-lg mb-6 text-center ${
              message.type === "success"
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <input
            type="text"
            name="name"
            placeholder="Your Name *"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#10B981] transition-all"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border)",
              color: "var(--foreground)",
            }}
          />

          {/* Email Field */}
          <input
            type="email"
            name="email"
            placeholder="Your Email *"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#10B981] transition-all"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border)",
              color: "var(--foreground)",
            }}
          />

          {/* Phone Field (Optional) */}
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone (optional)"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#10B981] transition-all"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border)",
              color: "var(--foreground)",
            }}
          />

          {/* Subject Field */}
          <input
            type="text"
            name="subject"
            placeholder="Subject *"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#10B981] transition-all"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border)",
              color: "var(--foreground)",
            }}
          />

          {/* Message Field */}
          <textarea
            name="message"
            placeholder="Your Message *"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#10B981] transition-all resize-none"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border)",
              color: "var(--foreground)",
            }}
          ></textarea>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: "var(--accent)", color: "white" }}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
