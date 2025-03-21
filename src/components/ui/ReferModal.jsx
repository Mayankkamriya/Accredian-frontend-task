import { useState } from "react";
import axios from "axios";

const ReferModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    referrerName: "",
    referrerEmail: "",
    refereeName: "",
    refereeEmail: "",
    course: "",
  });
  const BaseUrl = import.meta.env.VITE_API_BASE_URL;
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // Basic validation
    if (
      !formData.referrerName ||
      !formData.referrerEmail ||
      !formData.refereeName ||
      !formData.refereeEmail ||
      !formData.course
    ) {
      alert("Please fill out all fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${BaseUrl}/api/referral`,
        formData
      );

      alert(response.data.message || "Referral submitted successfully!");
    } catch (error) {
      alert("Error submitting referral. Please try again.");
      console.error("API Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/30 backdrop-blur-md z-50 px-4 sm:px-6 transition-opacity duration-300">
      <div className="relative bg-white shadow-xl rounded-lg p-6 sm:p-8 w-full max-w-[90%] sm:max-w-[500px] transform transition-all scale-100">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold mb-6 text-center text-[#1A73E8]">
          Refer a Friend 🎓
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            name="referrerName"
            placeholder="Your Name"
            value={formData.referrerName}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#1A73E8] focus:ring-2 focus:ring-[#1A73E8] outline-none"
          />
          <input
            type="email"
            name="referrerEmail"
            placeholder="Your Email"
            value={formData.referrerEmail}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#1A73E8] focus:ring-2 focus:ring-[#1A73E8] outline-none"
          />
          <input
            type="text"
            name="refereeName"
            placeholder="Friend's Name"
            value={formData.refereeName}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#1A73E8] focus:ring-2 focus:ring-[#1A73E8] outline-none"
          />
          <input
            type="email"
            name="refereeEmail"
            placeholder="Friend's Email"
            value={formData.refereeEmail}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#1A73E8] focus:ring-2 focus:ring-[#1A73E8] outline-none"
          />
          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#1A73E8] focus:ring-2 focus:ring-[#1A73E8] outline-none"
          >
            <option value="">Select Course</option>
            <option value="mern">MERN Stack</option>
            <option value="python">Python & Data Science</option>
            <option value="cloud">Cloud & DevOps</option>
            <option value="uiux">UI/UX Design</option>
          </select>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between mt-6 gap-4">
          <button
            className="bg-[#1A73E8] hover:bg-[#1662c4] text-white w-full sm:w-auto px-6 py-3 rounded-lg font-semibold transition-all duration-300"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
          <button
            className="bg-gray-400 hover:bg-gray-500 text-white w-full sm:w-auto px-6 py-3 rounded-lg font-semibold transition-all duration-300"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReferModal;
