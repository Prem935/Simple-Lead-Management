import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LeadForm({ onAddLead, onEditLead, editingLead }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "",
    qualification: "",
    source: "",
    assignedTo: "",
    interestField: "",
    city: "",
    state: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (editingLead) setFormData(editingLead);
  }, [editingLead]);

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }
    if (!formData.assignedTo.trim())
      newErrors.assignedTo = "Assigned To is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (editingLead) {
      onEditLead(formData);
    } else {
      onAddLead(formData);
    }
    setFormData({
      name: "",
      email: "",
      phone: "",
      status: "",
      qualification: "",
      source: "",
      assignedTo: "",
      interestField: "",
      city: "",
      state: "",
    });
    navigate("/");
    setErrors({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-50 shadow-xl rounded-xl p-6 w-full max-w-2xl border-l-neutral-950 mx-auto"
    >
      <div className="mb-3">
        <label className="block font-medium">Name*</label>
        <input
          type="text"
          name="name"
          className="border rounded w-full p-2"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      <div className="mb-3">
        <label className="block font-medium">Email*</label>
        <input
          type="email"
          name="email"
          className="border rounded w-full p-2"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div className="mb-3">
        <label className="block font-medium">Phone*</label>
        <input
          type="text"
          name="phone"
          className="border rounded w-full p-2"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>

      <div className="mb-3 flex gap-4">
        <div className="w-1/2">
          <label className="block font-medium">Status*</label>
          <select
            name="status"
            className="border rounded w-full p-2"
            value={formData.status}
            onChange={handleChange}
          >
            <option>New</option>
            <option>On Hold</option>
            <option>Dropped</option>
          </select>
        </div>

        <div className="w-1/2">
          <label className="block font-medium">Qualification*</label>
          <select
            name="qualification"
            className="border rounded w-full p-2"
            value={formData.qualification}
            onChange={handleChange}
          >
            <option>Post Graduate</option>
            <option>Graduate</option>
            <option>Diploma</option>
            <option>Higher Secondary</option>
          </select>
        </div>
      </div>

      <div className="mb-3 flex gap-4">
        <div className="w-1/2">
          <label className="block font-medium">Source</label>
          <select
            name="source"
            className="border rounded w-full p-2"
            value={formData.source}
            onChange={handleChange}
          >
            <option>Website</option>
            <option>Referral</option>
            <option>Ads</option>
            <option>Other</option>
          </select>
        </div>

        <div className="w-1/2">
          <label className="block font-medium">Interest Field*</label>
          <select
            name="interestField"
            className="border rounded w-full p-2"
            value={formData.interestField}
            onChange={handleChange}
          >
            <option>Website</option>
            <option>Referral</option>
            <option>Ads</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      <div className="mb-3">
        <label className="block font-medium">Assigned To*</label>
        <input
          type="text"
          name="assignedTo"
          className="border rounded w-full p-2"
          value={formData.assignedTo}
          onChange={handleChange}
        />
        {errors.assignedTo && (
          <p className="text-red-500 text-sm">{errors.assignedTo}</p>
        )}
      </div>

      <div className="mb-3 flex gap-4">
        <div className="w-1/2">
          <label className="block font-medium">City*</label>
          <input
            type="text"
            name="city"
            className="border rounded w-full p-2"
            value={formData.city}
            onChange={handleChange}
          />
          {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
        </div>
        <div className="w-1/2">
          <label className="block font-medium">State</label>
          <input
            type="text"
            name="state"
            className="border rounded w-full p-2"
            value={formData.state}
            onChange={handleChange}
          />
          {errors.state && (
            <p className="text-red-500 text-sm">{errors.state}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        Submit Details
      </button>
    </form>
  );
}

export default LeadForm;
